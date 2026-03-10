import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { secondaryRegionalPages } from '../../../lib/secondary-regional-pages';

export const metadata = {
  title: 'California Paycheck Calculator | FullCal',
  description: 'Estimate California take-home pay with a dedicated state paycheck calculator.',
  alternates: {
    canonical: '/salary/california-paycheck-calculator',
  },
};

export default function CaliforniaPaycheckCalculatorPage() {
  return <CalculatorDetailPage page={secondaryRegionalPages.californiaPaycheck} />;
}
