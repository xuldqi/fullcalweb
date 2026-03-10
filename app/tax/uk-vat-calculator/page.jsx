import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { secondaryRegionalPages } from '../../../lib/secondary-regional-pages';

export const metadata = {
  title: 'UK VAT Calculator | FullCal',
  description: 'Add or reverse-calculate UK VAT with a dedicated UK VAT calculator page.',
  alternates: {
    canonical: '/tax/uk-vat-calculator',
  },
};

export default function UkVatCalculatorPage() {
  return <CalculatorDetailPage page={secondaryRegionalPages.ukVat} />;
}
