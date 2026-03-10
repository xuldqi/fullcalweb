import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { regionalPages } from '../../../lib/regional-pages';

export const metadata = {
  title: 'Germany Salary Calculator | FullCal',
  description: 'Estimate gross-to-net salary in Germany with a dedicated Germany salary calculator page.',
  alternates: {
    canonical: '/salary/germany-salary-calculator',
  },
};

export default function GermanySalaryCalculatorPage() {
  return <CalculatorDetailPage page={regionalPages.germanySalary} />;
}
