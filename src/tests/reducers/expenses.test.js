import moment from 'moment';
import expensesReducer from './../../reducers/expenses';
import expenses from './../fixtures/expenses';

test('should set default state values', () => {
   const state = expensesReducer(undefined, { type: '@@INIT' });
   expect(state).toEqual([]);
});

test('should remove expense by id', () => {
   const action = {
      type: 'REMOVE_EXPENSE',
      id: expenses[1].id
   };

   const state = expensesReducer(expenses, action);
   expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id is not found', () => {
   const action = {
      type: 'REMOVE_EXPENSE',
      id: '-1'
   };

   const state = expensesReducer(expenses, action);
   expect(state).toEqual(expenses);
});

test('should add expense', () => {
   const newExpense = {
      id: '4',
      description: 'Water',
      note: '',
      amount: 350,
      createdAt: moment(0)
         .add(2, 'days')
         .valueOf()
   };
   const action = {
      type: 'ADD_EXPENSE',
      expense: newExpense
   };

   const state = expensesReducer(expenses, action);
   expect(state).toEqual([...expenses, newExpense]);
});

test('should edit expense', () => {
   const amount = 108500;
   const action = {
      type: 'EDIT_EXPENSE',
      id: expenses[1].id,
      updates: {
         amount
      }
   };

   const state = expensesReducer(expenses, action);
   expect(state[1].amount).toBe(amount);
});

test('should not edit expense if id is not found', () => {
   const amount = 108500;
   const action = {
      type: 'EDIT_EXPENSE',
      id: '-1',
      updates: {
         amount
      }
   };

   const state = expensesReducer(expenses, action);
   expect(state).toEqual(expenses);
});
