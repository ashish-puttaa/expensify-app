import {
   addExpense,
   removeExpense,
   editExpense
} from './../../actions/expenses';

test('should setup removeExpense Action object', () => {
   const action = removeExpense({ id: '123abc' });
   expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc'
   });
});

test('should setup editExpense Action object', () => {
   const updates = {
      description: 'An expense',
      note: 'A new note value'
   };

   const action = editExpense('123abc', updates);
   expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc',
      updates: updates
   });
});

test('should setup addExpense Action object with Provided Values', () => {
   const expenseDate = {
      description: 'Rent',
      amount: 1024,
      createdAt: 1000,
      note: 'A note'
   };

   const action = addExpense(expenseDate);
   expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
         ...expenseDate,
         id: expect.any(String)
      }
   });
});

test('should setup addExpense Action object with Default Values', () => {
   const action = addExpense();
   expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
         id: expect.any(String),
         description: '',
         note: '',
         createdAt: 0,
         amount: 0
      }
   });
});
