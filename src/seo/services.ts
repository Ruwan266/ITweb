/**
 * Content for the dedicated /services/:slug pages.
 *
 * Scope: exactly the services in the site's approved catalogue (SERVICE_DETAILS in
 * mocks/services.ts). Capabilities restate that copy without unverified figures such
 * as SLAs, percentages or case-study results. Add a page only for a service the
 * business actually sells; set `published: false` to hold one back for approval.
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  /** Matching section id on the /services page. */
  anchorId: string;
  name: string;
  /** schema.org serviceType. */
  serviceType: string;
  published: boolean;
  /** Date of the last meaningful content change (YYYY-MM-DD); feeds the sitemap. */
  lastModified: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  overview: string;
  problems: string[];
  capabilities: string[];
  useCases: string[];
  faqs: ServiceFaq[];
  /** Slugs of related services. */
  related: string[];
}

const LAST_MODIFIED = '2026-11-06';

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'software-development',
    anchorId: 'custom-dev',
    name: 'Custom Software Development',
    serviceType: 'Custom software development',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Custom Software Development in Dubai | Samarat Infinity',
    metaDescription:
      'Custom business software from our Dubai team: API-first applications, legacy system modernization, automated testing and continuous deployment.',
    h1: 'Custom Software Development in Dubai',
    overview:
      'Samarat Infinity Network Solutions builds custom business applications designed to be maintained and extended, not just launched. Work is API-first, tested throughout and deployed through automated pipelines, so the software can keep changing as your business does.',
    problems: [
      'Off-the-shelf products force your process to fit the tool',
      'Legacy systems are risky to change but too important to switch off',
      'Manual releases make every update slow and stressful',
    ],
    capabilities: [
      'Microservices and event-driven architectures designed to scale horizontally',
      'API-first development with documentation and versioning',
      'Test-driven development with quality assurance in every sprint',
      'Continuous integration and deployment pipelines from the start',
      'Legacy system modernization without disrupting daily operations',
    ],
    useCases: [
      'Replacing spreadsheets or manual workflows with a purpose-built application',
      'Modernizing an ageing internal system in stages',
      'Connecting existing business systems through documented APIs',
    ],
    faqs: [
      {
        question: 'When is custom software a better choice than an off-the-shelf product?',
        answer:
          'Custom software makes sense when your process gives you an advantage that a packaged product cannot support, or when you would otherwise pay for many tools and still rely on manual workarounds. If a standard product fits your process, it is usually faster and cheaper to adopt, and we will say so during discovery.',
      },
      {
        question: 'Can you modernize an existing system without stopping the business?',
        answer:
          'Yes. Legacy modernization is normally done in stages, moving one function at a time behind stable interfaces so the existing system keeps running while its replacement is built and tested.',
      },
    ],
    related: ['web-development-it-support', 'ai-automation', 'cloud-devops'],
  },
  {
    slug: 'cloud-devops',
    anchorId: 'cloud-devops',
    name: 'Cloud & DevOps',
    serviceType: 'Cloud infrastructure and DevOps',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Cloud & DevOps Services in Dubai | Samarat Infinity',
    metaDescription:
      'Cloud architecture on AWS, Azure and Google Cloud with infrastructure as code, Kubernetes, CI/CD pipelines, cost optimization and disaster recovery.',
    h1: 'Cloud & DevOps Services in Dubai',
    overview:
      'We design cloud environments that are secure, automated and sized to your actual workload, on AWS, Azure or Google Cloud. Whether you are moving from on-premises servers, adopting more than one cloud, or trying to control an existing bill, the work is codified so that your environment can be repeated and audited.',
    problems: [
      'Environments built by hand are hard to reproduce or recover',
      'Cloud bills grow without a clear view of what is driving them',
      'Deployments depend on manual steps and individual knowledge',
    ],
    capabilities: [
      'Multi-cloud architecture across AWS, Azure and Google Cloud',
      'Kubernetes orchestration with auto-scaling and self-healing clusters',
      'Infrastructure as code using Terraform and Pulumi',
      'CI/CD pipelines with automated testing, security scanning and canary deployments',
      'Cloud cost optimization and right-sizing',
      'Disaster recovery with cross-region replication',
    ],
    useCases: [
      'Migrating on-premises workloads to the cloud',
      'Automating a manual release process',
      'Reviewing and reducing existing cloud spend',
    ],
    faqs: [
      {
        question: 'What is infrastructure as code, and why does it matter?',
        answer:
          'Infrastructure as code defines servers, networks and permissions in version-controlled files rather than configuring them by hand. Environments can then be rebuilt consistently, changes can be reviewed before they apply, and recovery after a failure is far more predictable.',
      },
      {
        question: 'Do we need Kubernetes?',
        answer:
          'Not always. Kubernetes suits organizations running many services that need independent scaling and deployment. Smaller applications are often better served by simpler managed services, which is why the platform choice follows the workload rather than the other way round.',
      },
    ],
    related: ['cloud-solutions-pbx-phone-systems', 'software-development', 'cybersecurity'],
  },
  {
    slug: 'ai-automation',
    anchorId: 'ai-automation',
    name: 'AI & Automation',
    serviceType: 'Artificial intelligence and process automation',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'AI & Business Process Automation in Dubai | Samarat Infinity',
    metaDescription:
      'Practical AI and automation for business: machine learning models, chatbots and document processing, computer vision, and automated workflows.',
    h1: 'AI & Business Process Automation in Dubai',
    overview:
      'We build machine learning systems and automated workflows that act on your data rather than only reporting on it. That includes natural language processing for chatbots and documents, computer vision for inspection and OCR, and process automation that removes repetitive manual steps.',
    problems: [
      'Staff spend their time on repetitive data entry and document handling',
      'Useful data sits in reports that nobody acts on',
      'AI pilots work in a demo but never reach daily use',
    ],
    capabilities: [
      'Custom machine learning model development with TensorFlow and PyTorch',
      'Natural language processing for chatbots, sentiment analysis and document parsing',
      'Computer vision for quality inspection, object detection and OCR workflows',
      'Intelligent process automation for repetitive manual work',
      'MLOps pipelines with model versioning, A/B testing and automated retraining',
    ],
    useCases: [
      'Extracting data from invoices, forms or other documents',
      'Answering routine customer questions through a chatbot',
      'Automating visual quality checks',
    ],
    faqs: [
      {
        question: 'How can AI automation improve business operations?',
        answer:
          'AI automation handles high-volume, repetitive work such as reading documents, routing requests or checking images, so people can focus on exceptions and decisions. It tends to work best where the task is frequent, the rules are hard to write by hand, and there is existing data to learn from.',
      },
      {
        question: 'What should we have in place before starting an AI project?',
        answer:
          'You need a clearly defined task, a way to measure whether results are good enough, and access to representative data. Many automation gains also come from simplifying a process first, which is why discovery comes before any model is built.',
      },
    ],
    related: ['software-development', 'cloud-devops', 'pos-accounting-billing-software'],
  },
  {
    slug: 'cybersecurity',
    anchorId: 'cybersecurity',
    name: 'Cybersecurity',
    serviceType: 'Cybersecurity services',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Cybersecurity Services in Dubai | Samarat Infinity',
    metaDescription:
      'Penetration testing, compliance preparation, SIEM threat monitoring, zero-trust architecture and incident response planning for businesses in Dubai.',
    h1: 'Cybersecurity Services in Dubai',
    overview:
      'Our security practice covers both finding weaknesses and defending against attacks: penetration testing, threat monitoring, zero-trust design, compliance preparation and incident response planning. The aim is a security posture your team can understand and maintain.',
    problems: [
      'You do not know which systems are exposed until something goes wrong',
      'Customers or regulators are asking for evidence of security controls',
      'There is no agreed plan for what happens during an incident',
    ],
    capabilities: [
      'Black-box, grey-box and white-box penetration testing',
      'Preparation for SOC 2 Type II, ISO 27001 and HIPAA requirements',
      'SIEM deployment with automated threat detection and response',
      'Zero-trust architecture across cloud and on-premises environments',
      'Incident response planning with tabletop exercises and forensic readiness',
      'Continuous vulnerability scanning integrated into CI/CD pipelines',
    ],
    useCases: [
      'Testing an application or network before a launch or audit',
      'Preparing for a customer security review or compliance assessment',
      'Writing and rehearsing an incident response plan',
    ],
    faqs: [
      {
        question: 'What is the difference between a vulnerability scan and a penetration test?',
        answer:
          'A vulnerability scan is an automated check for known weaknesses and can run continuously. A penetration test is a time-boxed exercise where a tester tries to exploit weaknesses and chain them together, showing what an attacker could actually reach. Most organizations benefit from both.',
      },
      {
        question: 'What does zero-trust security mean?',
        answer:
          'Zero trust means no user or device is trusted simply because it is on the company network. Each request for access is verified against identity, device state and policy, which limits how far an attacker can move after compromising one account or machine.',
      },
    ],
    related: ['network-firewall-administration', 'cloud-devops', 'web-development-it-support'],
  },
  {
    slug: 'structured-cabling-server-management',
    anchorId: 'cabling-server',
    name: 'Structured Cabling & Server Management',
    serviceType: 'Structured cabling and server management',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Structured Cabling & Server Installation Dubai | Samarat Infinity',
    metaDescription:
      'TIA/EIA-568 structured cabling in copper and fiber, server rack installation, power planning and server maintenance for offices and facilities in Dubai.',
    h1: 'Structured Cabling & Server Management in Dubai',
    overview:
      'We design and install structured cabling to TIA/EIA standards and set up the server racks that depend on it, including layout, cable management, power and cooling. Every run is documented and labelled so future changes do not start with guesswork.',
    problems: [
      'Unlabelled cabling makes every fault slow to trace',
      'Server rooms have grown without a plan for power or cooling',
      'A new office or floor needs a network that will last',
    ],
    capabilities: [
      'TIA/EIA-568 structured cabling design with copper and fiber optic runs',
      'Server rack layout, cable management and thermal optimization',
      'Patch panel, floor distributor and building distributor documentation and labelling',
      'Power distribution planning with redundant UPS and PDU configurations',
      'Server hardware provisioning, OS installation and firmware hardening',
      'Ongoing maintenance contracts for critical infrastructure',
    ],
    useCases: [
      'Fitting out a new office, floor or warehouse',
      'Reorganizing an existing server room',
      'Adding fiber backbone links between floors or buildings',
    ],
    faqs: [
      {
        question: 'What is structured cabling?',
        answer:
          'Structured cabling is a standardized way of wiring a building, with defined pathways, patch panels and distribution points rather than individual point-to-point cables. It makes moves, changes and fault-finding much easier and supports both current and future network equipment.',
      },
      {
        question: 'Should we use copper or fiber?',
        answer:
          'Copper such as Cat6A is usually used for connections to desks, phones and cameras. Fiber is typically used between floors, buildings and core network equipment, where longer distances and higher capacity are needed. Most buildings use both.',
      },
    ],
    related: ['network-firewall-administration', 'cctv-anti-theft-eas', 'cloud-solutions-pbx-phone-systems'],
  },
  {
    slug: 'network-firewall-administration',
    anchorId: 'network-admin',
    name: 'Router, Switches, VPN & Firewall Administration',
    serviceType: 'Network and firewall administration',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Network, VPN & Firewall Administration Dubai | Samarat Infinity',
    metaDescription:
      'Configuration and management of routers, managed switches, site-to-site and remote VPNs, and next-generation firewalls for businesses in Dubai.',
    h1: 'Router, Switch, VPN & Firewall Administration in Dubai',
    overview:
      'We configure, harden and manage business networks, from core routers and managed switches to VPN tunnels and next-generation firewalls. Segmentation, access control and monitoring keep the network fast for your staff and harder for an attacker to move through.',
    problems: [
      'A flat network lets one compromised device reach everything',
      'Firewall rules have built up over the years and nobody is sure what they allow',
      'Branches and remote staff need secure access to company systems',
    ],
    capabilities: [
      'Enterprise router and L2/L3 managed switch configuration with VLAN segmentation',
      'Site-to-site and remote-access VPNs using IPsec, OpenVPN and WireGuard',
      'Next-generation firewall policy design with application-layer filtering and IPS/IDS',
      'Network access control with 802.1X authentication and device posture checks',
      'Network monitoring with SNMP, NetFlow and automated alerting',
      'Periodic security audits and configuration compliance reviews',
    ],
    useCases: [
      'Connecting branch offices or warehouses over VPN',
      'Separating guest, staff and operational traffic',
      'Reviewing and cleaning up an existing firewall policy',
    ],
    faqs: [
      {
        question: 'How can a company improve network security?',
        answer:
          'Start by segmenting the network with VLANs so that a problem in one area cannot easily spread, then tighten firewall rules to allow only what is needed. Add secure remote access through a VPN, authenticate devices joining the network, keep equipment firmware updated, and monitor traffic so unusual activity gets noticed.',
      },
      {
        question: 'What is the difference between a site-to-site VPN and a remote-access VPN?',
        answer:
          'A site-to-site VPN permanently links two networks, such as a head office and a branch, so users do not need to do anything. A remote-access VPN connects an individual user\'s device to the company network, which suits staff working from home or travelling.',
      },
    ],
    related: ['cybersecurity', 'structured-cabling-server-management', 'web-development-it-support'],
  },
  {
    slug: 'cloud-solutions-pbx-phone-systems',
    anchorId: 'cloud-pbx',
    name: 'Cloud Solutions & PBX Phone Systems',
    serviceType: 'Cloud migration and IP-PBX telephony',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Cloud Migration & PBX Phone Systems Dubai | Samarat Infinity',
    metaDescription:
      'Cloud migration on AWS, Azure or Google Cloud and IP-PBX phone systems with FreeSWITCH, Asterisk or 3CX, including VoIP trunks and unified communications.',
    h1: 'Cloud Migration & PBX Phone Systems in Dubai',
    overview:
      'We move business workloads to the cloud and replace ageing phone systems with IP-PBX platforms offering auto attendants, call queues and voicemail-to-email, managed through a web dashboard. Hybrid designs keep an on-premises fallback where continuity requires it.',
    problems: [
      'On-premises servers and phone hardware are costly to maintain',
      'A legacy phone system cannot support remote staff or multiple sites',
      'A move to the cloud needs planning so that it does not disrupt operations',
    ],
    capabilities: [
      'Cloud migration strategy on AWS, Azure or Google Cloud, from lift-and-shift to re-architecture',
      'IP-PBX deployment with FreeSWITCH, Asterisk or 3CX',
      'VoIP trunking with SIP provider integration and QoS traffic routing',
      'Unified communications combining voice, video conferencing and instant messaging',
      'Hybrid cloud design with on-premises failover for business continuity',
      'Ongoing cloud cost optimization and right-sizing',
    ],
    useCases: [
      'Replacing a legacy PBX in one office or several',
      'Moving email, files or line-of-business systems to the cloud',
      'Giving remote staff a company phone extension',
    ],
    faqs: [
      {
        question: 'What is involved in migrating business systems to the cloud?',
        answer:
          'A migration starts with an inventory of systems and their dependencies, then a decision for each one: move it as it is, adapt it, or replace it. After that comes a pilot, data transfer, testing and a planned cutover with a rollback option, followed by tuning for cost and performance once it is live.',
      },
      {
        question: 'What is an IP-PBX?',
        answer:
          'An IP-PBX is a business phone system that runs calls over your data network rather than separate phone lines. It provides features such as extensions, call queues, auto attendants and voicemail-to-email, and it lets staff use desk phones, computers or mobile apps from any location.',
      },
    ],
    related: ['cloud-devops', 'network-firewall-administration', 'structured-cabling-server-management'],
  },
  {
    slug: 'access-control-time-attendance',
    anchorId: 'access-control',
    name: 'Access Control, Time Attendance & Entrance Management',
    serviceType: 'Access control and time attendance systems',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Access Control & Time Attendance Systems Dubai | Samarat Infinity',
    metaDescription:
      'Biometric and RFID access control, multi-door management, time attendance with payroll export, and visitor management for premises in Dubai.',
    h1: 'Access Control & Time Attendance Systems in Dubai',
    overview:
      'We install biometric and RFID access control that shows who can enter which door and when, connected to time and attendance tracking that feeds payroll. Keys and sign-in sheets are replaced with managed credentials and an auditable record of entry.',
    problems: [
      'Lost keys and shared credentials leave no reliable record of access',
      'Paper or manual attendance records cause payroll disputes',
      'Visitors and contractors are hard to track on site',
    ],
    capabilities: [
      'Biometric fingerprint, facial recognition and RFID card access control',
      'Multi-door controllers with centralized management software',
      'Time and attendance integration with shift scheduling and payroll export',
      'Visitor management kiosks with pre-registration, badge printing and host notifications',
      'Elevator floor access control and vehicle gate or barrier integration',
      'Monitoring dashboards with entry logs, anomaly alerts and audit reports',
    ],
    useCases: [
      'Securing offices, server rooms and restricted areas',
      'Automating attendance for shift-based teams',
      'Managing visitors and vehicle access at a facility',
    ],
    faqs: [
      {
        question: 'Should we choose biometric or RFID card access?',
        answer:
          'RFID cards are quick and easy to issue or revoke, but they can be lost or shared. Biometrics such as fingerprint or face recognition tie access to the person, which also prevents buddy punching on attendance. Many sites combine them, using stronger checks on sensitive areas.',
      },
      {
        question: 'Can attendance data feed into payroll?',
        answer:
          'Yes. Time and attendance terminals record entry and exit against shift schedules, and that data can be exported for payroll so that hours do not need to be re-keyed by hand.',
      },
    ],
    related: ['cctv-anti-theft-eas', 'structured-cabling-server-management', 'network-firewall-administration'],
  },
  {
    slug: 'cctv-anti-theft-eas',
    anchorId: 'cctv-eas',
    name: 'CCTV & Anti-Theft EAS Solutions',
    serviceType: 'CCTV surveillance and electronic article surveillance',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'CCTV Installation & EAS Anti-Theft Systems Dubai | Samarat Infinity',
    metaDescription:
      'HD and 4K IP camera installation with NVR storage, video analytics and remote viewing, plus AM/RF EAS anti-theft gates for retail in Dubai.',
    h1: 'CCTV Installation & Anti-Theft EAS Systems in Dubai',
    overview:
      'We deploy HD and 4K IP camera systems with recorded storage, video analytics and remote viewing, along with electronic article surveillance for retail. Coverage is planned around what you need to see and how the footage would be used as evidence.',
    problems: [
      'Older cameras record footage too poor to identify anyone',
      'Blind spots leave entrances, stock or cash areas uncovered',
      'Retail shrinkage is hard to deter without visible controls',
    ],
    capabilities: [
      'HD and 4K IP camera deployment with NVR storage',
      'Video analytics for intrusion detection, line crossing and loitering alerts',
      'Remote viewing through a mobile app and web dashboard with PTZ camera control',
      'EAS AM/RF anti-theft gate installation with deactivator integration',
      'Thermal camera options for perimeter security in low light',
      'Annual maintenance contracts with cleaning, firmware updates and health checks',
    ],
    useCases: [
      'Retail stores needing both surveillance and anti-theft gates',
      'Warehouses and offices needing perimeter and entrance coverage',
      'Businesses with several branches wanting one central view',
    ],
    faqs: [
      {
        question: 'What is an EAS anti-theft system?',
        answer:
          'Electronic article surveillance uses tags on merchandise and detection gates at store exits. Tags are deactivated or removed at checkout, and the gates raise an alarm if an active tag passes through. AM and RF are the two common technologies, each with different tag and range characteristics.',
      },
      {
        question: 'What is the benefit of IP cameras over older analogue systems?',
        answer:
          'IP cameras offer higher resolution, run over network cabling, and support remote viewing and video analytics. Those details matter when footage must identify a person or a vehicle, and alerts can flag events without someone watching a screen.',
      },
    ],
    related: ['access-control-time-attendance', 'structured-cabling-server-management', 'pos-accounting-billing-software'],
  },
  {
    slug: 'pos-accounting-billing-software',
    anchorId: 'pos-accounting',
    name: 'POS & Accounting / Billing Software',
    serviceType: 'POS and accounting software implementation',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'POS & Accounting Software Setup in Dubai | Samarat Infinity',
    metaDescription:
      'POS deployment with inventory sync, plus Tally, Zoho Books or QuickBooks setup and VAT-compliant invoicing for retail and hospitality businesses in Dubai.',
    h1: 'POS & Accounting Software in Dubai',
    overview:
      'We deploy point-of-sale systems that stay in sync with your inventory, customer records and accounts, and we set up accounting and billing software for UAE VAT. Sales flow through to your books without being re-entered by hand.',
    problems: [
      'Tills and accounts are separate, so sales are re-keyed by hand',
      'Stock figures differ across branches',
      'VAT invoices and month-end reconciliation take too long',
    ],
    capabilities: [
      'POS terminal deployment with barcode scanning, receipt printing and kitchen displays',
      'Inventory management with stock sync across locations',
      'Accounting software setup with Tally, Zoho Books or QuickBooks, including chart of accounts',
      'VAT-compliant invoicing with automated tax calculations',
      'CRM integration for customer loyalty programs',
      'Daily sales reconciliation with bank deposit matching',
    ],
    useCases: [
      'Supermarkets and retail stores with one or several branches',
      'Restaurants needing kitchen display integration',
      'Businesses moving from standalone tills to integrated accounts',
    ],
    faqs: [
      {
        question: 'What should a business consider when choosing a POS system?',
        answer:
          'Consider how it connects with your inventory and accounting, whether it handles several branches, the hardware it needs, and how it behaves if the internet drops. Check that it can produce VAT-compliant receipts and invoices, and that staff can learn it quickly during a busy shift.',
      },
      {
        question: 'Which accounting software do you work with?',
        answer:
          'We set up Tally, Zoho Books and QuickBooks, including chart of accounts customization and connection to point-of-sale sales data.',
      },
    ],
    related: ['cctv-anti-theft-eas', 'software-development', 'web-development-it-support'],
  },
  {
    slug: 'web-development-it-support',
    anchorId: 'web-support',
    name: 'Web Development & IT Support, Remote / Onsite',
    serviceType: 'Web development and IT support',
    published: true,
    lastModified: LAST_MODIFIED,
    metaTitle: 'Web Development & IT Support in Dubai | Samarat Infinity',
    metaDescription:
      'Business websites and e-commerce, plus remote and onsite IT support, Microsoft 365 and Google Workspace administration, and endpoint security in Dubai.',
    h1: 'Web Development & IT Support in Dubai',
    overview:
      'We build business websites and online stores with modern frameworks, then support the wider technology your team relies on. That covers a ticketed remote helpdesk, onsite technicians when a problem needs hands on site, Microsoft 365 and Google Workspace administration, and endpoint security.',
    problems: [
      'Your website does not reflect the business or generate enquiries',
      'Staff lose time to IT problems with nobody to call',
      'Email, accounts and devices have no consistent administration or protection',
    ],
    capabilities: [
      'Custom website development with React, Next.js and headless CMS platforms',
      'E-commerce storefronts with payment gateway integration and inventory sync',
      'Remote IT helpdesk with a ticketing system',
      'Onsite technical support for business-critical disruptions',
      'Microsoft 365 and Google Workspace administration, migration and user management',
      'Endpoint security including antivirus deployment, patch management and device hardening',
    ],
    useCases: [
      'Companies without an in-house IT team',
      'Moving staff email and files to Microsoft 365 or Google Workspace',
      'Launching or rebuilding a company website or online store',
    ],
    faqs: [
      {
        question: 'What does business IT support include?',
        answer:
          'Our IT support covers day-to-day help for staff through a ticketed remote helpdesk, onsite visits when a problem cannot be fixed remotely, administration of accounts and email, and keeping devices protected through antivirus and patching.',
      },
      {
        question: 'What is included in Microsoft 365 administration?',
        answer:
          'It typically covers creating and managing user accounts and licences, setting up mailboxes and shared resources, handling permissions, and migrating existing email and files. We provide the same administration, migration and user management for Google Workspace.',
      },
      {
        question: 'Do you offer both remote and onsite support?',
        answer:
          'Yes. Most issues can be resolved quickly through remote support, and technicians visit on site when the problem involves hardware or a disruption that needs someone present.',
      },
    ],
    related: ['network-firewall-administration', 'software-development', 'cybersecurity'],
  },
];

export const PUBLISHED_SERVICES = SERVICE_PAGES.filter((s) => s.published);

export const getServiceBySlug = (slug: string | undefined): ServicePage | undefined =>
  PUBLISHED_SERVICES.find((s) => s.slug === slug);
