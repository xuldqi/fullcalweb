import Link from 'next/link';
import {
  coreFinanceLinks,
  regionalMortgageLinks,
  regionalSalaryLinks,
  regionalTaxLinks,
  siteBaseUrl,
} from '../lib/internal-links';

const featuredCalculators = [
  { href: '/finance/mortgage-calculator', title: 'Mortgage Calculator', description: 'Estimate monthly payment and total interest before you buy.' },
  { href: '/finance/amortization-calculator', title: 'Amortization Calculator', description: 'See every payment split between principal and interest.' },
  { href: '/finance/refinance-calculator', title: 'Refinance Calculator', description: 'Compare break-even timing and lifetime savings.' },
  { href: '/salary/gross-to-net-calculator', title: 'Gross to Net Salary', description: 'Turn gross salary into take-home pay quickly.' },
  { href: '/salary/net-to-gross-calculator', title: 'Net to Gross Salary', description: 'Work backward from your target take-home income.' },
  { href: '/tax/income-tax-calculator', title: 'Income Tax Calculator', description: 'Estimate tax burden by country and salary level.' },
  { href: '/tax/vat-calculator', title: 'VAT Calculator', description: 'Add or reverse VAT for quotes, invoices, and receipts.' },
  { href: '/finance/roi-calculator', title: 'ROI Calculator', description: 'Compare contribution plans and long-term return outcomes.' },
  { href: '/salary/california-paycheck-calculator', title: 'California Paycheck', description: 'Estimate state-focused take-home pay and deductions.' },
  { href: '/salary/texas-paycheck-calculator', title: 'Texas Paycheck', description: 'Model take-home pay in a no-state-income-tax context.' },
  { href: '/tax/uk-vat-calculator', title: 'UK VAT Calculator', description: 'VAT workflows for invoice checks and tax-inclusive totals.' },
  { href: '/finance/florida-mortgage-calculator', title: 'Florida Mortgage', description: 'Run local mortgage scenarios with fast monthly checks.' },
];

const useCases = [
  {
    title: 'Salary Planning',
    description: 'Compare offers, estimate paycheck impact, and set realistic gross/net targets.',
    links: [
      '/salary/gross-to-net-calculator',
      '/salary/net-to-gross-calculator',
      '/salary/california-paycheck-calculator',
    ],
  },
  {
    title: 'Tax & VAT Operations',
    description: 'Calculate income tax, VAT, and sales tax with country/state shortcuts.',
    links: ['/tax/income-tax-calculator', '/tax/uk-vat-calculator', '/tax/canada-sales-tax-calculator'],
  },
  {
    title: 'Mortgage Decisions',
    description: 'Validate affordability, compare terms, and check refinance outcomes.',
    links: ['/finance/mortgage-calculator', '/finance/amortization-calculator', '/finance/refinance-calculator'],
  },
  {
    title: 'Investment Forecasting',
    description: 'Model growth and return assumptions before committing capital.',
    links: ['/finance/roi-calculator', '/finance/loan-repayment-calculator', '/finance/uk-mortgage-calculator'],
  },
];

const homeFaq = [
  {
    question: 'Are calculations done on the server?',
    answer: 'No. Core calculator logic runs in-browser so results are computed locally on your device.',
  },
  {
    question: 'Can I use country or state-specific pages directly?',
    answer: 'Yes. Each regional page preloads local context so you can start with the right assumptions immediately.',
  },
  {
    question: 'Should I rely on this for official filing or lending paperwork?',
    answer: 'Use these results for planning and comparison. For legal or filing accuracy, confirm with official sources.',
  },
];

function uniqueLinks(links) {
  const seen = new Set();
  return links.filter((item) => {
    if (seen.has(item.href)) {
      return false;
    }
    seen.add(item.href);
    return true;
  });
}

function toLinkObject(path) {
  return coreFinanceLinks.find((item) => item.href === path)
    || regionalTaxLinks.find((item) => item.href === path)
    || regionalSalaryLinks.find((item) => item.href === path)
    || regionalMortgageLinks.find((item) => item.href === path)
    || { href: path, label: path };
}

function buildHomeSchemas() {
  const directoryList = featuredCalculators.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${siteBaseUrl}${item.href}`,
    name: item.title,
  }));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'FullCal - Finance and Tax Calculator Hub',
      description:
        'Use FullCal to compare salary, tax, mortgage, VAT, and regional calculator scenarios with practical planning pages.',
      url: `${siteBaseUrl}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Popular calculators',
      itemListElement: directoryList,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];
}

export default function HomePage() {
  const regionalHighlights = uniqueLinks([
    ...regionalTaxLinks,
    ...regionalSalaryLinks,
    ...regionalMortgageLinks,
  ]).slice(0, 12);
  const schemas = buildHomeSchemas();

  return (
    <main className="home-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <section className="home-hero">
        <div className="page-shell home-hero-grid">
          <div>
            <p className="eyebrow">Finance & Tax Toolkit</p>
            <h1 className="home-title">Stop guessing money decisions. Run the numbers first.</h1>
            <p className="home-subtitle">
              FullCal helps you estimate salary take-home pay, mortgage affordability, tax impact, and VAT/sales-tax totals across countries and states.
            </p>
            <div className="hero-actions">
              <Link href="/finance" className="primary-link">Open Finance Hub</Link>
              <Link href="/tax/uk-tax-calculator" className="secondary-link">Try a Regional Tax Page</Link>
            </div>
            <div className="home-stat-grid">
              <div className="home-stat-card">
                <p className="home-stat-value">30+</p>
                <p className="home-stat-label">Ready Routes</p>
              </div>
              <div className="home-stat-card">
                <p className="home-stat-value">14+</p>
                <p className="home-stat-label">Regional Pages</p>
              </div>
              <div className="home-stat-card">
                <p className="home-stat-value">100%</p>
                <p className="home-stat-label">Browser-side Calculations</p>
              </div>
              <div className="home-stat-card">
                <p className="home-stat-value">Fast</p>
                <p className="home-stat-label">No Signup Needed</p>
              </div>
            </div>
          </div>

          <aside className="home-hero-panel">
            <h2>Start here</h2>
            <p>Pick the workflow that matches your decision and jump directly into local assumptions.</p>
            <div className="link-chip-grid">
              <Link href="/salary/gross-to-net-calculator" className="link-chip">Salary Planning</Link>
              <Link href="/finance/mortgage-calculator" className="link-chip">Mortgage Planning</Link>
              <Link href="/tax/income-tax-calculator" className="link-chip">Income Tax Checks</Link>
              <Link href="/tax/uk-vat-calculator" className="link-chip">VAT & Sales Tax</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="page-shell home-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Popular Calculators</p>
            <h2>High-intent pages used most</h2>
          </div>
        </div>
        <div className="home-card-grid">
          {featuredCalculators.map((item) => (
            <article key={item.href} className="home-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href} className="related-link">Open calculator</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell home-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">By Goal</p>
            <h2>Choose by decision type</h2>
          </div>
        </div>
        <div className="home-card-grid home-usecase-grid">
          {useCases.map((group) => (
            <article key={group.title} className="home-card home-usecase-card">
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="home-link-list">
                {group.links.map((path) => {
                  const item = toLinkObject(path);
                  return (
                    <Link key={item.href} href={item.href} className="home-inline-link">
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell home-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Regional Library</p>
            <h2>Country and state entry points</h2>
          </div>
        </div>
        <div className="link-chip-grid">
          {regionalHighlights.map((item) => (
            <Link key={item.href} href={item.href} className="link-chip">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell home-section">
        <div className="home-two-col">
          <article className="content-card">
            <p className="section-label">How to Use</p>
            <h2>Three-step workflow</h2>
            <div className="scenario-list">
              <div className="scenario-item">
                <h3>1. Start with a regional page</h3>
                <p>Use country/state shortcuts first so assumptions and fields match your situation.</p>
              </div>
              <div className="scenario-item">
                <h3>2. Compare at least two scenarios</h3>
                <p>Run a base case and a stress case; decisions are better when you compare outcomes side by side.</p>
              </div>
              <div className="scenario-item">
                <h3>3. Use output for planning, not filing</h3>
                <p>Use these calculators for budgeting and comparisons, then verify final numbers with official sources.</p>
              </div>
            </div>
          </article>

          <article className="content-card faq-card">
            <p className="section-label">FAQ</p>
            <h2>What users ask first</h2>
            <div className="faq-list">
              {homeFaq.map((faq) => (
                <div key={faq.question} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
