const baseUrl = 'https://fullcal.colletools.com';

export default function sitemap() {
  return [
    '',
    '/finance',
    '/finance/mortgage-calculator',
    '/finance/amortization-calculator',
    '/finance/refinance-calculator',
    '/finance/loan-repayment-calculator',
    '/finance/roi-calculator',
    '/finance/florida-mortgage-calculator',
    '/finance/uk-mortgage-calculator',
    '/finance/canada-mortgage-calculator',
    '/tax/income-tax-calculator',
    '/tax/vat-calculator',
    '/tax/uk-tax-calculator',
    '/tax/canada-income-tax-calculator',
    '/tax/australia-tax-calculator',
    '/tax/uk-vat-calculator',
    '/tax/canada-sales-tax-calculator',
    '/tax/california-sales-tax-calculator',
    '/tax/texas-sales-tax-calculator',
    '/salary/gross-to-net-calculator',
    '/salary/hourly-to-salary-calculator',
    '/salary/net-to-gross-calculator',
    '/salary/germany-salary-calculator',
    '/salary/california-paycheck-calculator',
    '/salary/texas-paycheck-calculator',
    '/salary/australia-salary-calculator',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
