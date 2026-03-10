import { calculatorPages } from './calculator-content';

export const finalRegionalPages = {
  floridaMortgage: {
    path: '/finance/florida-mortgage-calculator',
    categoryPath: '/finance',
    calculatorType: 'mortgage',
    presetFields: {
      'mortgage-region': 'US',
      'loan-amount': '350000',
      'interest-rate': '6.50',
      'loan-term': '30',
      'down-payment': '70000',
    },
    eyebrow: 'Regional Mortgage Calculator',
    title: 'Florida Mortgage Calculator',
    description:
      'Estimate Florida-style mortgage payments with a dedicated landing page built for home-budget planning, rate comparison, and monthly payment checks.',
    summary: [
      'Florida-focused mortgage landing page',
      'Useful for home-budget planning and rate comparison',
      'Pairs well with salary and tax pages for affordability planning',
    ],
    formula: {
      title: 'Mortgage payment formula',
      expression: 'M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]',
      notes: [
        'Florida mortgage planning often starts with monthly payment comfort before taxes, insurance, and HOA are layered in.',
        'This page keeps the formula familiar while aligning the landing page to Florida housing intent.',
        'It is strongest as an estimate page before full closing-cost analysis.',
      ],
    },
    interpretation: [
      'Florida mortgage pages work well because users often search for local home-payment context, not just a generic mortgage tool.',
      'Use this page for early affordability checks, lender comparison, and down-payment scenario planning.',
      'Treat it as a baseline payment tool and then add property tax, insurance, and HOA assumptions separately.',
    ],
    scenarios: [
      {
        title: 'Primary home payment check',
        values: '$350,000 loan · 20% down · 30-year term',
        takeaway: 'Useful for testing whether a target monthly payment still leaves enough room for savings and living costs.',
      },
      {
        title: 'Rate comparison',
        values: 'Compare 6.50% and 6.00% on the same Florida home budget',
        takeaway: 'Even moderate rate changes can materially shift total interest and monthly affordability.',
      },
    ],
    faqs: [
      {
        question: 'Why make a Florida-specific mortgage page?',
        answer: 'Because local mortgage intent is stronger than generic mortgage intent in many search journeys, especially when users want a state-specific planning page.',
      },
      {
        question: 'Does this include property taxes and homeowners insurance?',
        answer: 'No. It focuses on core principal-and-interest mortgage math so you can establish a clean payment baseline first.',
      },
      {
        question: 'Who is this page best for?',
        answer: 'Homebuyers, refinancers, and anyone trying to benchmark a Florida home budget before speaking with lenders.',
      },
    ],
    related: [
      { href: '/finance/uk-mortgage-calculator', label: 'UK Mortgage Calculator' },
      { href: '/finance/canada-mortgage-calculator', label: 'Canada Mortgage Calculator' },
      { href: calculatorPages.mortgage.path, label: 'Generic Mortgage Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  ukMortgage: {
    path: '/finance/uk-mortgage-calculator',
    categoryPath: '/finance',
    calculatorType: 'mortgage',
    presetFields: {
      'mortgage-region': 'UK',
      'loan-amount': '300000',
      'interest-rate': '5.25',
      'loan-term': '25',
      'down-payment': '45000',
    },
    eyebrow: 'Regional Mortgage Calculator',
    title: 'UK Mortgage Calculator',
    description:
      'Estimate UK mortgage payments with a dedicated page built for local home-buying comparisons, rate checks, and long-term payment planning.',
    summary: [
      'UK-focused mortgage landing page',
      'Useful for home-buying and remortgage planning',
      'Local context for monthly payment comparisons',
    ],
    formula: {
      title: 'Mortgage payment formula',
      expression: 'M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]',
      notes: [
        'This page keeps the familiar mortgage formula while aligning the examples and context to UK search intent.',
        'It is most useful when comparing monthly payment outcomes and not just headline rates.',
        'Longer terms can look easier month to month but carry more total interest cost.',
      ],
    },
    interpretation: [
      'UK mortgage searches often focus on practical monthly affordability rather than abstract loan math.',
      'This page works well for comparing purchase scenarios, remortgaging decisions, and different term lengths.',
      'Use it to pressure-test payment comfort before layering in broader housing costs.',
    ],
    scenarios: [
      {
        title: 'First-time buyer planning',
        values: '£300,000 mortgage with a £45,000 deposit over 25 years',
        takeaway: 'A straightforward way to see whether the monthly payment fits the rest of your budget.',
      },
      {
        title: 'Remortgage comparison',
        values: 'Compare two mortgage rates on the same remaining balance',
        takeaway: 'Useful when judging whether a lower rate meaningfully changes your monthly cost.',
      },
    ],
    faqs: [
      {
        question: 'Why not just use the generic mortgage page?',
        answer: 'You can, but a UK-specific page better matches local search intent and gives users a more relevant starting point.',
      },
      {
        question: 'Is this useful for remortgaging?',
        answer: 'Yes. It is especially useful for comparing how different rates and terms affect monthly payments.',
      },
      {
        question: 'Does this include all buying costs?',
        answer: 'No. It focuses on core mortgage payment math so you can establish a reliable baseline first.',
      },
    ],
    related: [
      { href: '/finance/florida-mortgage-calculator', label: 'Florida Mortgage Calculator' },
      { href: '/finance/canada-mortgage-calculator', label: 'Canada Mortgage Calculator' },
      { href: '/tax/uk-tax-calculator', label: 'UK Tax Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  canadaMortgage: {
    path: '/finance/canada-mortgage-calculator',
    categoryPath: '/finance',
    calculatorType: 'mortgage',
    presetFields: {
      'mortgage-region': 'CA',
      'loan-amount': '450000',
      'interest-rate': '5.10',
      'loan-term': '25',
      'down-payment': '90000',
    },
    eyebrow: 'Regional Mortgage Calculator',
    title: 'Canada Mortgage Calculator',
    description:
      'Estimate Canadian mortgage payments with a region-specific landing page designed for home-budget planning and down-payment comparison.',
    summary: [
      'Canada-focused mortgage planning page',
      'Useful for home affordability and payment comparison',
      'Designed to pair with Canadian income-tax and sales-tax pages',
    ],
    formula: {
      title: 'Mortgage payment formula',
      expression: 'M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]',
      notes: [
        'This is the same core mortgage formula, but the page framing is aligned to Canadian home-buying intent.',
        'The biggest planning variables are loan size, term length, and rate sensitivity.',
        'Use the calculator for fast payment comparison before exploring lender-specific details.',
      ],
    },
    interpretation: [
      'A Canada-specific mortgage page is useful because many users search for local home-budget context first.',
      'This page works well for testing down-payment scenarios and monthly affordability.',
      'It is best used as a practical baseline before additional homeownership costs are layered in.',
    ],
    scenarios: [
      {
        title: 'Down-payment comparison',
        values: 'C$450,000 mortgage with and without a larger deposit',
        takeaway: 'Shows how much a stronger down payment can reduce monthly pressure and total interest.',
      },
      {
        title: 'Rate sensitivity check',
        values: 'Compare 5.10% and 4.75% on the same mortgage size',
        takeaway: 'Useful for judging whether rate-shopping materially changes affordability.',
      },
    ],
    faqs: [
      {
        question: 'Why make a Canada-specific mortgage page?',
        answer: 'Because users often search for local mortgage context first, and a dedicated Canadian page is a stronger landing page than a generic calculator alone.',
      },
      {
        question: 'Is this only for first-time buyers?',
        answer: 'No. It is useful for anyone checking affordability, refinancing, or comparing lender scenarios.',
      },
      {
        question: 'Can I use this with other Canada-specific pages?',
        answer: 'Yes. It pairs especially well with Canada income-tax and Canada sales-tax pages when planning the full household budget.',
      },
    ],
    related: [
      { href: '/tax/canada-income-tax-calculator', label: 'Canada Income Tax Calculator' },
      { href: '/tax/canada-sales-tax-calculator', label: 'Canada Sales Tax Calculator' },
      { href: calculatorPages.mortgage.path, label: 'Generic Mortgage Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  californiaSalesTax: {
    path: '/tax/california-sales-tax-calculator',
    categoryPath: '/finance',
    calculatorType: 'sales-tax',
    presetFields: {
      'sales-tax-region': 'us',
      'state': 'california',
      'purchase-amount': '100',
      'calculation-method': 'add-tax',
    },
    eyebrow: 'State Tax Calculator',
    title: 'California Sales Tax Calculator',
    description:
      'Add or reverse-calculate California sales tax with a dedicated state page built around the official statewide base rate context.',
    summary: [
      'Preset to California sales-tax workflow',
      'Built around the statewide 7.25% base rate context',
      'Useful for quotes, receipts, and tax-inclusive pricing checks',
    ],
    formula: {
      title: 'California sales tax logic',
      expression: 'Sales Tax = Taxable Amount × Statewide Base Rate (+ local district taxes where applicable)',
      notes: [
        'California’s statewide base sales and use tax rate is 7.25%, while local district taxes can increase the total in many places.',
        'This page is best used as a quick planning and validation tool.',
        'For location-specific exact totals, local district rates may still need to be checked separately.',
      ],
    },
    interpretation: [
      'California sales-tax searches are high-intent operational searches: users often want a fast answer for a price or invoice right now.',
      'A state-specific page better communicates the statewide base-rate context than a generic U.S. sales-tax calculator.',
      'Use this page for quick validation, then layer in district taxes if you need exact local totals.',
    ],
    scenarios: [
      {
        title: 'Retail price check',
        values: '$100 taxable amount at California statewide base rate assumptions',
        takeaway: 'Useful for sanity-checking a quoted pre-tax amount before checkout or invoicing.',
      },
      {
        title: 'Tax-inclusive receipt review',
        values: 'Reverse-calculate California sales tax from an all-in total',
        takeaway: 'Helpful for reviewing receipts, reimbursements, and local sales-tax assumptions.',
      },
    ],
    faqs: [
      {
        question: 'Why is the California page based on 7.25%?',
        answer: 'Because 7.25% is California’s statewide base sales and use tax rate; local district taxes can increase the final total depending on location.',
      },
      {
        question: 'Is this enough for exact local tax calculations?',
        answer: 'Not always. It is a strong baseline, but many California locations apply additional district taxes on top of the statewide base rate.',
      },
      {
        question: 'Who is this page for?',
        answer: 'Retail operators, freelancers, finance teams, and consumers who want a fast California-specific sales-tax estimate.',
      },
    ],
    related: [
      { href: '/tax/texas-sales-tax-calculator', label: 'Texas Sales Tax Calculator' },
      { href: '/salary/california-paycheck-calculator', label: 'California Paycheck Calculator' },
      { href: calculatorPages.vat.path, label: 'Generic VAT Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  texasSalesTax: {
    path: '/tax/texas-sales-tax-calculator',
    categoryPath: '/finance',
    calculatorType: 'sales-tax',
    presetFields: {
      'sales-tax-region': 'us',
      'state': 'texas',
      'purchase-amount': '100',
      'calculation-method': 'add-tax',
    },
    eyebrow: 'State Tax Calculator',
    title: 'Texas Sales Tax Calculator',
    description:
      'Add or reverse-calculate Texas sales tax with a dedicated state page built around the official 6.25% state rate context.',
    summary: [
      'Preset to Texas sales-tax workflow',
      'Built around the official 6.25% state rate context',
      'Useful for invoices, receipts, and price validation',
    ],
    formula: {
      title: 'Texas sales tax logic',
      expression: 'Sales Tax = Taxable Amount × State Rate (+ local sales taxes where applicable)',
      notes: [
        'Texas applies a 6.25% state sales and use tax rate, and local taxes can increase the effective total in many places.',
        'This page is meant for fast planning and validation rather than exact municipality-level quoting.',
        'It is especially useful when comparing pre-tax and after-tax price points.',
      ],
    },
    interpretation: [
      'Texas sales-tax intent is highly operational: users usually want to check a number quickly while buying, quoting, or invoicing.',
      'A Texas-specific page is a much better fit for search intent than hiding the state inside a generic U.S. sales-tax calculator.',
      'Use this as a strong default baseline, then refine for local taxes if precision matters.',
    ],
    scenarios: [
      {
        title: 'Invoice preview',
        values: '$100 taxable amount using Texas state-rate assumptions',
        takeaway: 'A clean way to check how much tax should be layered onto a quoted amount.',
      },
      {
        title: 'Reverse tax extraction',
        values: 'Start from a tax-inclusive total and isolate the sales tax portion',
        takeaway: 'Useful for reimbursements, bookkeeping, and receipt validation.',
      },
    ],
    faqs: [
      {
        question: 'Why does the Texas page use 6.25%?',
        answer: 'Because 6.25% is the Texas state sales and use tax rate. Local jurisdictions may add extra taxes on top of that state rate.',
      },
      {
        question: 'Can local taxes change the result?',
        answer: 'Yes. This page gives a strong state-rate baseline, but exact local totals can be higher when local sales taxes apply.',
      },
      {
        question: 'Who should use this page?',
        answer: 'Businesses, freelancers, finance teams, and consumers who want a quick Texas-specific sales-tax answer.',
      },
    ],
    related: [
      { href: '/tax/california-sales-tax-calculator', label: 'California Sales Tax Calculator' },
      { href: '/salary/texas-paycheck-calculator', label: 'Texas Paycheck Calculator' },
      { href: calculatorPages.vat.path, label: 'Generic VAT Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  australiaSalary: {
    path: '/salary/australia-salary-calculator',
    categoryPath: '/finance',
    calculatorType: 'salary',
    presetFields: {
      'tax-region': 'AU',
      'gross-salary': '90000',
    },
    eyebrow: 'Regional Salary Calculator',
    title: 'Australia Salary Calculator',
    description:
      'Estimate Australian take-home salary with a dedicated gross-to-net landing page built for local salary planning and relocation checks.',
    summary: [
      'Australia-focused salary landing page',
      'Useful for gross-to-net planning and relocation comparison',
      'Pairs well with Australia tax planning pages',
    ],
    formula: {
      title: 'Australia salary logic',
      expression: 'Net Salary = Gross Salary − Income Tax − Mandatory Payroll Deductions',
      notes: [
        'Australia salary searches are usually about take-home pay and real monthly income, not just abstract tax totals.',
        'This page uses the existing salary calculator flow but frames it for Australian salary intent.',
        'It is best used for planning and comparison rather than final payroll reconciliation.',
      ],
    },
    interpretation: [
      'A country-specific salary page is stronger than a generic global salary page when users care about local compensation reality.',
      'Use this page to compare offers, relocation outcomes, and monthly take-home expectations in Australia.',
      'It is especially useful when comparing Australia to another country with different payroll drag.',
    ],
    scenarios: [
      {
        title: 'Australia job-offer planning',
        values: 'A$90,000 gross salary',
        takeaway: 'Useful for turning a headline offer into a more realistic monthly and annual take-home figure.',
      },
      {
        title: 'Cross-country comparison',
        values: 'Compare an Australian offer against another region',
        takeaway: 'A local salary page helps show how much of a gross number becomes usable income.',
      },
    ],
    faqs: [
      {
        question: 'Why create an Australia salary page separately?',
        answer: 'Because country-specific salary intent is different from generic salary intent, and users expect local payroll context on the landing page.',
      },
      {
        question: 'Can I use this to compare offers?',
        answer: 'Yes. It is especially useful when comparing two salary packages or planning a relocation.',
      },
      {
        question: 'Is this exact payroll output?',
        answer: 'No. It is a planning estimate designed for decision-making, not a substitute for employer payroll calculations.',
      },
    ],
    related: [
      { href: '/tax/australia-tax-calculator', label: 'Australia Tax Calculator' },
      { href: calculatorPages.grossToNet.path, label: 'Generic Gross to Net Salary Calculator' },
      { href: '/salary/germany-salary-calculator', label: 'Germany Salary Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
};

export const finalRegionalHighlights = [
  {
    href: finalRegionalPages.floridaMortgage.path,
    title: finalRegionalPages.floridaMortgage.title,
    description: 'State-specific mortgage planning page for Florida home-budget and payment comparison intent.',
  },
  {
    href: finalRegionalPages.ukMortgage.path,
    title: finalRegionalPages.ukMortgage.title,
    description: 'Dedicated UK mortgage entry point for local payment comparisons and remortgage planning.',
  },
  {
    href: finalRegionalPages.canadaMortgage.path,
    title: finalRegionalPages.canadaMortgage.title,
    description: 'Canada-specific mortgage landing page for home-budget and down-payment scenario work.',
  },
  {
    href: finalRegionalPages.californiaSalesTax.path,
    title: finalRegionalPages.californiaSalesTax.title,
    description: 'California sales-tax workflow built around the statewide base-rate context.',
  },
  {
    href: finalRegionalPages.texasSalesTax.path,
    title: finalRegionalPages.texasSalesTax.title,
    description: 'Texas sales-tax entry point built around the official state rate context.',
  },
  {
    href: finalRegionalPages.australiaSalary.path,
    title: finalRegionalPages.australiaSalary.title,
    description: 'Australia-specific gross-to-net salary page for local offer and relocation planning.',
  },
];
