import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
import { Header } from './../../components/Header';

test('should render Header Component', () => {
   /* Using ReactShallowRenderer :

      const renderer = new ReactShallowRenderer();
      renderer.render(<Header />);
      expect(renderer.getRenderOutput()).toMatchSnapshot();
   */

   const wrapper = shallow(<Header startLogout={() => {}} />);
   // expect(wrapper.find('h1').text()).toBe('Expensify');

   /* Without configuring 'snapshotSerializers' in 'jest.config.json',
      which tells jest to automatically use 'enzyme-to-json'
      
      expect(toJSON(wrapper)).toMatchSnapshot();
   */

   expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
   const startLogoutSpy = jest.fn();
   const wrapper = shallow(<Header startLogout={startLogoutSpy} />);
   wrapper.find('button').simulate('click');
   expect(startLogoutSpy).toHaveBeenCalled();
});
