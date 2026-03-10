import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Gross to Net Salary Calculator | FullCal',
  description:
    'Convert gross salary into estimated take-home pay and compare compensation scenarios with FullCal.',
  alternates: {
    canonical: '/salary/gross-to-net-calculator',
  },
};

export default function GrossToNetCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.grossToNet} />;
}
