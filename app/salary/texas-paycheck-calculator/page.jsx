import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { secondaryRegionalPages } from '../../../lib/secondary-regional-pages';

export const metadata = {
  title: 'Texas Paycheck Calculator | FullCal',
  description: 'Estimate Texas take-home pay with a dedicated state paycheck calculator.',
  alternates: {
    canonical: '/salary/texas-paycheck-calculator',
  },
};

export default function TexasPaycheckCalculatorPage() {
  return <CalculatorDetailPage page={secondaryRegionalPages.texasPaycheck} />;
}
