import { calculatorPages } from './calculator-content';

export const secondaryRegionalPages = {
  californiaPaycheck: {
    path: '/salary/california-paycheck-calculator',
    categoryPath: '/finance',
    customCalculator: 'state-paycheck',
    customCalculatorConfig: {
      stateCode: 'CA',
      label: 'California',
      defaultGrossIncome: 98000,
      assumptionLabel: 'California 2025 published personal income tax and SDI assumptions.',
      note: 'California estimates here include federal tax, FICA, California state income tax, and California SDI as a planning baseline.',
    },
    eyebrow: 'State Paycheck Calculator',
    title: 'California Paycheck Calculator',
    description:
      'Estimate California take-home pay with a state-specific paycheck calculator that layers federal taxes, payroll taxes, California income tax, and SDI into one planning view.',
    summary: [
      'Built specifically for California paycheck intent',
      'Includes California state income tax and SDI in the estimate',
      'Useful for offer comparison and relocation planning',
    ],
    formula: {
      title: 'California paycheck logic',
      expression: 'Net Pay = Gross Pay − Federal Tax − FICA − California Tax − California SDI',
      notes: [
        'This page uses 2025 federal assumptions alongside California-specific published tax and SDI inputs.',
        'A dedicated California page is much more useful than a generic U.S. salary page for local search intent.',
        'It is designed as a planning calculator, not a payroll replacement.',
      ],
    },
    interpretation: [
      'California paycheck planning usually needs a local page because state income tax and SDI meaningfully change take-home pay.',
      'This page is ideal for comparing job offers, target comp, and relocation economics in California.',
      'Use it as the state-specific layer on top of national salary expectations.',
    ],
    scenarios: [
      {
        title: 'Bay Area offer comparison',
        values: '$98,000 annual gross salary in California',
        takeaway: 'Useful for seeing how much salary survives federal plus California-specific payroll drag.',
      },
      {
        title: 'Target take-home planning',
        values: 'Compare single vs. head of household assumptions',
        takeaway: 'A state-specific paycheck page is more useful than a generic gross-to-net estimate for California-based planning.',
      },
    ],
    faqs: [
      {
        question: 'What makes California different from other U.S. paycheck pages?',
        answer: 'California adds meaningful state income tax and state disability insurance on top of federal taxes and FICA, so take-home pay can differ noticeably from no-income-tax states.',
      },
      {
        question: 'Is this an exact payroll calculator?',
        answer: 'No. It is a planning estimate built from published assumptions. Employer-specific deductions, benefits, and withholding choices can still change the final paycheck.',
      },
      {
        question: 'Why create this as a separate landing page?',
        answer: 'Because California paycheck search intent is local, commercial, and structurally different from a generic national salary calculator.',
      },
    ],
    related: [
      { href: '/salary/texas-paycheck-calculator', label: 'Texas Paycheck Calculator' },
      { href: calculatorPages.grossToNet.path, label: 'Gross to Net Salary Calculator' },
      { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  texasPaycheck: {
    path: '/salary/texas-paycheck-calculator',
    categoryPath: '/finance',
    customCalculator: 'state-paycheck',
    customCalculatorConfig: {
      stateCode: 'TX',
      label: 'Texas',
      defaultGrossIncome: 98000,
      assumptionLabel: '2025 federal assumptions plus Texas no-state-income-tax treatment.',
      note: 'Texas estimates here include federal tax and FICA, but no state personal income tax because Texas does not levy one.',
    },
    eyebrow: 'State Paycheck Calculator',
    title: 'Texas Paycheck Calculator',
    description:
      'Estimate Texas take-home pay with a dedicated state paycheck calculator that reflects federal taxes and payroll taxes without state personal income tax.',
    summary: [
      'Built specifically for Texas paycheck intent',
      'No state personal income tax in the estimate',
      'Useful for comparing Texas offers against higher-tax states',
    ],
    formula: {
      title: 'Texas paycheck logic',
      expression: 'Net Pay = Gross Pay − Federal Tax − FICA',
      notes: [
        'Texas does not impose a state personal income tax, which changes the paycheck profile versus states like California.',
        'This page uses 2025 federal assumptions and standard payroll taxes as the planning baseline.',
        'It is useful as a decision tool, not a final payroll statement.',
      ],
    },
    interpretation: [
      'Texas pages convert well because users often compare no-state-tax take-home against other states.',
      'This page is especially useful for relocation and job-offer comparisons when tax drag matters.',
      'A Texas-specific route makes the no-state-income-tax angle explicit for both users and search.',
    ],
    scenarios: [
      {
        title: 'Austin offer benchmark',
        values: '$98,000 annual gross salary in Texas',
        takeaway: 'Useful for understanding how much of a salary remains when state income tax is not part of the equation.',
      },
      {
        title: 'Texas vs. California comparison',
        values: 'Same gross pay in two different states',
        takeaway: 'This is exactly the kind of comparison that a state-specific paycheck page helps clarify.',
      },
    ],
    faqs: [
      {
        question: 'Why is Texas paycheck planning different?',
        answer: 'Because Texas does not levy a state personal income tax, which can materially change take-home pay compared with higher-tax states.',
      },
      {
        question: 'Does this page still include payroll taxes?',
        answer: 'Yes. Federal income tax, Social Security, and Medicare are still part of the estimate.',
      },
      {
        question: 'Is this page useful for relocation decisions?',
        answer: 'Very. It helps show how a no-state-tax environment changes the practical value of a compensation package.',
      },
    ],
    related: [
      { href: '/salary/california-paycheck-calculator', label: 'California Paycheck Calculator' },
      { href: calculatorPages.grossToNet.path, label: 'Gross to Net Salary Calculator' },
      { href: '/salary/hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  ukVat: {
    path: '/tax/uk-vat-calculator',
    categoryPath: '/finance',
    calculatorType: 'sales-tax',
    presetFields: {
      'sales-tax-region': 'uk',
      'purchase-amount': '125',
      'vat-rate': '20',
      'calculation-method': 'add-tax',
    },
    eyebrow: 'Regional Tax Calculator',
    title: 'UK VAT Calculator',
    description:
      'Add or reverse-calculate UK VAT with a dedicated page built around UK invoice, quote, and tax-inclusive pricing workflows.',
    summary: [
      'Preset for UK VAT usage',
      'Useful for invoicing and tax-inclusive pricing checks',
      'Better aligned with UK search intent than a generic sales-tax page',
    ],
    formula: {
      title: 'UK VAT logic',
      expression: 'VAT = Net Amount × VAT Rate',
      notes: [
        'This page is preset to the UK VAT workflow so users land in the right context immediately.',
        'The standard VAT rate is commonly the starting point for invoice and pricing checks.',
        'Reverse calculation is useful when a total already includes VAT.',
      ],
    },
    interpretation: [
      'UK VAT searches are operational searches: people want a fast answer for quoting, invoicing, and validation.',
      'A dedicated regional VAT route is more useful than burying VAT inside a global sales-tax page.',
      'This page works well for businesses, freelancers, and e-commerce operators.',
    ],
    scenarios: [
      {
        title: 'Invoice total check',
        values: '£125 net amount with standard UK VAT assumptions',
        takeaway: 'A fast way to validate quote totals before sending them to clients.',
      },
      {
        title: 'Reverse VAT on gross price',
        values: 'Start from a tax-inclusive total and extract VAT',
        takeaway: 'Useful when reviewing supplier invoices or marketplace pricing.',
      },
    ],
    faqs: [
      {
        question: 'Why make a dedicated UK VAT page?',
        answer: 'Because UK users search for VAT specifically, not for a generic international sales-tax calculator.',
      },
      {
        question: 'Can I reverse-calculate VAT on this page?',
        answer: 'Yes. The calculator supports both adding VAT and extracting the tax from a VAT-inclusive price.',
      },
      {
        question: 'Who is this page for?',
        answer: 'Freelancers, small businesses, finance teams, and anyone checking UK invoice totals quickly.',
      },
    ],
    related: [
      { href: calculatorPages.vat.path, label: 'Generic VAT Calculator' },
      { href: '/tax/canada-sales-tax-calculator', label: 'Canada Sales Tax Calculator' },
      { href: '/tax/uk-tax-calculator', label: 'UK Tax Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  canadaSalesTax: {
    path: '/tax/canada-sales-tax-calculator',
    categoryPath: '/finance',
    calculatorType: 'sales-tax',
    presetFields: {
      'sales-tax-region': 'ca',
      'purchase-amount': '100',
      'sales-province': 'ontario',
      'calculation-method': 'add-tax',
    },
    eyebrow: 'Regional Tax Calculator',
    title: 'Canada Sales Tax Calculator',
    description:
      'Estimate Canada sales tax with province-aware context so you can check totals, quotes, and invoice amounts more realistically.',
    summary: [
      'Preset for Canada sales tax use cases',
      'Province-aware entry point for tax-inclusive totals',
      'Useful for pricing, invoices, and checkout validation',
    ],
    formula: {
      title: 'Canada sales tax logic',
      expression: 'Sales Tax = Net Amount × Provincial / HST-style Rate',
      notes: [
        'Canada sales-tax behavior often depends on province, which is why a localized page matters.',
        'This page is useful for operational pricing checks rather than only general tax education.',
        'Province-aware routes create better search alignment and better user context.',
      ],
    },
    interpretation: [
      'Canada sales-tax searches often happen at the moment of pricing, quoting, or bookkeeping.',
      'Province selection is the most important context signal on the page.',
      'This regional route is the right base for later province-specific pages if you decide to go deeper.',
    ],
    scenarios: [
      {
        title: 'Ontario invoice preview',
        values: 'C$100 subtotal with Ontario selected',
        takeaway: 'Useful for validating totals before sending quotes or checking receipts.',
      },
      {
        title: 'Province comparison',
        values: 'Compare Ontario vs. Alberta assumptions',
        takeaway: 'A province-aware page is more helpful than a one-size-fits-all tax calculator.',
      },
    ],
    faqs: [
      {
        question: 'Why does Canada sales tax need province context?',
        answer: 'Because Canada sales-tax treatment differs by province, which can materially change the final total.',
      },
      {
        question: 'Can I use this for reverse tax calculations?',
        answer: 'Yes. The page supports both adding tax to a subtotal and extracting tax from an all-in total.',
      },
      {
        question: 'What is this page best for?',
        answer: 'Invoices, quotes, receipts, checkout validation, and quick bookkeeping checks with Canadian context.',
      },
    ],
    related: [
      { href: calculatorPages.vat.path, label: 'Generic VAT Calculator' },
      { href: '/tax/uk-vat-calculator', label: 'UK VAT Calculator' },
      { href: '/tax/canada-income-tax-calculator', label: 'Canada Income Tax Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
};

export const secondaryRegionalHighlights = [
  {
    href: secondaryRegionalPages.californiaPaycheck.path,
    title: secondaryRegionalPages.californiaPaycheck.title,
    description: 'State-specific paycheck planning for California with federal, FICA, state tax, and SDI in view.',
  },
  {
    href: secondaryRegionalPages.texasPaycheck.path,
    title: secondaryRegionalPages.texasPaycheck.title,
    description: 'Texas paycheck planning built around the no-state-income-tax angle users actually search for.',
  },
  {
    href: secondaryRegionalPages.ukVat.path,
    title: secondaryRegionalPages.ukVat.title,
    description: 'Dedicated UK VAT workflow for invoice and quote calculations.',
  },
  {
    href: secondaryRegionalPages.canadaSalesTax.path,
    title: secondaryRegionalPages.canadaSalesTax.title,
    description: 'Province-aware Canada sales tax entry point for invoice and pricing checks.',
  },
];
