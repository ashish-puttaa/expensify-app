import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// const date = new Date();
// console.log('date', date);

// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
   state = {
      description: '',
      note: '',
      amount: '',
      createdAt: moment(),
      calendarFocused: false,
      error: ''
   };

   componentDidMount() {
      if (this.props.expense) {
         const expense = this.props.expense;

         this.setState(() => ({
            description: expense.description,
            note: expense.note,
            amount: (expense.amount / 100).toString(),
            createdAt: moment(expense.createdAt)
         }));
      }
   }

   onAmountChange = e => {
      const amount = e.target.value;
      if (!amount || amount.match(/^\d+(\.\d{0,2})?$/))
         this.setState(() => ({ amount }));
   };

   onDateChange = createdAt => {
      if (createdAt) this.setState(() => ({ createdAt }));
   };

   onDescriptionChange = e => {
      const description = e.target.value;
      this.setState(() => ({ description }));
   };

   onFocusChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
   };

   onNoteChange = e => {
      const note = e.target.value;
      this.setState(() => ({ note }));
   };

   onSubmit = e => {
      e.preventDefault();

      if (!this.state.description && !this.state.amount) {
         this.setState(() => ({
            error: '*Please provide Description and Amount'
         }));
      } else if (!this.state.description) {
         this.setState(() => ({
            error: '*Please provide Description'
         }));
      } else if (!this.state.amount) {
         this.setState(() => ({
            error: '*Please provide Amount'
         }));
      } else {
         this.setState(() => ({ error: '' }));

         this.props.onSubmit({
            description: this.state.description,
            amount: parseFloat(this.state.amount, 10) * 100,
            createdAt: this.state.createdAt.valueOf(),
            note: this.state.note
         });
      }
   };

   render() {
      return (
         <div>
            <form onSubmit={this.onSubmit}>
               <input
                  type="text"
                  placeholder="Description"
                  autoFocus
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
               />
               <input
                  type="text"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.onAmountChange}
               />
               <SingleDatePicker
                  date={this.state.createdAt}
                  onDateChange={this.onDateChange}
                  focused={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                  isOutsideRange={day => false}
               />
               <textarea
                  placeholder="Add a note for your expense (optional)"
                  value={this.state.note}
                  onChange={this.onNoteChange}
               ></textarea>
               <button>
                  {this.props.expense ? 'Edit Expense' : 'Add Expense'}
               </button>
            </form>
            {this.state.error && <p>{this.state.error}</p>}
         </div>
      );
   }
}
