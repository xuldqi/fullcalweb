'use client';

import { useMemo, useState } from 'react';

const federalStandardDeductions2025 = {
  single: 15750,
  marriedJoint: 31500,
  headOfHousehold: 23625,
};

const federalBrackets2025 = {
  single: [
    { min: 0, max: 11925, rate: 0.1 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  marriedJoint: [
    { min: 0, max: 23850, rate: 0.1 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  headOfHousehold: [
    { min: 0, max: 17000, rate: 0.1 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
};

const californiaStandardDeductions2025 = {
  single: 5706,
  marriedJoint: 11412,
  headOfHousehold: 11412,
};

const californiaBrackets2025 = {
  single: [
    { min: 0, max: 11079, rate: 0.01 },
    { min: 11079, max: 26264, rate: 0.02 },
    { min: 26264, max: 41452, rate: 0.04 },
    { min: 41452, max: 57542, rate: 0.06 },
    { min: 57542, max: 72724, rate: 0.08 },
    { min: 72724, max: 371479, rate: 0.093 },
    { min: 371479, max: 445771, rate: 0.103 },
    { min: 445771, max: 742953, rate: 0.113 },
    { min: 742953, max: Infinity, rate: 0.123 },
  ],
  marriedJoint: [
    { min: 0, max: 22158, rate: 0.01 },
    { min: 22158, max: 52528, rate: 0.02 },
    { min: 52528, max: 82904, rate: 0.04 },
    { min: 82904, max: 115084, rate: 0.06 },
    { min: 115084, max: 145448, rate: 0.08 },
    { min: 145448, max: 742958, rate: 0.093 },
    { min: 742958, max: 891542, rate: 0.103 },
    { min: 891542, max: 1485906, rate: 0.113 },
    { min: 1485906, max: Infinity, rate: 0.123 },
  ],
  headOfHousehold: [
    { min: 0, max: 22173, rate: 0.01 },
    { min: 22173, max: 52528, rate: 0.02 },
    { min: 52528, max: 82898, rate: 0.04 },
    { min: 82898, max: 115078, rate: 0.06 },
    { min: 115078, max: 145451, rate: 0.08 },
    { min: 145451, max: 742959, rate: 0.093 },
    { min: 742959, max: 891544, rate: 0.103 },
    { min: 891544, max: 1485908, rate: 0.113 },
    { min: 1485908, max: Infinity, rate: 0.123 },
  ],
};

function formatCurrency(value, currency = '$') {
  return `${currency}${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function calculateBracketTax(taxableIncome, brackets) {
  if (taxableIncome <= 0) {
    return 0;
  }

  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }
  return tax;
}

function calculateFederalTax(grossIncome, filingStatus) {
  const deduction = federalStandardDeductions2025[filingStatus] || federalStandardDeductions2025.single;
  const taxableIncome = Math.max(0, grossIncome - deduction);
  const brackets = federalBrackets2025[filingStatus] || federalBrackets2025.single;
  return calculateBracketTax(taxableIncome, brackets);
}

function calculateFica(grossIncome) {
  const socialSecurity = Math.min(grossIncome, 176100) * 0.062;
  const medicare = grossIncome * 0.0145;
  const additionalMedicare = Math.max(0, grossIncome - 200000) * 0.009;
  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    total: socialSecurity + medicare + additionalMedicare,
  };
}

function calculateCaliforniaStateTax(grossIncome, filingStatus) {
  const deduction = californiaStandardDeductions2025[filingStatus] || californiaStandardDeductions2025.single;
  const taxableIncome = Math.max(0, grossIncome - deduction);
  const brackets = californiaBrackets2025[filingStatus] || californiaBrackets2025.single;
  const incomeTax = calculateBracketTax(taxableIncome, brackets);
  const sdi = grossIncome * 0.012;

  return {
    incomeTax,
    sdi,
    total: incomeTax + sdi,
  };
}

function calculateStatePaycheck(stateCode, grossIncome, filingStatus) {
  const federalTax = calculateFederalTax(grossIncome, filingStatus);
  const fica = calculateFica(grossIncome);

  if (stateCode === 'CA') {
    const california = calculateCaliforniaStateTax(grossIncome, filingStatus);
    const totalTax = federalTax + fica.total + california.total;
    return {
      grossIncome,
      netIncome: grossIncome - totalTax,
      totalTax,
      effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
      breakdown: {
        federalIncomeTax: federalTax,
        socialSecurity: fica.socialSecurity,
        medicare: fica.medicare,
        additionalMedicare: fica.additionalMedicare,
        californiaIncomeTax: california.incomeTax,
        californiaSDI: california.sdi,
      },
      currency: '$',
    };
  }

  const totalTax = federalTax + fica.total;
  return {
    grossIncome,
    netIncome: grossIncome - totalTax,
    totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    breakdown: {
      federalIncomeTax: federalTax,
      socialSecurity: fica.socialSecurity,
      medicare: fica.medicare,
      additionalMedicare: fica.additionalMedicare,
      stateIncomeTax: 0,
    },
    currency: '$',
  };
}

export default function StatePaycheckCalculator({ config }) {
  const [inputs, setInputs] = useState({
    grossIncome: config?.defaultGrossIncome || 95000,
    filingStatus: config?.defaultFilingStatus || 'single',
  });
  const [result, setResult] = useState(null);

  const annualResult = useMemo(() => {
    if (!result) {
      return null;
    }

    return {
      monthlyNet: result.netIncome / 12,
      biweeklyNet: result.netIncome / 26,
      weeklyNet: result.netIncome / 52,
    };
  }, [result]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextResult = calculateStatePaycheck(config.stateCode, Number(inputs.grossIncome), inputs.filingStatus);
    setResult(nextResult);
  };

  return (
    <div className="custom-calculator-grid">
      <form className="calc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={`gross-income-${config.stateCode}`}>Gross Annual Pay</label>
          <input
            id={`gross-income-${config.stateCode}`}
            type="number"
            value={inputs.grossIncome}
            onChange={(e) => setInputs({ ...inputs, grossIncome: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={`filing-status-${config.stateCode}`}>Filing Status</label>
          <select
            id={`filing-status-${config.stateCode}`}
            value={inputs.filingStatus}
            onChange={(e) => setInputs({ ...inputs, filingStatus: e.target.value })}
          >
            <option value="single">Single</option>
            <option value="marriedJoint">Married Filing Jointly</option>
            <option value="headOfHousehold">Head of Household</option>
          </select>
        </div>
        <button type="submit" className="calc-button">Estimate {config.label} Take-Home Pay</button>
        <div className="mini-note">Built with 2025 federal assumptions and {config.assumptionLabel}</div>
      </form>

      {result ? (
        <div className="custom-results-stack">
          <div className="result-grid">
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.netIncome, result.currency)}</div>
              <div className="result-label">Estimated Annual Net Pay</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(result.totalTax, result.currency)}</div>
              <div className="result-label">Estimated Annual Taxes</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{result.effectiveRate.toFixed(2)}%</div>
              <div className="result-label">Effective Tax Rate</div>
            </div>
            <div className="calc-result custom-result-card">
              <div className="result-value">{formatCurrency(annualResult.monthlyNet, result.currency)}</div>
              <div className="result-label">Monthly Net Pay</div>
            </div>
          </div>

          <div className="table-shell insight-panel">
            <div className="mini-note">Paycheck breakdown</div>
            {Object.entries(result.breakdown).map(([key, value]) => (
              <p key={key}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())}: <strong>{formatCurrency(value, result.currency)}</strong>
              </p>
            ))}
            <p>Bi-weekly net pay: <strong>{formatCurrency(annualResult.biweeklyNet, result.currency)}</strong></p>
            <p>Weekly net pay: <strong>{formatCurrency(annualResult.weeklyNet, result.currency)}</strong></p>
            <p>{config.note}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
