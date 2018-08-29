import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

const props = {
  result: 0,
  name: "string",
  playerName: "string",
  playerColor: "string",
}

it('renders without crashing', () => {
  expect(shallow(<Header {...props}/>)).toMatchSnapshot();
});