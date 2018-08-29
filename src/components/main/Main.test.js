import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

const children = <p>renders without crashing</p>;

it('renders without crashing', () => {
  expect(shallow(<Main children={children}/>)).toMatchSnapshot();
});