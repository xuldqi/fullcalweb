import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'VAT Calculator | FullCal',
  description:
    'Add VAT, reverse-calculate tax-inclusive prices, and validate invoice totals with FullCal\'s VAT calculator.',
  alternates: {
    canonical: '/tax/vat-calculator',
  },
};

export default function VatCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.vat} />;
}
