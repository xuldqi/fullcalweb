import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Net to Gross Salary Calculator | FullCal',
  description: 'Estimate the gross salary needed to reach your target take-home pay with FullCal.',
  alternates: {
    canonical: '/salary/net-to-gross-calculator',
  },
};

export default function NetToGrossCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.netToGross} />;
}
