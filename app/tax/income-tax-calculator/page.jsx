import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Income Tax Calculator | FullCal',
  description:
    'Estimate income tax across supported countries and understand bracket-based tax outcomes with FullCal.',
  alternates: {
    canonical: '/tax/income-tax-calculator',
  },
};

export default function IncomeTaxCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.incomeTax} />;
}
