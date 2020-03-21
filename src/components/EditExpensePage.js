import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from './../actions/expenses';

/* 
   Exported ONLY to use it as an UNCONNECTED version in Snapshot Testing
   unconnected -> not connecting to react-redux using connect()
*/
export class EditExpensePage extends React.Component {
   onSubmit = expense => {
      /* this.props.dispatch(editExpense(this.props.expense.id, expense)); */
      this.props.startEditExpense(this.props.expense.id, expense);
      this.props.history.push('/');
   };

   onRemove = () => {
      /* 
         this.props.dispatch() can be called by creating a spy during testing, 
         but removeExpense cannot be called that way as it is being imported.
         To fix this, mapDispatchToProps.
         mapDispatchToProps removes the dispatch function from the props, and instead adds the new function provided.
         The new function can be defined to use the imported method, which makes easier to create spies.

         this.props.dispatch(removeExpense({ id: this.props.expense.id }));
      */

      this.props.startRemoveExpense({ id: this.props.expense.id });
      this.props.history.push('/');
   };

   render() {
      return (
         <div>
            <div className="page-header">
               <div className="content-container">
                  <h2 className="page-header__title">Edit Expense</h2>
               </div>
            </div>
            <div className="content-container">
               <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
               <button className="button button--secondary" onClick={this.onRemove}>
                  Remove Expense
               </button>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, props) => {
   return {
      expense: state.expenses.find(expense => {
         return expense.id === props.match.params.id;
      })
   };
};

// To make it easier to use spies during testing
const mapDispatchToProps = dispatch => ({
   startRemoveExpense: idObj => dispatch(startRemoveExpense(idObj)),
   startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
});

/* export default connect(mapStateToProps)(EditExpensePage); */

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

/*















*/

// Before converting to Class based Component to avoid inline functions:
// NOTE :
//    You can just create functions inside the stateless components,
//    but the disadvantage is that the function has to be re-created every time the component is rendered
//
//
// const EditExpensePage = props => {
//    return (
//       <div>
//          <ExpenseForm
//             expense={props.expense}
//             onSubmit={expense => {
//                /* props.dispatch(editExpense(props.expense.id, expense)); */
//                props.editExpense(props.expense.id, expense);
//                props.history.push('/');
//             }}
//          />
//          <button
//             onClick={e => {
//                /*
//                   props.dispatch() can be called by creating a spy during testing,
//                   but removeExpense cannot be called that way as it is being imported.
//                   To fix this, mapDispatchToProps.
//                   mapDispatchToProps removes the dispatch function from the props, and instead adds the new function provided.
//                   The new function can be defined to use the imported method, which makes easier to create spies.
//
//                   props.dispatch(removeExpense({ id: props.expense.id }));
//                */
//
//                props.removeExpense({ id: props.expense.id });
//                props.history.push('/');
//             }}
//          >
//             Remove
//          </button>
//       </div>
//    );
// };
