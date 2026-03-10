import Link from 'next/link';
import { financeHub } from '../../lib/calculator-content';
import { regionalHighlights } from '../../lib/regional-pages';
import { secondaryRegionalHighlights } from '../../lib/secondary-regional-pages';
import { finalRegionalHighlights } from '../../lib/final-regional-pages';
import { financeHubLinkGroups, siteBaseUrl } from '../../lib/internal-links';

const combinedRegionalHighlights = [...regionalHighlights, ...secondaryRegionalHighlights, ...finalRegionalHighlights];

function buildCollectionSchema() {
  const itemList = [...financeHub.featured, ...combinedRegionalHighlights].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${siteBaseUrl}${item.href}`,
    name: item.title,
  }));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Finance Calculators',
      description:
        'Explore FullCal finance calculators for mortgage planning, amortization, refinancing, salary comparison, VAT, income tax, investing, and regional tax pages.',
      url: `${siteBaseUrl}/finance`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Finance calculator directory',
      itemListElement: itemList,
    },
  ];
}

export const metadata = {
  title: 'Finance Calculators | FullCal',
  description:
    'Explore FullCal finance calculators for mortgage planning, amortization, refinancing, salary comparison, VAT, income tax, investing, and regional tax pages.',
  alternates: {
    canonical: '/finance',
  },
};

export default function FinanceHubPage() {
  const collectionSchema = buildCollectionSchema();

  return (
    <main className="hub-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <section className="calculator-hero">
        <div className="page-shell hub-hero-grid">
          <div>
            <p className="eyebrow">Focused calculator cluster</p>
            <h1 className="page-title">{financeHub.title}</h1>
            <p className="page-description">{financeHub.description}</p>
            <div className="hero-actions">
              <Link href="/finance/mortgage-calculator" className="primary-link">
                Start with mortgage
              </Link>
              <Link href="/" className="secondary-link">
                Back to homepage
              </Link>
            </div>
          </div>
          <aside className="summary-card">
            <h2>What to build next</h2>
            <ul>
              <li>Publish independent landing pages instead of relying on homepage modals</li>
              <li>Add formulas, scenarios, FAQ, and related links to every money page</li>
              <li>Expand into region long-tail once these core templates start ranking</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="page-shell hub-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Featured</p>
            <h2>Launch-ready finance pages</h2>
          </div>
        </div>
        <div className="hub-card-grid">
          {financeHub.featured.map((item) => (
            <article key={item.href} className="hub-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href} className="related-link">
                Open calculator page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell hub-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Quick paths</p>
            <h2>Jump by topic and region</h2>
          </div>
        </div>
        <div className="cluster-grid">
          {financeHubLinkGroups.map((group) => (
            <article key={group.title} className="content-card cluster-card">
              <h3>{group.title}</h3>
              <div className="link-chip-grid compact-chip-grid">
                {group.links.map((item) => (
                  <Link key={item.href} href={item.href} className="link-chip">
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell hub-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Regional expansion</p>
            <h2>Long-tail country and state pages</h2>
          </div>
        </div>
        <div className="hub-card-grid">
          {combinedRegionalHighlights.map((item) => (
            <article key={item.href} className="hub-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href} className="related-link">
                Open regional page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell hub-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Expansion map</p>
            <h2>Finance clusters worth scaling next</h2>
          </div>
        </div>
        <div className="cluster-grid">
          {financeHub.clusters.map((cluster) => (
            <article key={cluster.title} className="content-card cluster-card">
              <h3>{cluster.title}</h3>
              <ul>
                {cluster.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
