import React from 'react';
import { ExpensesSummary } from './../../components/ExpensesSummary';
import { shallow } from 'enzyme';

test('should render ExpensesSummary with multiple expenses', () => {
   const wrapper = shallow(
      <ExpensesSummary expensesCount={21} expensesTotal={782364} />
   );
   expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with one expense', () => {
   const wrapper = shallow(
      <ExpensesSummary expensesCount={1} expensesTotal={1024} />
   );
   expect(wrapper).toMatchSnapshot();
});
