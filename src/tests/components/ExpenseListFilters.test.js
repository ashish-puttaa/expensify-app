import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from './../../components/ExpenseListFilters';
import { filters, filtersDefault } from './../fixtures/filters';

let setStartDateSpy,
   setEndDateSpy,
   setTextFilterSpy,
   sortByDateSpy,
   sortByAmountSpy,
   wrapper;

beforeEach(() => {
   setStartDateSpy = jest.fn();
   setEndDateSpy = jest.fn();
   setTextFilterSpy = jest.fn();
   sortByDateSpy = jest.fn();
   sortByAmountSpy = jest.fn();
   wrapper = shallow(
      <ExpenseListFilters
         filters={filtersDefault}
         setStartDate={setStartDateSpy}
         setEndDate={setEndDateSpy}
         sortByAmount={sortByAmountSpy}
         sortByDate={sortByDateSpy}
         setTextFilter={setTextFilterSpy}
      />
   );
});

test('should render ExpenseListFilters with Default Filters', () => {
   expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with valid Filters', () => {
   expect(wrapper).toMatchSnapshot();
   wrapper.setProps({ filters: filters });
   expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
   const text = 'rent';
   wrapper.find('input').simulate('change', { target: { value: text } });
   expect(setTextFilterSpy).toHaveBeenLastCalledWith(text);
});

test('should handle dates change', () => {
   const startDate = moment(0).add(4, 'years');
   const endDate = moment(0).add(10, 'years');
   wrapper.find('DateRangePicker').prop('onDatesChange')({
      startDate,
      endDate
   });
   expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
   expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

test('should handle focus change', () => {
   // `DateRangePicker` expects the value of prop `focusedInput` to be one of ["null","startDate","endDate"]
   const focusedInput = 'startDate';
   wrapper.find('DateRangePicker').prop('onFocusChange')(focusedInput);
   expect(wrapper.state().focusedInput).toBe(focusedInput);
});

test('should handle sort by date', () => {
   wrapper.setProps({ filters: filters }); // To switch sortBy to 'amount'
   wrapper.find('select').simulate('change', { target: { value: 'date' } });
   expect(sortByDateSpy).toHaveBeenCalled();
});

test('should handle sort by amount', () => {
   wrapper.find('select').simulate('change', { target: { value: 'amount' } });
   expect(sortByAmountSpy).toHaveBeenCalled();
});
