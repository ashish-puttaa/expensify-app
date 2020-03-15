import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from './../../components/EditExpensePage';
import expenses from './../fixtures/expenses';

let removeExpenseSpy, editExpenseSpy, historyPushSpy, wrapper;

beforeEach(() => {
   removeExpenseSpy = jest.fn();
   editExpenseSpy = jest.fn();
   historyPushSpy = { push: jest.fn() };
   wrapper = shallow(
      <EditExpensePage
         expense={expenses[0]}
         removeExpense={removeExpenseSpy}
         editExpense={editExpenseSpy}
         history={historyPushSpy}
      />
   );
});

test('should render EditExpensePage', () => {
   expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit (edit Expense)', () => {
   wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
   expect(historyPushSpy.push).toHaveBeenLastCalledWith('/');
   expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('should handle onClick (remove Expense)', () => {
   wrapper.find('button').simulate('click');
   expect(historyPushSpy.push).toHaveBeenLastCalledWith('/');
   expect(removeExpenseSpy).toHaveBeenLastCalledWith({ id: expenses[0].id });
});
