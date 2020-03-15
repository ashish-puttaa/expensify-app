store.subscribe(() => {
   const state = store.getState();
   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
   console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
   addExpense({ description: 'Rent', createdAt: -1000, amount: 100 })
);
const expenseTwo = store.dispatch(
   addExpense({ description: 'Coffee', createdAt: -11000, amount: 880 })
);
const expenseThree = store.dispatch(
   addExpense({ description: 'Tickets', createdAt: 2000, amount: 13880 })
);
// store.dispatch(
//    removeExpense({
//       id: expenseOne.expense.id
//    })
// );

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1000));
// store.dispatch(setEndDate());

const demoState = {
   expenses: [
      {
         id: '123213',
         description: 'January Rent',
         note: 'This is the final payment for that address',
         amount: 55300,
         createdAt: 0
      }
   ],
   filters: {
      text: 'rent',
      sortBy: 'amount', // date or amount
      startDate: undefined,
      endDate: undefined
   }
};

// console.log(demoState);

// const user = {
//    name: 'Puttaa',
//    age: 21
// };

// console.log({
//    ...user,
//    description: 'A guy',
//    age: 35
// });
