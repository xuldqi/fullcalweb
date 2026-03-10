import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { secondaryRegionalPages } from '../../../lib/secondary-regional-pages';

export const metadata = {
  title: 'Canada Sales Tax Calculator | FullCal',
  description: 'Estimate Canada sales tax with province-aware context using FullCal.',
  alternates: {
    canonical: '/tax/canada-sales-tax-calculator',
  },
};

export default function CanadaSalesTaxCalculatorPage() {
  return <CalculatorDetailPage page={secondaryRegionalPages.canadaSalesTax} />;
}
