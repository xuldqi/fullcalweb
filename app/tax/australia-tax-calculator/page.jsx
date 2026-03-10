import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { regionalPages } from '../../../lib/regional-pages';

export const metadata = {
  title: 'Australia Tax Calculator | FullCal',
  description: 'Estimate Australia income tax and rough take-home pay with a dedicated regional calculator page.',
  alternates: {
    canonical: '/tax/australia-tax-calculator',
  },
};

export default function AustraliaTaxCalculatorPage() {
  return <CalculatorDetailPage page={regionalPages.australiaTax} />;
}
