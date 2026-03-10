import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'ROI Calculator | FullCal',
  description:
    'Estimate return on investment, final value, and contribution impact with FullCal\'s ROI calculator.',
  alternates: {
    canonical: '/finance/roi-calculator',
  },
};

export default function RoiCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.roi} />;
}
