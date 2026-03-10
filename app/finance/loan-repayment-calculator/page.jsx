import CalculatorDetailPage from '../../../components/CalculatorDetailPage';
import { calculatorPages } from '../../../lib/calculator-content';

export const metadata = {
  title: 'Loan Repayment Calculator | FullCal',
  description:
    'Estimate monthly loan repayments, total interest, and repayment cost with FullCal\'s loan repayment calculator.',
  alternates: {
    canonical: '/finance/loan-repayment-calculator',
  },
};

export default function LoanRepaymentCalculatorPage() {
  return <CalculatorDetailPage page={calculatorPages.loanRepayment} />;
}
