import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from './../../components/ExpenseForm';
import expenses from './../fixtures/expenses';

test('should render ExpenseForm without data', () => {
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseDate with data', () => {
   const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
   expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot();
   wrapper.find('form').simulate('submit', { preventDefault: () => {} });
   expect(wrapper.state().error.length).toBeGreaterThan(0);
   expect(wrapper).toMatchSnapshot();
});

test('should set description in state on input change', () => {
   const description = 'rent';
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper.state().description).toBe('');
   wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: description } });

   expect(wrapper.state().description).toBe(description);
});

test('should set note in state on text area change', () => {
   const note = 'A note';
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper.state().note).toBe('');
   wrapper.find('textarea').simulate('change', { target: { value: note } });
   expect(wrapper.state().note).toBe(note);
});

test('should set amount in state on amount input change : VALID INPUT', () => {
   const amount = '100.12';
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper.state().amount).toBe('');
   wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: amount } });
   expect(wrapper.state().amount).toBe(amount);
});

test('should set amount in state on amount input change : INVALID INPUT ', () => {
   const amount = '100.1233';
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper.state().amount).toBe('');
   wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: amount } });
   expect(wrapper.state().amount).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
   const onSubmitSpy = jest.fn();
   const wrapper = shallow(
      <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
   );
   wrapper.find('form').simulate('submit', { preventDefault: () => {} });
   expect(wrapper.state().error).toBe('');
   expect(onSubmitSpy).toHaveBeenLastCalledWith({
      description: expenses[0].description,
      amount: expenses[0].amount,
      note: expenses[0].note,
      createdAt: expenses[0].createdAt
   });
});

test('should set date (createdAt) in state on date input change', () => {
   const date = moment(0).add(10, 'day');
   const wrapper = shallow(<ExpenseForm />);
   wrapper.find('SingleDatePicker').prop('onDateChange')(date);
   expect(wrapper.state().createdAt).toEqual(date);
});

test('should set calendar focus in state on focus change', () => {
   const focused = true;
   const wrapper = shallow(<ExpenseForm />);
   wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
   expect(wrapper.state().calendarFocused).toBe(focused);
});
