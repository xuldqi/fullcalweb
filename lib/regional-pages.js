import { calculatorPages } from './calculator-content';

export const regionalPages = {
  ukTax: {
    path: '/tax/uk-tax-calculator',
    categoryPath: '/finance',
    calculatorType: 'income-tax',
    presetFields: {
      'tax-region': 'uk',
      'annual-income': '60000',
      'tax-code': '1257L',
    },
    eyebrow: 'Regional Tax Calculator',
    title: 'UK Tax Calculator',
    description:
      'Estimate UK income tax with a PAYE-style planning page built for local tax codes, salary comparisons, and take-home checks.',
    summary: [
      'Preconfigured for United Kingdom tax logic',
      'Useful for PAYE salary planning and offer comparison',
      'Localized examples and FAQ for UK users',
    ],
    formula: {
      title: 'UK income tax logic',
      expression: 'Taxable Income = Gross Income − Personal Allowance',
      notes: [
        'UK tax planning typically starts with the personal allowance before applying progressive bands.',
        'PAYE salary comparisons often focus on annual take-home and monthly net pay.',
        'Tax code assumptions can change how close an estimate is to actual payroll.',
      ],
    },
    interpretation: [
      'This page is strongest for salary planning, offer comparison, and rough net-pay estimation in the UK.',
      'Tax code context matters, so use a realistic code rather than treating all UK payroll the same.',
      'It works best as a planning tool before you rely on employer-specific payroll details.',
    ],
    scenarios: [
      {
        title: 'London offer comparison',
        values: '£60,000 gross salary with standard tax code assumptions',
        takeaway: 'Useful for checking whether a headline salary still works after tax in a higher-cost city.',
      },
      {
        title: 'Raise impact estimate',
        values: 'Compare £52,000 and £58,000 annual salary',
        takeaway: 'Shows how much of a raise actually turns into higher take-home pay.',
      },
    ],
    faqs: [
      {
        question: 'Does this use UK-style tax code assumptions?',
        answer: 'Yes. The page is framed for UK payroll planning and allows a tax-code field for more local context.',
      },
      {
        question: 'Is this enough for final payslip accuracy?',
        answer: 'No. Use it for planning and estimation. Employer payroll setup and specific deductions can still change the final result.',
      },
      {
        question: 'Who is this page best for?',
        answer: 'Employees comparing job offers, people planning a raise, and anyone trying to estimate UK take-home pay quickly.',
      },
    ],
    related: [
      { href: calculatorPages.incomeTax.path, label: 'Generic Income Tax Calculator' },
      { href: '/tax/canada-income-tax-calculator', label: 'Canada Income Tax Calculator' },
      { href: '/salary/germany-salary-calculator', label: 'Germany Salary Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  canadaIncomeTax: {
    path: '/tax/canada-income-tax-calculator',
    categoryPath: '/finance',
    calculatorType: 'income-tax',
    presetFields: {
      'tax-region': 'ca',
      'annual-income': '85000',
      province: 'ontario',
    },
    eyebrow: 'Regional Tax Calculator',
    title: 'Canada Income Tax Calculator',
    description:
      'Estimate Canada income tax with federal and provincial context so you can compare offers and plan take-home pay more realistically.',
    summary: [
      'Preconfigured for Canadian tax estimation',
      'Includes province-level context in the workflow',
      'Designed for salary planning and cross-province comparisons',
    ],
    formula: {
      title: 'Canada tax logic',
      expression: 'Total Tax ≈ Federal Tax + Provincial Tax',
      notes: [
        'Canadian tax planning often requires both federal and provincial layers.',
        'Province choice can materially change the final estimate.',
        'This makes a province-aware landing page much more useful than a generic tax page.',
      ],
    },
    interpretation: [
      'This page is useful when comparing job offers across provinces or estimating the real value of a salary move.',
      'Province selection is often as important as gross salary when planning take-home pay in Canada.',
      'Use the result for planning, then validate final payroll details with employer and CRA-aligned documents.',
    ],
    scenarios: [
      {
        title: 'Ontario salary check',
        values: 'C$85,000 in Ontario',
        takeaway: 'A fast way to turn a job offer into a more realistic after-tax planning number.',
      },
      {
        title: 'Province comparison',
        values: 'Same salary in Ontario vs. Alberta',
        takeaway: 'Shows why province-specific pages are more useful than generic nationwide estimates.',
      },
    ],
    faqs: [
      {
        question: 'Why does province matter so much?',
        answer: 'Because Canadian take-home pay depends on both federal and provincial tax layers, which can differ noticeably.',
      },
      {
        question: 'Can I use this page for salary negotiations?',
        answer: 'Yes. It is especially useful when comparing offers across provinces or evaluating relocation trade-offs.',
      },
      {
        question: 'Does this replace formal tax filing?',
        answer: 'No. It is a planning tool, not a substitute for official filing or personalized tax advice.',
      },
    ],
    related: [
      { href: calculatorPages.incomeTax.path, label: 'Generic Income Tax Calculator' },
      { href: '/tax/uk-tax-calculator', label: 'UK Tax Calculator' },
      { href: '/salary/gross-to-net-calculator', label: 'Gross to Net Salary Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  australiaTax: {
    path: '/tax/australia-tax-calculator',
    categoryPath: '/finance',
    calculatorType: 'income-tax',
    presetFields: {
      'tax-region': 'au',
      'annual-income': '90000',
    },
    eyebrow: 'Regional Tax Calculator',
    title: 'Australia Tax Calculator',
    description:
      'Estimate Australian income tax and use the result for salary planning, relocation checks, and rough take-home comparisons.',
    summary: [
      'Preconfigured for Australia-focused tax estimation',
      'Useful for salary planning and relocation checks',
      'Built as a regional landing page, not just a generic tax tool',
    ],
    formula: {
      title: 'Australia tax logic',
      expression: 'Tax = Σ income across brackets, with Australia-specific rate assumptions',
      notes: [
        'Australian payroll planning often needs a local tax interpretation rather than a generic global template.',
        'Regional framing improves relevance for search and for actual user expectations.',
        'This page is designed to be expanded later with deeper Australia-specific tax components.',
      ],
    },
    interpretation: [
      'Use this page for initial salary planning and to compare different compensation outcomes in Australia.',
      'It is especially helpful for people relocating or benchmarking an Australian offer against another market.',
      'Over time, this regional page can support richer local logic without forcing every user through a generic flow.',
    ],
    scenarios: [
      {
        title: 'Relocation benchmark',
        values: 'A$90,000 gross salary in Australia',
        takeaway: 'Gives a fast first-pass estimate before you layer in retirement and location-specific costs.',
      },
      {
        title: 'Raise planning',
        values: 'Compare A$82,000 vs. A$95,000 annual pay',
        takeaway: 'Useful for seeing how much of a raise changes real take-home money.',
      },
    ],
    faqs: [
      {
        question: 'Why make an Australia-specific tax page?',
        answer: 'Because users searching for Australian tax answers expect local framing, not a generic global tax page.',
      },
      {
        question: 'Is this page for filing or planning?',
        answer: 'Planning. It is designed to help with comparisons, budgeting, and negotiation rather than official filing.',
      },
      {
        question: 'Can this be made more localized later?',
        answer: 'Yes. This route is a strong base for later Australia-specific enhancements such as Medicare and deeper payroll logic.',
      },
    ],
    related: [
      { href: calculatorPages.incomeTax.path, label: 'Generic Income Tax Calculator' },
      { href: '/tax/uk-tax-calculator', label: 'UK Tax Calculator' },
      { href: '/tax/canada-income-tax-calculator', label: 'Canada Income Tax Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  germanySalary: {
    path: '/salary/germany-salary-calculator',
    categoryPath: '/finance',
    calculatorType: 'salary',
    presetFields: {
      'tax-region': 'DE',
      'gross-salary': '65000',
    },
    eyebrow: 'Regional Salary Calculator',
    title: 'Germany Salary Calculator',
    description:
      'Estimate German take-home salary with a dedicated landing page built for local payroll expectations and gross-to-net planning.',
    summary: [
      'Preconfigured for Germany salary estimation',
      'Gross-to-net planning with Germany as the default context',
      'Useful for local salaries, offers, and relocation checks',
    ],
    formula: {
      title: 'Germany salary logic',
      expression: 'Net Salary = Gross Salary − Income Tax − Mandatory Contributions',
      notes: [
        'German salary planning usually needs a dedicated gross-to-net perspective rather than a generic tax-only page.',
        'Payroll expectations are highly local, so a Germany-specific route is a better fit for users and search intent.',
        'This page is a strong base for later additions like tax class and deeper contribution logic.',
      ],
    },
    interpretation: [
      'Germany salary searches are often about take-home pay, not just tax in isolation.',
      'This page is useful for relocation planning, compensation comparison, and checking real monthly income.',
      'A local gross-to-net landing page is a better business and UX fit than sending all users through one generic salary calculator.',
    ],
    scenarios: [
      {
        title: 'Berlin offer evaluation',
        values: '€65,000 gross annual salary',
        takeaway: 'A direct way to judge monthly take-home expectations before comparing rent and lifestyle costs.',
      },
      {
        title: 'Germany relocation planning',
        values: 'Compare a local Germany package against another country',
        takeaway: 'Net pay is often the clearest way to compare real financial outcomes across borders.',
      },
    ],
    faqs: [
      {
        question: 'Why make Germany a salary page instead of only a tax page?',
        answer: 'Because many users search for Germany salary or gross-to-net outcomes, which maps better to take-home planning than tax alone.',
      },
      {
        question: 'Is this useful for relocation decisions?',
        answer: 'Yes. It helps translate headline salary into practical take-home context before housing and living costs are added.',
      },
      {
        question: 'Will this support deeper Germany payroll logic later?',
        answer: 'Yes. This route gives you the right long-tail destination to evolve with more Germany-specific rules over time.',
      },
    ],
    related: [
      { href: calculatorPages.grossToNet.path, label: 'Generic Gross to Net Salary Calculator' },
      { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
      { href: '/tax/uk-tax-calculator', label: 'UK Tax Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
};

export const regionalHighlights = [
  {
    href: regionalPages.ukTax.path,
    title: regionalPages.ukTax.title,
    description: 'Dedicated UK tax planning page with local framing for PAYE-style salary checks.',
  },
  {
    href: regionalPages.canadaIncomeTax.path,
    title: regionalPages.canadaIncomeTax.title,
    description: 'Province-aware tax entry point for higher-intent Canadian salary planning.',
  },
  {
    href: regionalPages.australiaTax.path,
    title: regionalPages.australiaTax.title,
    description: 'Australia-focused tax landing page for local salary and relocation comparisons.',
  },
  {
    href: regionalPages.germanySalary.path,
    title: regionalPages.germanySalary.title,
    description: 'Germany-specific gross-to-net page built around local salary search intent.',
  },
];
