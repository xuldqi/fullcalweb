import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { regionalPages } from '../../../lib/regional-pages';

export const metadata = {
  title: 'Canada Income Tax Calculator | FullCal',
  description: 'Estimate Canada income tax with federal and provincial context using FullCal.',
  alternates: {
    canonical: '/tax/canada-income-tax-calculator',
  },
};

export default function CanadaIncomeTaxCalculatorPage() {
  return <CalculatorDetailPage page={regionalPages.canadaIncomeTax} />;
}
