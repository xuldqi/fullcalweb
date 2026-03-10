import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Mortgage Calculator | FullCal',
  description:
    'Estimate monthly mortgage payments, total interest, and home-buying scenarios with FullCal\'s mortgage calculator.',
  alternates: {
    canonical: '/finance/mortgage-calculator',
  },
};

export default function MortgageCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.mortgage} />;
}
