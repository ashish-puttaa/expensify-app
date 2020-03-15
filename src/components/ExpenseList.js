import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from './../selectors/expenses';

// Exported ONLY to use it as an UNCONNECTED version in Snapshot Testing
// unconnected -> not connecting to react-redux using connect()
export const ExpenseList = props => (
   <div>
      <h2>Expense List</h2>
      {props.expenses.length === 0 ? (
         <p>No expenses</p>
      ) : (
         props.expenses.map(expense => (
            <ExpenseListItem key={expense.id} {...expense} />
         ))
      )}
   </div>
);

const mapStateToProps = state => {
   return {
      expenses: selectExpenses(state.expenses, state.filters)
   };
};

export default connect(mapStateToProps)(ExpenseList);

/* Without using selectors : 

   const ConnectedExpenseList = connect(state => {
      return {
         expenses: state.expenses
      };
   })(ExpenseList);

   export default ConnectedExpenseList;
*/
