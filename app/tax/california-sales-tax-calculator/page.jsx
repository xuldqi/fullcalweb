import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { finalRegionalPages } from '../../../lib/final-regional-pages';

export const metadata = {
  title: 'California Sales Tax Calculator | FullCal',
  description: 'Estimate California sales tax with a dedicated state sales tax calculator page.',
  alternates: {
    canonical: '/tax/california-sales-tax-calculator',
  },
};

export default function CaliforniaSalesTaxCalculatorPage() {
  return <CalculatorDetailPage page={finalRegionalPages.californiaSalesTax} />;
}
