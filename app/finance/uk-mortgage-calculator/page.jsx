import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { finalRegionalPages } from '../../../lib/final-regional-pages';

export const metadata = {
  title: 'UK Mortgage Calculator | FullCal',
  description: 'Estimate monthly mortgage payments with a dedicated UK mortgage calculator page.',
  alternates: {
    canonical: '/finance/uk-mortgage-calculator',
  },
};

export default function UkMortgageCalculatorPage() {
  return <CalculatorDetailPage page={finalRegionalPages.ukMortgage} />;
}
