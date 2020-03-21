import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from './../actions/expenses';

/* 
   Exported ONLY to use it as an UNCONNECTED version in Snapshot Testing
   unconnected -> not connecting to react-redux using connect()
*/
export class AddExpensePage extends React.Component {
   onSubmit = expense => {
      /* 
         this.props.dispatch() can be called by creating a spy during testing, 
         but addExpense cannot be called that way as it is being imported.
         To fix this, mapDispatchToProps.
         mapDispatchToProps removes the dispatch function from the props, and instead adds the new function provided.
         The new function can be defined to use the imported method, which makes easier to create spies.

         this.props.dispatch(addExpense(expense));
      */

      this.props.startAddExpense(expense);
      this.props.history.push('/');
   };

   render() {
      return (
         <div>
            <div className="page-header">
               <div className="content-container">
                  <h2 className="page-header__title">Add Expense</h2>
               </div>
            </div>

            <div className="content-container">
               <ExpenseForm onSubmit={this.onSubmit} />
            </div>
         </div>
      );
   }
}

// To make it easier to use spies during testing
const mapDispatchToProps = dispatch => ({
   startAddExpense: expense => dispatch(startAddExpense(expense))
});

/* export default connect()(AddExpensePage); */

export default connect(undefined, mapDispatchToProps)(AddExpensePage);

/*














*/
// Before converting to Class based Component to avoid inline functions:
// NOTE :
//    You can just create functions inside the stateless components,
//    but the disadvantage is that the function has to be re-created every time the component is rendered
//
//
// const AddExpensePage = props => (
//    <div>
//       <h2>Add Expense</h2>
//       <ExpenseForm
//          onSubmit={expense => {
//             console.log(props);
//
//             /* props.dispatch() can be called by creating a spy during testing,
//                but addExpense cannot be called that way as it is being imported.
//                To fix this, mapDispatchToProps.
//                mapDispatchToProps removes the dispatch function from the props, and instead adds the new function provided.
//                The new function can be defined to use the imported method, which makes easier to create spies.
//
//                props.dispatch(addExpense(expense));
//             */
//
//             props.addExpense(expense);
//             props.history.push('/');
//          }}
//       />
//    </div>
// );
