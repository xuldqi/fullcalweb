import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { finalRegionalPages } from '../../../lib/final-regional-pages';

export const metadata = {
  title: 'Texas Sales Tax Calculator | FullCal',
  description: 'Estimate Texas sales tax with a dedicated state sales tax calculator page.',
  alternates: {
    canonical: '/tax/texas-sales-tax-calculator',
  },
};

export default function TexasSalesTaxCalculatorPage() {
  return <CalculatorDetailPage page={finalRegionalPages.texasSalesTax} />;
}
