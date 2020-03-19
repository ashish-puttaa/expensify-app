import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from './../actions/filters';

/* 
   Exported ONLY to use it as an UNCONNECTED version in Snapshot Testing
   unconnected -> not connecting to react-redux using connect()
*/
export class ExpenseListFilters extends React.Component {
   state = {
      focusedInput: null
   };

   onDatesChange = ({ startDate, endDate }) => {
      this.props.setStartDate(startDate);
      this.props.setEndDate(endDate);
   };

   onFocusChange = focusedInput => {
      this.setState(() => ({ focusedInput }));
   };

   onTextChange = e => {
      this.props.setTextFilter(e.target.value);
   };

   onSortChange = e => {
      if (e.target.value === 'date') {
         this.props.sortByDate();
      } else if (e.target.value === 'amount') {
         this.props.sortByAmount();
      }
   };

   render() {
      return (
         <div>
            <input type="text" value={this.props.filters.text} onChange={this.onTextChange} />
            <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
               <option value="date">Date</option>
               <option value="amount">Amount</option>
            </select>
            <DateRangePicker
               startDate={this.props.filters.startDate}
               endDate={this.props.filters.endDate}
               onDatesChange={this.onDatesChange}
               focusedInput={this.state.focusedInput}
               onFocusChange={this.onFocusChange}
               hideKeyboardShortcutsPanel={true}
               numberOfMonths={1}
               isOutsideRange={() => false}
               showClearDates={true}
            />
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      filters: state.filters
   };
};

const mapDispatchToProps = dispatch => ({
   setStartDate: startDate => dispatch(setStartDate(startDate)),
   setEndDate: endDate => dispatch(setEndDate(endDate)),
   setTextFilter: text => dispatch(setTextFilter(text)),
   sortByDate: () => dispatch(sortByDate()),
   sortByAmount: () => dispatch(sortByAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
