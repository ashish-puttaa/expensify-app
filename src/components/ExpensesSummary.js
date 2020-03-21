import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getExpenesesTotal from './../selectors/expenses-total';
import selectExpenses from './../selectors/expenses';
import numeral from 'numeral';

const centsToDollars = amount => {
   // return `$${(amount / 100).toFixed(2)}`;
   return numeral(amount / 100).format('$0,0.00');
};

export const ExpensesSummary = props => {
   const expenseWord = props.expensesCount === 1 ? 'expense' : 'expenses';
   const expensesTotalInDollars = centsToDollars(props.expensesTotal);

   return (
      <div className="page-header">
         <div className="content-container">
            <h1 className="page-header__title">
               Viewing <span>{props.expensesCount}</span> {expenseWord} totalling <span>{expensesTotalInDollars}</span>
            </h1>
            <div className="page-header__actions">
               <Link className="button" to="/create">
                  Add Expense
               </Link>
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = state => {
   const filteredExpenses = selectExpenses(state.expenses, state.filters);
   return {
      expensesCount: filteredExpenses.length,
      expensesTotal: getExpenesesTotal(filteredExpenses)
   };
};

export default connect(mapStateToProps)(ExpensesSummary);
