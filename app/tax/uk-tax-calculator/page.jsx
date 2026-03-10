import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { regionalPages } from '../../../lib/regional-pages';

export const metadata = {
  title: 'UK Tax Calculator | FullCal',
  description: 'Estimate UK income tax and rough take-home pay with a dedicated UK tax calculator page.',
  alternates: {
    canonical: '/tax/uk-tax-calculator',
  },
};

export default function UkTaxCalculatorPage() {
  return <CalculatorDetailPage page={regionalPages.ukTax} />;
}
