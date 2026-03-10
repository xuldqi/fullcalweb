export const siteBaseUrl = 'https://fullcal.colletools.com';

export const coreFinanceLinks = [
  { href: '/finance/mortgage-calculator', label: 'Mortgage Calculator' },
  { href: '/finance/amortization-calculator', label: 'Amortization Calculator' },
  { href: '/finance/refinance-calculator', label: 'Refinance Calculator' },
  { href: '/finance/loan-repayment-calculator', label: 'Loan Repayment Calculator' },
  { href: '/finance/roi-calculator', label: 'ROI Calculator' },
  { href: '/tax/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/tax/vat-calculator', label: 'VAT Calculator' },
  { href: '/salary/gross-to-net-calculator', label: 'Gross to Net Salary Calculator' },
  { href: '/salary/hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
  { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
];

export const regionalTaxLinks = [
  { href: '/tax/uk-tax-calculator', label: 'UK Tax Calculator' },
  { href: '/tax/canada-income-tax-calculator', label: 'Canada Income Tax Calculator' },
  { href: '/tax/australia-tax-calculator', label: 'Australia Tax Calculator' },
  { href: '/tax/uk-vat-calculator', label: 'UK VAT Calculator' },
  { href: '/tax/canada-sales-tax-calculator', label: 'Canada Sales Tax Calculator' },
  { href: '/tax/california-sales-tax-calculator', label: 'California Sales Tax Calculator' },
  { href: '/tax/texas-sales-tax-calculator', label: 'Texas Sales Tax Calculator' },
];

export const regionalSalaryLinks = [
  { href: '/salary/germany-salary-calculator', label: 'Germany Salary Calculator' },
  { href: '/salary/australia-salary-calculator', label: 'Australia Salary Calculator' },
  { href: '/salary/california-paycheck-calculator', label: 'California Paycheck Calculator' },
  { href: '/salary/texas-paycheck-calculator', label: 'Texas Paycheck Calculator' },
  { href: '/salary/gross-to-net-calculator', label: 'Gross to Net Salary Calculator' },
  { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
];

export const regionalMortgageLinks = [
  { href: '/finance/florida-mortgage-calculator', label: 'Florida Mortgage Calculator' },
  { href: '/finance/uk-mortgage-calculator', label: 'UK Mortgage Calculator' },
  { href: '/finance/canada-mortgage-calculator', label: 'Canada Mortgage Calculator' },
  { href: '/finance/mortgage-calculator', label: 'Generic Mortgage Calculator' },
  { href: '/finance/amortization-calculator', label: 'Amortization Calculator' },
  { href: '/finance/refinance-calculator', label: 'Refinance Calculator' },
];

export const financeHubLinkGroups = [
  {
    title: 'Mortgage & Lending',
    links: regionalMortgageLinks,
  },
  {
    title: 'Regional Tax Pages',
    links: regionalTaxLinks,
  },
  {
    title: 'Salary & Paycheck',
    links: regionalSalaryLinks,
  },
];

function uniqueByHref(links) {
  const seen = new Set();
  return links.filter((link) => {
    if (seen.has(link.href)) {
      return false;
    }
    seen.add(link.href);
    return true;
  });
}

export function getSuggestedLinksForPage(page) {
  if (!page?.path) {
    return uniqueByHref([...coreFinanceLinks.slice(0, 4), ...regionalTaxLinks.slice(0, 4)]).slice(0, 8);
  }

  if (page.path.includes('/tax/')) {
    return uniqueByHref([...regionalTaxLinks, ...regionalSalaryLinks.slice(0, 3), ...coreFinanceLinks.slice(0, 2)])
      .filter((link) => link.href !== page.path)
      .slice(0, 8);
  }

  if (page.path.includes('/salary/')) {
    return uniqueByHref([...regionalSalaryLinks, ...regionalTaxLinks.slice(0, 3), ...coreFinanceLinks.slice(0, 2)])
      .filter((link) => link.href !== page.path)
      .slice(0, 8);
  }

  if (page.title?.includes('Mortgage')) {
    return uniqueByHref([...regionalMortgageLinks, ...regionalSalaryLinks.slice(0, 2), ...regionalTaxLinks.slice(0, 2)])
      .filter((link) => link.href !== page.path)
      .slice(0, 8);
  }

  return uniqueByHref([...coreFinanceLinks, ...regionalTaxLinks.slice(0, 3), ...regionalSalaryLinks.slice(0, 3)])
    .filter((link) => link.href !== page.path)
    .slice(0, 8);
}

export function getBreadcrumbItems(page) {
  return [
    { name: 'Home', href: '/' },
    { name: 'Finance Hub', href: '/finance' },
    { name: page.title, href: page.path || '/finance' },
  ];
}
