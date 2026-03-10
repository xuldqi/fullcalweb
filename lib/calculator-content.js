export const calculatorPages = {
  mortgage: {
    path: '/finance/mortgage-calculator',
    categoryPath: '/finance',
    calculatorType: 'mortgage',
    eyebrow: 'Finance Calculator',
    title: 'Mortgage Calculator',
    description:
      'Estimate monthly mortgage payments, total interest, and the real cost of buying a home before you talk to a lender.',
    summary: [
      'Monthly payment estimate in seconds',
      'Principal vs. interest breakdown',
      'Useful for purchase, refinance, and scenario planning',
    ],
    formula: {
      title: 'Mortgage payment formula',
      expression: 'M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]',
      notes: [
        'M is the monthly payment.',
        'P is the loan principal after down payment.',
        'r is the monthly interest rate.',
        'n is the total number of monthly payments.',
      ],
    },
    interpretation: [
      'Compare 15-year and 30-year terms to see the trade-off between monthly cash flow and total interest.',
      'A lower rate matters, but a smaller loan amount often has a bigger lifetime impact.',
      'Use this page early in the buying journey to test affordable payment ranges, not just maximum approvals.',
    ],
    scenarios: [
      {
        title: 'First-home budget check',
        values: '$380,000 home · 20% down · 6.5% APR · 30 years',
        takeaway:
          'Great for checking whether the payment still feels comfortable after taxes, insurance, and maintenance.',
      },
      {
        title: 'Rate-shopping comparison',
        values: '$450,000 loan · compare 6.9% vs 6.2% · 30 years',
        takeaway:
          'A modest rate drop can save tens of thousands over the life of the loan.',
      },
    ],
    faqs: [
      {
        question: 'Does this include property taxes and insurance?',
        answer:
          'The current calculator focuses on core principal and interest. Use it as your payment baseline, then layer in taxes, insurance, HOA fees, and maintenance for a realistic housing budget.',
      },
      {
        question: 'What is the difference between APR and interest rate?',
        answer:
          'Interest rate measures the cost of borrowing. APR is broader and can include fees, making it more useful for lender-to-lender comparisons.',
      },
      {
        question: 'Should I choose a shorter mortgage term?',
        answer:
          'If the higher monthly payment still leaves enough room for savings and emergencies, a shorter term usually cuts total interest sharply.',
      },
    ],
    related: [
      { href: '/finance/amortization-calculator', label: 'Amortization Calculator' },
      { href: '/finance/refinance-calculator', label: 'Refinance Calculator' },
      { href: '/salary/gross-to-net-calculator', label: 'Gross to Net Salary Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  amortization: {
    path: '/finance/amortization-calculator',
    categoryPath: '/finance',
    customCalculator: 'amortization',
    eyebrow: 'Finance Calculator',
    title: 'Amortization Calculator',
    description:
      'Generate a full amortization schedule so you can see how every payment splits between principal and interest over the life of a loan.',
    summary: [
      'Full payment-by-payment amortization schedule',
      'Shows principal, interest, and remaining balance',
      'Useful for mortgages, auto loans, and refinancing decisions',
    ],
    formula: {
      title: 'Amortization formula',
      expression: 'Payment = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]',
      notes: [
        'The formula gives the fixed recurring payment for an amortizing loan.',
        'Early payments are interest-heavy, while later payments pay down more principal.',
        'The schedule helps you see when equity starts building faster.',
      ],
    },
    interpretation: [
      'Amortization tables turn an abstract payment into a real payoff path.',
      'This is the best page to use when you want to understand timing, not just totals.',
      'It is especially helpful before refinancing, making extra payments, or choosing a shorter term.',
    ],
    scenarios: [
      {
        title: 'Mortgage payoff visibility',
        values: '$420,000 loan · 6.2% · 30 years',
        takeaway: 'Shows exactly how slowly principal moves in the early years and why rate changes matter so much.',
      },
      {
        title: 'Extra payment planning',
        values: 'Compare original payment with an accelerated payoff strategy',
        takeaway: 'A schedule makes it easier to see where extra payments create the biggest interest savings.',
      },
    ],
    faqs: [
      {
        question: 'What is an amortization schedule?',
        answer: 'It is a payment table showing how each installment is divided between interest, principal, and remaining balance over time.',
      },
      {
        question: 'Why does so much of the early payment go to interest?',
        answer: 'Because interest is charged on the largest outstanding balance at the beginning of the loan.',
      },
      {
        question: 'Can I use this for more than mortgages?',
        answer: 'Yes. It works for any fixed-payment amortizing loan such as auto loans, personal loans, and many refinance scenarios.',
      },
    ],
    related: [
      { href: '/finance/mortgage-calculator', label: 'Mortgage Calculator' },
      { href: '/finance/refinance-calculator', label: 'Refinance Calculator' },
      { href: '/finance/loan-repayment-calculator', label: 'Loan Repayment Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  refinance: {
    path: '/finance/refinance-calculator',
    categoryPath: '/finance',
    customCalculator: 'refinance',
    eyebrow: 'Finance Calculator',
    title: 'Refinance Calculator',
    description:
      'Compare your current loan against a refinance offer to estimate monthly savings, lifetime cost, and break-even timing.',
    summary: [
      'Compare current and refinanced monthly payments',
      'Estimate lifetime savings after closing costs',
      'Shows approximate refinance break-even point',
    ],
    formula: {
      title: 'Refinance comparison logic',
      expression: 'Break-even Months = Closing Costs ÷ Monthly Savings',
      notes: [
        'Monthly savings compares your old required payment with the refinanced payment.',
        'Closing costs matter because they delay the point where savings turn positive.',
        'A lower rate is valuable only if you stay in the home long enough to recover those costs.',
      ],
    },
    interpretation: [
      'Refinance decisions are not just about rate; they are about time horizon, cost recovery, and payment flexibility.',
      'Break-even math is the quickest way to filter out bad refinance offers.',
      'If you may move soon, a lower rate can still be a poor decision if closing costs are too high.',
    ],
    scenarios: [
      {
        title: 'Classic rate-drop refinance',
        values: '$320,000 balance · 6.8% current · 5.9% new rate',
        takeaway: 'Useful for spotting whether the payment drop is large enough to justify the fees.',
      },
      {
        title: 'Shorter-term refinance',
        values: 'Refinance to a shorter term with a lower rate',
        takeaway: 'Monthly payment may stay high, but lifetime interest can shrink dramatically.',
      },
    ],
    faqs: [
      {
        question: 'What is a good refinance break-even point?',
        answer: 'There is no universal rule, but shorter break-even periods are generally safer if your housing plans are uncertain.',
      },
      {
        question: 'Should I refinance just for a lower monthly payment?',
        answer: 'Not always. A longer term can lower the payment while increasing the total cost you pay over time.',
      },
      {
        question: 'Do closing costs always make refinancing worse?',
        answer: 'No. They simply need to be compared against the monthly and lifetime savings to see whether the refinance still pays off.',
      },
    ],
    related: [
      { href: '/finance/mortgage-calculator', label: 'Mortgage Calculator' },
      { href: '/finance/amortization-calculator', label: 'Amortization Calculator' },
      { href: '/finance/loan-repayment-calculator', label: 'Loan Repayment Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  loanRepayment: {
    path: '/finance/loan-repayment-calculator',
    categoryPath: '/finance',
    calculatorType: 'loan',
    eyebrow: 'Finance Calculator',
    title: 'Loan Repayment Calculator',
    description:
      'Calculate monthly loan repayments, total interest, and total repayment cost for personal loans, auto loans, and other fixed-term borrowing.',
    summary: [
      'Monthly repayment estimate',
      'Total interest and total repayment cost',
      'Useful for comparing lenders and loan terms',
    ],
    formula: {
      title: 'Loan repayment formula',
      expression: 'Payment = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]',
      notes: [
        'P is the loan principal.',
        'r is the periodic interest rate.',
        'n is the number of repayment periods.',
        'The result shows the fixed periodic payment needed to amortize the loan.',
      ],
    },
    interpretation: [
      'A lower monthly payment can look attractive, but longer terms often increase total interest materially.',
      'Use this page to compare “cheaper now” versus “cheaper overall” when evaluating lenders.',
      'It is especially useful before taking on a car loan, personal loan, or refinance offer.',
    ],
    scenarios: [
      {
        title: 'Car loan comparison',
        values: '$28,000 loan · 6.8% APR · 5 years',
        takeaway:
          'A slightly shorter term can often save more than negotiating a small monthly payment difference.',
      },
      {
        title: 'Personal loan trade-off',
        values: '$12,000 loan · compare 3 years vs. 5 years',
        takeaway:
          'This shows the real price of stretching payments for near-term cash-flow relief.',
      },
    ],
    faqs: [
      {
        question: 'Is this only for personal loans?',
        answer:
          'No. It works for many fixed-payment loans including car loans, installment loans, and other amortizing debt.',
      },
      {
        question: 'Why does total repayment rise so much with longer terms?',
        answer:
          'Because interest has more time to accumulate. Lower monthly payments usually mean higher lifetime borrowing cost.',
      },
      {
        question: 'Should I compare APR or monthly payment first?',
        answer:
          'Start with monthly affordability, then compare APR and total repayment to understand the full borrowing cost.',
      },
    ],
    related: [
      { href: '/finance/mortgage-calculator', label: 'Mortgage Calculator' },
      { href: '/finance/amortization-calculator', label: 'Amortization Calculator' },
      { href: '/finance/roi-calculator', label: 'ROI Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  roi: {
    path: '/finance/roi-calculator',
    categoryPath: '/finance',
    calculatorType: 'investment',
    eyebrow: 'Investment Calculator',
    title: 'ROI Calculator',
    description:
      'Estimate investment growth, total contributions, and return on investment so you can compare savings and investing scenarios with clearer expectations.',
    summary: [
      'Shows final value and total contributions',
      'Calculates return on investment percentage',
      'Useful for savings plans and long-term investing',
    ],
    formula: {
      title: 'ROI formula',
      expression: 'ROI = (Net Gain ÷ Total Contributions) × 100%',
      notes: [
        'Net gain is the final amount minus total contributions and applicable tax drag.',
        'This page combines compound growth with recurring monthly contributions.',
        'The embedded tool is ideal for personal investing and savings-growth scenarios.',
      ],
    },
    interpretation: [
      'ROI is most useful when you compare multiple scenarios side by side rather than looking at one projected outcome alone.',
      'Contribution rate often matters more than chasing small changes in expected return.',
      'Use this page to stress-test expectations before making long-term savings commitments.',
    ],
    scenarios: [
      {
        title: 'Long-term index investing',
        values: '$10,000 initial · $500 monthly · 7% return · 10 years',
        takeaway:
          'Useful for seeing how disciplined contributions can do most of the heavy lifting over time.',
      },
      {
        title: 'Compare two return assumptions',
        values: '6% vs. 8% annual return with the same contribution plan',
        takeaway:
          'A reasonable range helps you avoid overcommitting to best-case projections.',
      },
    ],
    faqs: [
      {
        question: 'Is ROI enough to compare two investments?',
        answer:
          'ROI is a strong starting point, but risk, time horizon, taxes, and liquidity also matter when comparing alternatives.',
      },
      {
        question: 'Why include monthly contributions?',
        answer:
          'Because most real-world investing happens gradually, not as a one-time lump sum. This gives a more realistic planning view.',
      },
      {
        question: 'Does this account for taxes?',
        answer:
          'Yes, the underlying calculator includes simplified country-specific tax treatment for investment gains in several regions.',
      },
    ],
    related: [
      { href: '/finance/loan-repayment-calculator', label: 'Loan Repayment Calculator' },
      { href: '/tax/vat-calculator', label: 'VAT Calculator' },
      { href: '/salary/hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  incomeTax: {
    path: '/tax/income-tax-calculator',
    categoryPath: '/finance',
    calculatorType: 'income-tax',
    eyebrow: 'Tax Calculator',
    title: 'Income Tax Calculator',
    description:
      'Estimate income tax across supported countries and see how deductions, filing choices, and income levels affect take-home pay.',
    summary: [
      'Region-aware tax estimate',
      'Supports multiple countries and tax systems',
      'Useful for salary planning and offer comparisons',
    ],
    formula: {
      title: 'Progressive tax logic',
      expression: 'Tax = Σ (income in each bracket × that bracket rate)',
      notes: [
        'Progressive tax systems apply different rates to different portions of income.',
        'Deductions and allowances reduce taxable income before bracket calculations.',
        'Some regions also add local taxes or social contributions.',
      ],
    },
    interpretation: [
      'This page is best for rough planning, comparing offers, and understanding bracket effects before you file.',
      'A pay rise does not mean all of your income gets taxed at the top rate; only the portion inside that bracket does.',
      'If you work across countries or states, treat this as a decision aid and verify final filing details with official guidance.',
    ],
    scenarios: [
      {
        title: 'Comparing two job offers',
        values: '$85,000 in one region vs. $92,000 in another',
        takeaway:
          'A higher gross salary does not always win once taxes and contributions are included.',
      },
      {
        title: 'Year-end planning',
        values: 'Bonus income + filing status + deduction strategy',
        takeaway:
          'Helpful for checking whether a bonus or side income changes your effective tax burden.',
      },
    ],
    faqs: [
      {
        question: 'Is this calculator enough for filing taxes?',
        answer:
          'No. Use it for planning and estimation. Official filing can depend on credits, deductions, residency rules, and local requirements not fully modeled in a simplified calculator.',
      },
      {
        question: 'Why does my marginal tax rate look high?',
        answer:
          'Marginal rate applies only to your next portion of income. Your effective tax rate is usually much lower.',
      },
      {
        question: 'Can I use this for salary negotiations?',
        answer:
          'Yes. It is especially useful when comparing two offers or deciding whether a gross raise is meaningful after tax.',
      },
    ],
    related: [
      { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
      { href: '/salary/gross-to-net-calculator', label: 'Gross to Net Salary Calculator' },
      { href: '/tax/vat-calculator', label: 'VAT Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  vat: {
    path: '/tax/vat-calculator',
    categoryPath: '/finance',
    calculatorType: 'sales-tax',
    eyebrow: 'Tax Calculator',
    title: 'VAT Calculator',
    description:
      'Add or reverse-calculate VAT, sales tax, and tax-inclusive prices so you can quote cleaner totals and verify invoices faster.',
    summary: [
      'Add tax to a net amount',
      'Reverse-calculate tax from a tax-inclusive total',
      'Useful for invoices, pricing, and checkout validation',
    ],
    formula: {
      title: 'VAT formula',
      expression: 'VAT Amount = Net Price × VAT Rate',
      notes: [
        'Gross Price = Net Price × (1 + VAT Rate).',
        'Reverse calculation finds the net amount embedded inside a tax-inclusive price.',
        'The same logic is also useful for GST and sales-tax style calculations.',
      ],
    },
    interpretation: [
      'This page is especially useful for freelancers, small businesses, and finance teams checking pricing accuracy.',
      'Reverse VAT calculation is often the fastest way to validate whether a quoted total already includes tax.',
      'Treat the calculator as an operational shortcut for invoices, e-commerce pricing, and bookkeeping checks.',
    ],
    scenarios: [
      {
        title: 'Invoice preparation',
        values: 'Net price £1,250 · VAT 20%',
        takeaway:
          'Quickly generate the tax amount and gross total before sending a quote or invoice.',
      },
      {
        title: 'Tax-inclusive checkout review',
        values: 'Total €119 · reverse VAT at 19%',
        takeaway:
          'Useful for backing out the pre-tax amount when reviewing marketplace or supplier pricing.',
      },
    ],
    faqs: [
      {
        question: 'Can I use this for sales tax or GST too?',
        answer:
          'Yes. The tax math is very similar, so the page is useful for VAT, GST, and sales-tax style scenarios.',
      },
      {
        question: 'What does reverse VAT mean?',
        answer:
          'It means starting from a tax-inclusive total and calculating the net amount plus the tax portion inside that total.',
      },
      {
        question: 'Why is this useful for businesses?',
        answer:
          'Because it reduces pricing mistakes, speeds up invoice work, and makes tax-inclusive versus tax-exclusive quotes easier to verify.',
      },
    ],
    related: [
      { href: '/tax/income-tax-calculator', label: 'Income Tax Calculator' },
      { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
      { href: '/finance/roi-calculator', label: 'ROI Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  grossToNet: {
    path: '/salary/gross-to-net-calculator',
    categoryPath: '/finance',
    calculatorType: 'salary',
    eyebrow: 'Salary Calculator',
    title: 'Gross to Net Salary Calculator',
    description:
      'Turn gross salary into estimated take-home pay so you can compare offers, budgets, and relocation scenarios with confidence.',
    summary: [
      'Gross pay to take-home estimate',
      'Supports multiple regions and currencies',
      'Ideal for offer comparisons and budgeting',
    ],
    formula: {
      title: 'Take-home pay logic',
      expression: 'Net Pay = Gross Pay − Income Tax − Social Contributions − Other Deductions',
      notes: [
        'Gross pay is your pay before taxes and payroll deductions.',
        'Net pay is what actually lands in your bank account.',
        'The exact deduction stack depends on region, salary level, and filing setup.',
      ],
    },
    interpretation: [
      'Use gross-to-net estimates when comparing jobs across cities or countries, not just comparing gross headlines.',
      'The most expensive mistake is budgeting from gross income instead of take-home pay.',
      'This is the right calculator to pair with rent, mortgage, and emergency-fund planning.',
    ],
    scenarios: [
      {
        title: 'Offer comparison',
        values: '$78,000 remote role vs. $85,000 on-site role',
        takeaway:
          'Once taxes and commuting costs are considered, the better gross offer may not be the better life offer.',
      },
      {
        title: 'Relocation planning',
        values: 'Move from one country or tax region to another',
        takeaway:
          'Take-home pay is often the clearest way to compare real financial outcomes across borders.',
      },
    ],
    faqs: [
      {
        question: 'Is gross to net the same as income tax?',
        answer:
          'Not exactly. Gross-to-net includes income tax plus payroll deductions such as social insurance, national insurance, or pension-related items depending on the region.',
      },
      {
        question: 'Can I convert monthly salary as well?',
        answer:
          'Yes. You can use annual salary as the main planning number and convert it into monthly take-home for budgeting.',
      },
      {
        question: 'Why is net pay different between countries?',
        answer:
          'Because tax brackets, payroll systems, and mandatory contributions vary widely, even when gross salary looks similar.',
      },
    ],
    related: [
      { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
      { href: '/salary/hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
      { href: '/tax/income-tax-calculator', label: 'Income Tax Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  hourlyToSalary: {
    path: '/salary/hourly-to-salary-calculator',
    categoryPath: '/finance',
    customCalculator: 'hourly-to-salary',
    eyebrow: 'Salary Calculator',
    title: 'Hourly to Salary Calculator',
    description:
      'Convert hourly pay into weekly, bi-weekly, monthly, and annual salary estimates for cleaner offer comparison and budgeting.',
    summary: [
      'Converts hourly rate into major payroll views',
      'Supports paid weeks and overtime assumptions',
      'Useful for job offers, freelance planning, and staffing budgets',
    ],
    formula: {
      title: 'Hourly to salary formula',
      expression: 'Annual Pay = (Hourly Rate × Hours per Week + Overtime) × Paid Weeks per Year',
      notes: [
        'Paid weeks can differ from 52 when contracts include unpaid leave or seasonal downtime.',
        'Overtime is calculated separately to avoid hiding variable income inside the base rate.',
        'This page gives gross-pay planning numbers before tax.',
      ],
    },
    interpretation: [
      'Hourly pay can look strong until unpaid time and inconsistent hours are factored in.',
      'This page is especially helpful when comparing hourly and salaried roles side by side.',
      'Use paid weeks carefully if your job has unpaid holidays, contract gaps, or variable schedules.',
    ],
    scenarios: [
      {
        title: 'Offer normalization',
        values: '$35/hour · 40 hours/week · 50 paid weeks',
        takeaway: 'Makes hourly and salaried offers comparable using one annualized number.',
      },
      {
        title: 'Overtime-heavy role',
        values: '$28/hour with 8 overtime hours weekly',
        takeaway: 'Shows how much of annual pay depends on extra hours rather than the base wage.',
      },
    ],
    faqs: [
      {
        question: 'Does this calculator include taxes?',
        answer: 'No. It converts gross hourly pay into gross salary equivalents. Pair it with gross-to-net pages for take-home planning.',
      },
      {
        question: 'Why use paid weeks instead of just 52?',
        answer: 'Because many workers do not get paid every week of the year due to unpaid leave, contract breaks, or seasonal patterns.',
      },
      {
        question: 'Can I use this for freelance work?',
        answer: 'Yes, especially when you want to translate an hourly billable rate into an annual planning estimate.',
      },
    ],
    related: [
      { href: '/salary/gross-to-net-calculator', label: 'Gross to Net Salary Calculator' },
      { href: '/salary/net-to-gross-calculator', label: 'Net to Gross Salary Calculator' },
      { href: '/finance/roi-calculator', label: 'ROI Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
  netToGross: {
    path: '/salary/net-to-gross-calculator',
    categoryPath: '/finance',
    customCalculator: 'net-to-gross',
    eyebrow: 'Salary Calculator',
    title: 'Net to Gross Salary Calculator',
    description:
      'Work backward from target take-home pay to estimate the gross salary you need before tax and payroll deductions.',
    summary: [
      'Estimates required gross salary from net-pay targets',
      'Uses region-specific salary tax logic where available',
      'Useful for negotiation, relocation, and compensation planning',
    ],
    formula: {
      title: 'Net to gross logic',
      expression: 'Required Gross ≈ the gross pay where calculated net pay reaches your target',
      notes: [
        'Because payroll systems are progressive, this is solved through repeated estimation rather than one flat percentage formula.',
        'The calculator uses the existing salary tax model to search for the gross amount that reaches the desired net.',
        'This gives a more useful estimate than assuming one constant tax rate at every income level.',
      ],
    },
    interpretation: [
      'Net-to-gross planning is most useful when you know your target lifestyle cost but not the gross salary required to support it.',
      'It is particularly valuable in salary negotiation and cross-border relocation planning.',
      'Treat the result as a decision aid, then verify final payroll details with actual employer and regional rules.',
    ],
    scenarios: [
      {
        title: 'Negotiation target setting',
        values: 'Target net pay of $70,000 annually',
        takeaway: 'Lets you turn a lifestyle or savings goal into a gross compensation number for negotiation.',
      },
      {
        title: 'Cross-region comparison',
        values: 'Same net target across different tax regions',
        takeaway: 'Useful for seeing how gross salary expectations shift between countries or payroll systems.',
      },
    ],
    faqs: [
      {
        question: 'Why can’t I just divide by one minus the tax rate?',
        answer: 'Because real payroll systems are progressive and may include multiple deductions, allowances, and contribution rules.',
      },
      {
        question: 'Is this exact enough for a job offer?',
        answer: 'It is good for planning and negotiation. Final payroll can still vary because of benefits, credits, local rules, and employer-specific deductions.',
      },
      {
        question: 'Can I use this for non-US regions?',
        answer: 'Yes, the calculator uses the supported regional salary-tax model where available and falls back gracefully when it cannot compute a result.',
      },
    ],
    related: [
      { href: '/salary/gross-to-net-calculator', label: 'Gross to Net Salary Calculator' },
      { href: '/salary/hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
      { href: '/tax/income-tax-calculator', label: 'Income Tax Calculator' },
      { href: '/finance', label: 'Finance Calculator Hub' },
    ],
  },
};

export const financeHub = {
  title: 'Finance Calculator Hub',
  description:
    'A focused home for the highest-intent calculators on FullCal: mortgage, amortization, refinancing, loans, salary, tax, and investing.',
  featured: [
    {
      href: calculatorPages.mortgage.path,
      title: 'Mortgage Calculator',
      description: 'Estimate monthly payments and total interest before you commit to a home budget.',
    },
    {
      href: calculatorPages.amortization.path,
      title: 'Amortization Calculator',
      description: 'See exactly how principal and interest move through the life of a loan.',
    },
    {
      href: calculatorPages.refinance.path,
      title: 'Refinance Calculator',
      description: 'Compare rate, term, closing costs, and break-even timing before refinancing.',
    },
    {
      href: calculatorPages.loanRepayment.path,
      title: 'Loan Repayment Calculator',
      description: 'Compare monthly payments, APR impact, and full repayment cost for non-mortgage loans.',
    },
    {
      href: calculatorPages.grossToNet.path,
      title: 'Gross to Net Salary Calculator',
      description: 'Translate headline salary into usable take-home pay for budgeting and offer comparison.',
    },
    {
      href: calculatorPages.hourlyToSalary.path,
      title: 'Hourly to Salary Calculator',
      description: 'Convert hourly compensation into annualized pay for cleaner comparisons.',
    },
    {
      href: calculatorPages.netToGross.path,
      title: 'Net to Gross Salary Calculator',
      description: 'Work backward from take-home targets to the gross salary you need.',
    },
    {
      href: calculatorPages.incomeTax.path,
      title: 'Income Tax Calculator',
      description: 'Check tax impact across supported countries and understand bracket-driven changes.',
    },
    {
      href: calculatorPages.vat.path,
      title: 'VAT Calculator',
      description: 'Add or reverse tax for invoices, product pricing, and tax-inclusive totals.',
    },
    {
      href: calculatorPages.roi.path,
      title: 'ROI Calculator',
      description: 'Model investment growth, contribution impact, and return on investment over time.',
    },
  ],
  clusters: [
    {
      title: 'Loan & Mortgage',
      items: ['Mortgage calculator', 'Amortization calculator', 'Refinance calculator', 'Loan repayment calculator'],
    },
    {
      title: 'Interest & Investing',
      items: ['Compound interest calculator', 'Savings calculator', 'Investment return calculator', 'ROI calculator'],
    },
    {
      title: 'Tax & Salary',
      items: ['Gross to net calculator', 'Net to gross calculator', 'Hourly to salary calculator', 'Income tax calculator'],
    },
    {
      title: 'Business & Cash Flow',
      items: ['VAT calculator', 'Margin calculator', 'Markup calculator', 'Break-even calculator'],
    },
  ],
};
