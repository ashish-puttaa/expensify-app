import moment from 'moment';
import {
   setStartDate,
   setEndDate,
   sortByAmount,
   sortByDate,
   setTextFilter
} from './../../actions/filters';

test('should setup setStartDate Action object', () => {
   const action = setStartDate(moment(0));
   expect(action).toEqual({
      type: 'SET_START_DATE',
      startDate: moment(0)
   });
});

test('should setup setEndDate Action object', () => {
   const action = setEndDate(moment(0));
   expect(action).toEqual({
      type: 'SET_END_DATE',
      endDate: moment(0)
   });
});

test('should setup sortByAmount Action object', () => {
   expect(sortByAmount()).toEqual({
      type: 'SORT_BY_AMOUNT'
   });
});

test('should setup sortByDate Action object', () => {
   expect(sortByDate()).toEqual({
      type: 'SORT_BY_DATE'
   });
});

test('should setup setTextFilter Action object with Provided values', () => {
   const text = 'rent';
   const action = setTextFilter(text);
   expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: text
   });
});

test('should setup setTextFilter Action object with Default values', () => {
   const action = setTextFilter();
   expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: ''
   });
});
