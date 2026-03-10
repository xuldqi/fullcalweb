import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Amortization Calculator | FullCal',
  description: 'Generate a full amortization schedule and track principal, interest, and remaining balance with FullCal.',
  alternates: {
    canonical: '/finance/amortization-calculator',
  },
};

export default function AmortizationCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.amortization} />;
}
