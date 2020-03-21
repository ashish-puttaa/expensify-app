import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
   addExpense,
   startAddExpense,
   removeExpense,
   editExpense,
   setExpenses,
   startSetExpenses,
   startRemoveExpense,
   startEditExpense
} from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from './../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'somerandomtestuid';
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
   const expenseData = {};
   expenses.forEach(({ id, description, amount, note, createdAt }) => {
      expenseData[id] = { description, amount, note, createdAt };
   });
   // console.log(expenseData);
   database
      .ref(`users/${uid}/expenses`)
      .set(expenseData)
      .then(() => done());
});

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
   const expenseData = expenses[0];

   const action = addExpense(expenseData);
   expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenseData
   });
});

test('should add expense to database and store', done => {
   const store = createMockStore(defaultAuthState);

   const expenseData = {
      description: 'Rent',
      amount: 1024,
      createdAt: 1000,
      note: 'A note'
   };

   store
      .dispatch(startAddExpense(expenseData))
      .then(() => {
         const actions = store.getActions();
         expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
               id: expect.any(String),
               ...expenseData
            }
         });

         return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
      })
      .then(snapshot => {
         expect(snapshot.val()).toEqual(expenseData);
         done();
      });
});

test('should add expense with defaults to database and store', done => {
   const store = createMockStore(defaultAuthState);

   const defaultExpenseData = {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
   };

   store
      .dispatch(startAddExpense({}))
      .then(() => {
         const actions = store.getActions();
         expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
               id: expect.any(String),
               ...defaultExpenseData
            }
         });

         return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
      })
      .then(snapshot => {
         expect(snapshot.val()).toEqual(defaultExpenseData);
         done();
      });
});

test('should setup setExpenses Action with data', () => {
   const action = setExpenses(expenses);
   expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
   });
});

test('should fetch the expenses from firebase', done => {
   const store = createMockStore(defaultAuthState);

   const expenseData = {
      description: 'Rent',
      amount: 1024,
      createdAt: 1000,
      note: 'A note'
   };

   store.dispatch(startSetExpenses()).then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
         type: 'SET_EXPENSES',
         expenses
      });

      done();
   });
});

test('should remove expenses from firebase and store', done => {
   const store = createMockStore(defaultAuthState);

   const id = 1;

   store.dispatch(startRemoveExpense({ id })).then(() => {
      const action = store.getActions();

      expect(action[0]).toEqual({
         type: 'REMOVE_EXPENSE',
         id
      });

      database
         .ref(`users/${uid}/expenses/${id}`)
         .once('value')
         .then(snapshot => {
            expect(snapshot.val()).toBeFalsy();
            done();
         });
   });
});

test('should edit expenses in firebase and store', done => {
   const store = createMockStore(defaultAuthState);

   const id = expenses[0].id;
   const updates = {
      note: 'A new note from test'
   };

   store.dispatch(startEditExpense(id, updates)).then(() => {
      const action = store.getActions();

      expect(action[0]).toEqual({
         type: 'EDIT_EXPENSE',
         id,
         updates
      });

      database
         .ref(`users/${uid}/expenses/${id}`)
         .once('value')
         .then(snapshot => {
            expect(snapshot.key).toBe(id);
            expect(snapshot.val().note).toBe(updates.note);
            done();
         });
   });
});

// test('should setup addExpense Action object with Default Values', () => {
//    const action = addExpense();
//    expect(action).toEqual({
//       type: 'ADD_EXPENSE',
//       expense: {
//          id: expect.any(String),
//          description: '',
//          note: '',
//          createdAt: 0,
//          amount: 0
//       }
//    });
// });
