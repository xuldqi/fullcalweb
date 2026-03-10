import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { finalRegionalPages } from '../../../lib/final-regional-pages';

export const metadata = {
  title: 'Florida Mortgage Calculator | FullCal',
  description: 'Estimate monthly mortgage payments with a dedicated Florida mortgage calculator page.',
  alternates: {
    canonical: '/finance/florida-mortgage-calculator',
  },
};

export default function FloridaMortgageCalculatorPage() {
  return <CalculatorDetailPage page={finalRegionalPages.floridaMortgage} />;
}
