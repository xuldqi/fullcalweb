import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Hourly to Salary Calculator | FullCal',
  description: 'Convert hourly pay into weekly, monthly, and annual salary estimates with FullCal.',
  alternates: {
    canonical: '/salary/hourly-to-salary-calculator',
  },
};

export default function HourlyToSalaryCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.hourlyToSalary} />;
}
