import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from './../../components/AddExpensePage';
import expenses from './../fixtures/expenses';

let addExpenseSpy, historyPushSpy, wrapper;

beforeEach(() => {
   addExpenseSpy = jest.fn();
   historyPushSpy = { push: jest.fn() };
   wrapper = shallow(
      <AddExpensePage addExpense={addExpenseSpy} history={historyPushSpy} />
   );
});

test('should render AddExpensePage', () => {
   expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
   wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
   expect(historyPushSpy.push).toHaveBeenLastCalledWith('/');
   expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[0]);
});
