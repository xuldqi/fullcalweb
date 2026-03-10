import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Refinance Calculator | FullCal',
  description: 'Compare refinance scenarios, monthly savings, and break-even timing with FullCal.',
  alternates: {
    canonical: '/finance/refinance-calculator',
  },
};

export default function RefinanceCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.refinance} />;
}
