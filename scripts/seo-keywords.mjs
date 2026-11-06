// Keyword research store. This is planning data only: it never generates pages or tags.
//
//   npm run seo:keywords -- validate
//   npm run seo:keywords -- import path/to/export.csv [--source "Google Search Console"]
//
// Rows are streamed, so large exports are fine. Duplicates are merged on
// normalized keyword + language + region. Metrics are only accepted with a named source.
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STORE = join(root, 'seo', 'keyword-map.csv');
const SITEMAP = join(root, 'out', 'sitemap.xml');
const COLUMNS = [
  'keyword_id', 'keyword', 'normalized_keyword', 'language', 'region', 'intent', 'service_category', 'topic_cluster',
  'target_url', 'search_volume', 'competition', 'ranking_position', 'source', 'last_checked', 'status', 'priority',
];
const METRICS = ['search_volume', 'competition', 'ranking_position'];

export const normalizeKeyword = (keyword) => keyword.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const dedupeKey = (row) => [row.normalized_keyword, row.language, row.region].join('|');
const keywordId = (key) => createHash('sha1').update(key).digest('hex').slice(0, 12);

function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { cells.push(cell); cell = ''; }
    else cell += c;
  }
  cells.push(cell);
  return cells;
}

const csvCell = (value = '') => (/[",\r\n]/.test(value) ? `"${String(value).replace(/"/g, '""')}"` : String(value));
const toCsvLine = (row) => COLUMNS.map((c) => csvCell(row[c])).join(',');

async function* readRows(file) {
  const lines = createInterface({ input: createReadStream(file, 'utf8'), crlfDelay: Infinity });
  let header;
  for await (const raw of lines) {
    const line = raw.replace(/^﻿/, '');
    if (!line.trim()) continue;
    if (!header) {
      header = parseCsvLine(line).map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
      continue;
    }
    const cells = parseCsvLine(line);
    yield Object.fromEntries(header.map((h, i) => [h, (cells[i] ?? '').trim()]));
  }
}

async function loadStore() {
  const rows = new Map();
  if (existsSync(STORE)) for await (const row of readRows(STORE)) rows.set(dedupeKey(row), row);
  return rows;
}

function loadPublishedUrls() {
  if (!existsSync(SITEMAP)) return null;
  return new Set([...readFileSync(SITEMAP, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

function saveStore(rows) {
  const sorted = [...rows.values()].sort((a, b) => a.service_category.localeCompare(b.service_category) || a.keyword.localeCompare(b.keyword));
  writeFileSync(STORE, `${COLUMNS.join(',')}\n${sorted.map(toCsvLine).join('\n')}\n`);
}

async function validate() {
  const rows = await loadStore();
  const published = loadPublishedUrls();
  const problems = [];
  for (const row of rows.values()) {
    if (row.status === 'mapped' && !row.target_url) problems.push(`${row.keyword}: mapped without a target URL`);
    if (row.target_url && published && !published.has(row.target_url)) problems.push(`${row.keyword}: ${row.target_url} is not in the sitemap`);
    if (METRICS.some((m) => row[m]) && (!row.source || row.source === 'seed')) problems.push(`${row.keyword}: metric without a verified source`);
  }
  const byStatus = {};
  for (const row of rows.values()) byStatus[row.status] = (byStatus[row.status] ?? 0) + 1;
  console.log(`${rows.size} keywords`, byStatus);
  problems.forEach((p) => console.log(`  problem: ${p}`));
  if (!published) console.log('  note: run npm run build first to check target URLs against the sitemap');
  process.exitCode = problems.length ? 1 : 0;
}

async function importFile(file, source) {
  const rows = await loadStore();
  const published = loadPublishedUrls();
  const stats = { read: 0, added: 0, merged: 0, skipped: 0, metricsDropped: 0, unknownTarget: 0 };
  const today = new Date().toISOString().slice(0, 10);
  for await (const input of readRows(file)) {
    stats.read++;
    const keyword = input.keyword || input.query || input.top_queries || '';
    const normalized = normalizeKeyword(keyword);
    if (!normalized) { stats.skipped++; continue; }
    const row = {
      ...input,
      keyword,
      normalized_keyword: normalized,
      language: input.language || 'en',
      region: input.region || input.country || 'AE',
      source: input.source || source || '',
    };
    if (METRICS.some((m) => row[m]) && !row.source) {
      METRICS.forEach((m) => { row[m] = ''; });
      stats.metricsDropped++;
    }
    if (row.source && METRICS.some((m) => row[m])) row.last_checked = row.last_checked || today;
    if (row.target_url && published && !published.has(row.target_url)) {
      stats.unknownTarget++;
      row.target_url = '';
    }
    const key = dedupeKey(row);
    const existing = rows.get(key);
    if (existing) {
      // Only non-empty incoming values replace what is stored.
      for (const column of COLUMNS) if (row[column]) existing[column] = row[column];
      stats.merged++;
    } else {
      const stored = Object.fromEntries(COLUMNS.map((column) => [column, row[column] ?? '']));
      rows.set(key, { ...stored, keyword_id: keywordId(key), status: row.status || (row.target_url ? 'mapped' : 'unmapped') });
      stats.added++;
    }
  }
  saveStore(rows);
  console.log(`Imported ${file}:`, stats, `store now has ${rows.size} keywords`);
}

const [command, file] = process.argv.slice(2);
const sourceFlag = process.argv.indexOf('--source');
if (command === 'validate') await validate();
else if (command === 'import' && file) await importFile(file, sourceFlag > -1 ? process.argv[sourceFlag + 1] : '');
else {
  console.log('Usage: seo-keywords.mjs validate | import <file.csv> [--source "Name"]');
  process.exitCode = 1;
}
