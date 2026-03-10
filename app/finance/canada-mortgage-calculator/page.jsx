import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { finalRegionalPages } from '../../../lib/final-regional-pages';

export const metadata = {
  title: 'Canada Mortgage Calculator | FullCal',
  description: 'Estimate monthly mortgage payments with a dedicated Canada mortgage calculator page.',
  alternates: {
    canonical: '/finance/canada-mortgage-calculator',
  },
};

export default function CanadaMortgageCalculatorPage() {
  return <CalculatorDetailPage page={finalRegionalPages.canadaMortgage} />;
}
