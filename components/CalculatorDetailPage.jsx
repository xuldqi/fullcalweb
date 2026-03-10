'use client';

import Link from 'next/link';
import InlineCalculator from './InlineCalculator';
import CustomCalculatorRenderer from './CustomCalculatorRenderer';
import StatePaycheckCalculator from './StatePaycheckCalculator';
import useSiteLanguage from './useSiteLanguage';
import { getSuggestedLinksForPage, siteBaseUrl } from '../lib/internal-links';

const shellCopy = {
  en: {
    home: 'Home',
    financeHub: 'Finance Hub',
    browseHub: 'Browse finance hub',
    backHome: 'Back to homepage',
    whyMatters: 'Why this page matters',
    quickInterpretation: 'Quick interpretation',
    formula: 'Formula',
    exampleScenarios: 'Example scenarios',
    useDecisionTool: 'Use it like a decision tool',
    faq: 'FAQ',
    commonQuestions: 'Common questions',
    relatedCalculators: 'Related calculators',
    nextHighIntent: 'Next high-intent pages',
    regionalShortcuts: 'Regional shortcuts',
    exploreNearby: 'Explore nearby long-tail pages',
  },
  zh: {
    home: '首页',
    financeHub: '金融中心',
    browseHub: '浏览金融中心',
    backHome: '返回首页',
    whyMatters: '页面价值',
    quickInterpretation: '快速解读',
    formula: '公式说明',
    exampleScenarios: '示例场景',
    useDecisionTool: '按决策场景使用',
    faq: '常见问题',
    commonQuestions: '问题解答',
    relatedCalculators: '相关计算器',
    nextHighIntent: '下一步推荐',
    regionalShortcuts: '地区快捷入口',
    exploreNearby: '探索附近的长尾页面',
  },
};

function buildFaqSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(page, copy) {
  const items = [
    { name: copy.home, href: '/' },
    { name: copy.financeHub, href: '/finance' },
    { name: page.title, href: page.path || '/finance' },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteBaseUrl}${item.href}`,
    })),
  };
}

function buildPageSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `${siteBaseUrl}${page.path || ''}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'FullCal',
      url: siteBaseUrl,
    },
  };
}

function renderCalculator(page) {
  if (page.customCalculator === 'state-paycheck') {
    return <StatePaycheckCalculator config={page.customCalculatorConfig} />;
  }

  if (page.customCalculator) {
    return <CustomCalculatorRenderer type={page.customCalculator} />;
  }

  return <InlineCalculator calculatorType={page.calculatorType} presetFields={page.presetFields} />;
}

export default function CalculatorDetailPage({ page }) {
  const language = useSiteLanguage();
  const copy = shellCopy[language] || shellCopy.en;
  const faqSchema = buildFaqSchema(page);
  const breadcrumbSchema = buildBreadcrumbSchema(page, copy);
  const pageSchema = buildPageSchema(page);
  const breadcrumbs = [
    { name: copy.home, href: '/' },
    { name: copy.financeHub, href: '/finance' },
    { name: page.title, href: page.path || '/finance' },
  ];
  const suggestedLinks = getSuggestedLinksForPage(page);

  return (
    <main className="calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <section className="calculator-hero">
        <div className="page-shell">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={item.href} className="breadcrumb-item">
                    {isLast ? (
                      <span className="breadcrumb-current">{item.name}</span>
                    ) : (
                      <Link href={item.href} className="breadcrumb-link">
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="page-shell calculator-hero-grid">
          <div>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="page-title">{page.title}</h1>
            <p className="page-description">{page.description}</p>
            <div className="hero-actions">
              <Link href={page.categoryPath} className="primary-link">
                {copy.browseHub}
              </Link>
              <Link href="/" className="secondary-link">
                {copy.backHome}
              </Link>
            </div>
          </div>
          <aside className="summary-card">
            <h2>{copy.whyMatters}</h2>
            <ul>
              {page.summary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="page-shell calculator-main-grid">
        <div className="calculator-surface">{renderCalculator(page)}</div>
        <aside className="insight-card">
          <h2>{copy.quickInterpretation}</h2>
          <div className="stack-list">
            {page.interpretation.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </aside>
      </section>

      <section className="page-shell content-sections">
        <article className="content-card formula-card">
          <p className="section-label">{copy.formula}</p>
          <h2>{page.formula.title}</h2>
          <div className="formula-expression">{page.formula.expression}</div>
          <ul>
            {page.formula.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>

        <article className="content-card">
          <p className="section-label">{copy.exampleScenarios}</p>
          <h2>{copy.useDecisionTool}</h2>
          <div className="scenario-list">
            {page.scenarios.map((scenario) => (
              <div key={scenario.title} className="scenario-item">
                <h3>{scenario.title}</h3>
                <p className="scenario-values">{scenario.values}</p>
                <p>{scenario.takeaway}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="content-card faq-card">
          <p className="section-label">{copy.faq}</p>
          <h2>{copy.commonQuestions}</h2>
          <div className="faq-list">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="content-card related-card">
          <p className="section-label">{copy.relatedCalculators}</p>
          <h2>{copy.nextHighIntent}</h2>
          <div className="related-links">
            {page.related.map((item) => (
              <Link key={item.href} href={item.href} className="related-link">
                {item.label}
              </Link>
            ))}
          </div>
        </article>

        <article className="content-card related-card">
          <p className="section-label">{copy.regionalShortcuts}</p>
          <h2>{copy.exploreNearby}</h2>
          <div className="link-chip-grid">
            {suggestedLinks.map((item) => (
              <Link key={item.href} href={item.href} className="link-chip">
                {item.label}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
