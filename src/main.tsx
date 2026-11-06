import { StrictMode } from 'react'
import './i18n'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { beginHydration } from './lib/hydration'

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered routes ship markup to hydrate; dev, admin and the SPA shell start empty.
if (container.hasChildNodes()) {
  beginHydration();
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
