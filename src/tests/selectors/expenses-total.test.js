import { shallow } from 'enzyme';
import expenses from './../fixtures/expenses';
import getExpensesTotal from './../../selectors/expenses-total';

test('should return 0 if no expense', () => {
   const total = getExpensesTotal([]);
   expect(total).toBe(0);
});

test('should return total of single expense', () => {
   const total = getExpensesTotal([expenses[0]]);
   expect(total).toBe(expenses[0].amount);
});

test('should return total of all expenses', () => {
   const total = getExpensesTotal(expenses);
   expect(total).toBe(
      expenses[0].amount + expenses[1].amount + expenses[2].amount
   );
});
