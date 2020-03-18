import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from './../../components/AddExpensePage';
import expenses from './../fixtures/expenses';

let startAddExpenseSpy, historyPushSpy, wrapper;

beforeEach(() => {
   startAddExpenseSpy = jest.fn();
   historyPushSpy = { push: jest.fn() };
   wrapper = shallow(
      <AddExpensePage
         startAddExpense={startAddExpenseSpy}
         history={historyPushSpy}
      />
   );
});

test('should render AddExpensePage', () => {
   expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit in AddExpensePage', () => {
   wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
   expect(historyPushSpy.push).toHaveBeenLastCalledWith('/');
   expect(startAddExpenseSpy).toHaveBeenLastCalledWith(expenses[0]);
});
