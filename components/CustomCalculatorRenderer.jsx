'use client';

import { useEffect, useMemo, useState } from 'react';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  CAD: 'C$',
  AUD: 'A$',
};

function formatCurrency(value, currency = 'USD') {
  const symbol = currencySymbols[currency] || '$';
  return `${symbol}${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatWithSymbol(value, symbol = '$') {
  return `${symbol}${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function calculatePayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const periods = years * 12;

  if (!monthlyRate) {
    return principal / periods;
  }

  return principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / (Math.pow(1 + monthlyRate, periods) - 1);
}

function AmortizationCalculator() {
  const [inputs, setInputs] = useState({ principal: 350000, rate: 6.25, years: 30, currency: 'USD' });
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const principal = Number(inputs.principal);
    const annualRate = Number(inputs.rate);
    const years = Number(inputs.years);
    const monthlyPayment = calculatePayment(principal, annualRate, years);
    const monthlyRate = annualRate / 100 / 12;
    const periods = years * 12;

    let balance = principal;
    let totalInterest = 0;
    const schedule = [];

    for (let month = 1; month <= periods; month += 1) {
      const interest = monthlyRate ? balance * monthlyRate : 0;
      const principalPaid = Math.min(balance, monthlyPayment - interest);
      const payment = principalPaid + interest;
      balance = Math.max(0, balance - principalPaid);
      totalInterest += interest;

      schedule.push({ month, payment, principalPaid, interest, balance });
    }

    setResult({
      monthlyPayment,
      totalInterest,
      totalPaid: principal + totalInterest,
      schedule,
    });
  };

  return (
    <div className="custom-calculator-grid">
      <form className="calc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amortization-principal">Loan Amount</label>
          <input id="amortization-principal" type="number" value={inputs.principal} onChange={(e) => setInputs({ ...inputs, principal: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="amortization-rate">Interest Rate (%)</label>
          <input id="amortization-rate" type="number" step="0.01" value={inputs.rate} onChange={(e) => setInputs({ ...inputs, rate: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="amortization-years">Loan Term (years)</label>
          <input id="amortization-years" type="number" value={inputs.years} onChange={(e) => setInputs({ ...inputs, years: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="amortization-currency">Currency</label>
          <select id="amortization-currency" value={inputs.currency} onChange={(e) => setInputs({ ...inputs, currency: e.target.value })}>
            {Object.keys(currencySymbols).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="calc-button">Generate Amortization Schedule</button>
      </form>

      {result ? (
        <div className="custom-results-stack">
          <div className="result-grid">
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.monthlyPayment, inputs.currency)}</div>
              <div className="result-label">Monthly Payment</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.totalInterest, inputs.currency)}</div>
              <div className="result-label">Total Interest</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.totalPaid, inputs.currency)}</div>
              <div className="result-label">Total Paid</div>
            </div>
          </div>
          <div className="table-shell">
            <div className="mini-note">Full amortization schedule</div>
            <div className="table-scroll">
              <table className="calc-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.month}>
                      <td>{row.month}</td>
                      <td>{formatCurrency(row.payment, inputs.currency)}</td>
                      <td>{formatCurrency(row.principalPaid, inputs.currency)}</td>
                      <td>{formatCurrency(row.interest, inputs.currency)}</td>
                      <td>{formatCurrency(row.balance, inputs.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RefinanceCalculator() {
  const [inputs, setInputs] = useState({
    balance: 320000,
    currentRate: 6.8,
    remainingYears: 26,
    newRate: 5.9,
    newYears: 25,
    closingCosts: 4500,
    currency: 'USD',
  });
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentPayment = calculatePayment(Number(inputs.balance), Number(inputs.currentRate), Number(inputs.remainingYears));
    const newPayment = calculatePayment(Number(inputs.balance), Number(inputs.newRate), Number(inputs.newYears));
    const currentTotal = currentPayment * Number(inputs.remainingYears) * 12;
    const newTotal = newPayment * Number(inputs.newYears) * 12 + Number(inputs.closingCosts);
    const monthlySavings = currentPayment - newPayment;
    const totalSavings = currentTotal - newTotal;
    const breakEvenMonths = monthlySavings > 0 ? Number(inputs.closingCosts) / monthlySavings : null;

    setResult({ currentPayment, newPayment, monthlySavings, totalSavings, breakEvenMonths, currentTotal, newTotal });
  };

  return (
    <div className="custom-calculator-grid">
      <form className="calc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="refi-balance">Current Loan Balance</label>
          <input id="refi-balance" type="number" value={inputs.balance} onChange={(e) => setInputs({ ...inputs, balance: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="refi-current-rate">Current Interest Rate (%)</label>
          <input id="refi-current-rate" type="number" step="0.01" value={inputs.currentRate} onChange={(e) => setInputs({ ...inputs, currentRate: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="refi-remaining-years">Remaining Term (years)</label>
          <input id="refi-remaining-years" type="number" value={inputs.remainingYears} onChange={(e) => setInputs({ ...inputs, remainingYears: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="refi-new-rate">New Interest Rate (%)</label>
          <input id="refi-new-rate" type="number" step="0.01" value={inputs.newRate} onChange={(e) => setInputs({ ...inputs, newRate: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="refi-new-years">New Loan Term (years)</label>
          <input id="refi-new-years" type="number" value={inputs.newYears} onChange={(e) => setInputs({ ...inputs, newYears: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="refi-closing-costs">Closing Costs</label>
          <input id="refi-closing-costs" type="number" value={inputs.closingCosts} onChange={(e) => setInputs({ ...inputs, closingCosts: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="refi-currency">Currency</label>
          <select id="refi-currency" value={inputs.currency} onChange={(e) => setInputs({ ...inputs, currency: e.target.value })}>
            {Object.keys(currencySymbols).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="calc-button">Compare Refinance Scenario</button>
      </form>

      {result ? (
        <div className="custom-results-stack">
          <div className="result-grid">
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.currentPayment, inputs.currency)}</div>
              <div className="result-label">Current Monthly Payment</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.newPayment, inputs.currency)}</div>
              <div className="result-label">Refinanced Monthly Payment</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.monthlySavings, inputs.currency)}</div>
              <div className="result-label">Monthly Savings</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.totalSavings, inputs.currency)}</div>
              <div className="result-label">Estimated Lifetime Savings</div>
            </div>
          </div>
          <div className="table-shell insight-panel">
            <div className="mini-note">Refinance readout</div>
            <p>Current remaining cost: <strong>{formatCurrency(result.currentTotal, inputs.currency)}</strong></p>
            <p>New remaining cost incl. closing costs: <strong>{formatCurrency(result.newTotal, inputs.currency)}</strong></p>
            <p>Break-even point: <strong>{result.breakEvenMonths ? `${result.breakEvenMonths.toFixed(1)} months` : 'No break-even with current inputs'}</strong></p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HourlyToSalaryCalculator() {
  const [inputs, setInputs] = useState({ hourlyRate: 35, hoursPerWeek: 40, weeksPerYear: 52, overtimeHours: 0, overtimeMultiplier: 1.5, currency: 'USD' });
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const regularWeekly = Number(inputs.hourlyRate) * Number(inputs.hoursPerWeek);
    const overtimeWeekly = Number(inputs.hourlyRate) * Number(inputs.overtimeMultiplier) * Number(inputs.overtimeHours || 0);
    const weeklyPay = regularWeekly + overtimeWeekly;
    const annualPay = weeklyPay * Number(inputs.weeksPerYear);

    setResult({
      weeklyPay,
      annualPay,
      monthlyPay: annualPay / 12,
      biweeklyPay: annualPay / 26,
      overtimeWeekly,
    });
  };

  return (
    <div className="custom-calculator-grid">
      <form className="calc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hourly-rate">Hourly Rate</label>
          <input id="hourly-rate" type="number" step="0.01" value={inputs.hourlyRate} onChange={(e) => setInputs({ ...inputs, hourlyRate: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="hours-per-week">Hours per Week</label>
          <input id="hours-per-week" type="number" step="0.1" value={inputs.hoursPerWeek} onChange={(e) => setInputs({ ...inputs, hoursPerWeek: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="weeks-per-year">Paid Weeks per Year</label>
          <input id="weeks-per-year" type="number" value={inputs.weeksPerYear} onChange={(e) => setInputs({ ...inputs, weeksPerYear: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="overtime-hours">Overtime Hours per Week</label>
          <input id="overtime-hours" type="number" step="0.1" value={inputs.overtimeHours} onChange={(e) => setInputs({ ...inputs, overtimeHours: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="overtime-multiplier">Overtime Multiplier</label>
          <input id="overtime-multiplier" type="number" step="0.1" value={inputs.overtimeMultiplier} onChange={(e) => setInputs({ ...inputs, overtimeMultiplier: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="hourly-currency">Currency</label>
          <select id="hourly-currency" value={inputs.currency} onChange={(e) => setInputs({ ...inputs, currency: e.target.value })}>
            {Object.keys(currencySymbols).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="calc-button">Convert to Salary</button>
      </form>

      {result ? (
        <div className="custom-results-stack">
          <div className="result-grid">
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.annualPay, inputs.currency)}</div>
              <div className="result-label">Annual Gross Pay</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.monthlyPay, inputs.currency)}</div>
              <div className="result-label">Monthly Gross Pay</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.biweeklyPay, inputs.currency)}</div>
              <div className="result-label">Bi-weekly Gross Pay</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.weeklyPay, inputs.currency)}</div>
              <div className="result-label">Weekly Gross Pay</div>
            </div>
          </div>
          <div className="table-shell insight-panel">
            <div className="mini-note">Payroll interpretation</div>
            <p>Regular weekly pay: <strong>{formatCurrency(result.weeklyPay - result.overtimeWeekly, inputs.currency)}</strong></p>
            <p>Overtime contribution: <strong>{formatCurrency(result.overtimeWeekly, inputs.currency)}</strong></p>
            <p>Use paid weeks to account for unpaid leave, contract gaps, or seasonal work.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NetToGrossCalculator() {
  const [regions, setRegions] = useState([{ code: 'US', name: 'United States', currency: '$' }]);
  const [ready, setReady] = useState(false);
  const [inputs, setInputs] = useState({ netTarget: 70000, region: 'US', filingStatus: 'single' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const loadConfig = () => {
      if (cancelled) return;

      if (window.taxConfig?.getAvailableRegions) {
        const availableRegions = window.taxConfig.getAvailableRegions();
        setRegions(availableRegions);
        setInputs((current) => ({ ...current, region: availableRegions[0]?.code || current.region }));
        setReady(true);
        return;
      }

      attempts += 1;
      if (attempts < 80) {
        window.setTimeout(loadConfig, 100);
      } else {
        setError('Tax configuration failed to load. Please refresh the page.');
      }
    };

    loadConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  const regionCurrency = useMemo(() => regions.find((item) => item.code === inputs.region)?.currency || '$', [regions, inputs.region]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!window.taxConfig?.calculateSalaryTax) {
      setError('Tax configuration failed to load. Please refresh the page.');
      return;
    }

    const targetNet = Number(inputs.netTarget);
    const compute = (gross) => window.taxConfig.calculateSalaryTax(gross, inputs.region, inputs.filingStatus);

    let low = targetNet;
    let high = Math.max(targetNet * 1.3, 10000);
    let highResult = compute(high);
    let guard = 0;

    while (highResult && highResult.netSalary < targetNet && guard < 40) {
      high *= 1.4;
      highResult = compute(high);
      guard += 1;
    }

    if (!highResult) {
      setError('Unable to calculate the requested region with current inputs.');
      return;
    }

    for (let iteration = 0; iteration < 48; iteration += 1) {
      const mid = (low + high) / 2;
      const midResult = compute(mid);
      if (!midResult) {
        setError('Unable to calculate the requested region with current inputs.');
        return;
      }
      if (midResult.netSalary < targetNet) {
        low = mid;
      } else {
        high = mid;
      }
    }

    const finalResult = compute(high);
    setResult({ grossSalary: high, ...finalResult });
  };

  return (
    <div className="custom-calculator-grid">
      <form className="calc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="net-target">Desired Net Annual Pay</label>
          <input id="net-target" type="number" value={inputs.netTarget} onChange={(e) => setInputs({ ...inputs, netTarget: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="net-region">Tax Region</label>
          <select id="net-region" value={inputs.region} onChange={(e) => setInputs({ ...inputs, region: e.target.value })} disabled={!ready}>
            {regions.map((region) => (
              <option key={region.code} value={region.code}>{region.name} ({region.currency})</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="net-filing-status">Filing Status (US only)</label>
          <select id="net-filing-status" value={inputs.filingStatus} onChange={(e) => setInputs({ ...inputs, filingStatus: e.target.value })}>
            <option value="single">Single</option>
            <option value="marriedJoint">Married Filing Jointly</option>
            <option value="marriedSeparate">Married Filing Separately</option>
            <option value="headOfHousehold">Head of Household</option>
          </select>
        </div>
        <button type="submit" className="calc-button" disabled={!ready}>Estimate Required Gross Pay</button>
        {error ? <div className="custom-inline-error">{error}</div> : null}
      </form>

      {result ? (
        <div className="custom-results-stack">
          <div className="result-grid">
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatWithSymbol(result.grossSalary, result.currency || regionCurrency)}</div>
              <div className="result-label">Estimated Gross Salary</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatWithSymbol(result.netSalary, result.currency || regionCurrency)}</div>
              <div className="result-label">Estimated Net Salary</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatWithSymbol(result.totalTax, result.currency || regionCurrency)}</div>
              <div className="result-label">Estimated Total Tax</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{result.effectiveRate.toFixed(2)}%</div>
              <div className="result-label">Effective Tax Rate</div>
            </div>
          </div>
          <div className="table-shell insight-panel">
            <div className="mini-note">Salary planning view</div>
            <p>Monthly gross pay: <strong>{formatWithSymbol(result.grossSalary / 12, result.currency || regionCurrency)}</strong></p>
            <p>Monthly net pay: <strong>{formatWithSymbol(result.netSalary / 12, result.currency || regionCurrency)}</strong></p>
            <p>Use this as a negotiation and budgeting aid, then verify exact payroll rules with local requirements.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CustomCalculatorRenderer({ type }) {
  switch (type) {
    case 'amortization':
      return <AmortizationCalculator />;
    case 'refinance':
      return <RefinanceCalculator />;
    case 'hourly-to-salary':
      return <HourlyToSalaryCalculator />;
    case 'net-to-gross':
      return <NetToGrossCalculator />;
    default:
      return <div className="inline-calculator-error">Calculator type not supported.</div>;
  }
}
