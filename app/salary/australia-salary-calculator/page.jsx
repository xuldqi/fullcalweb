import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { finalRegionalPages } from '../../../lib/final-regional-pages';

export const metadata = {
  title: 'Australia Salary Calculator | FullCal',
  description: 'Estimate gross-to-net salary with a dedicated Australia salary calculator page.',
  alternates: {
    canonical: '/salary/australia-salary-calculator',
  },
};

export default function AustraliaSalaryCalculatorPage() {
  return <CalculatorDetailPage page={finalRegionalPages.australiaSalary} />;
}
