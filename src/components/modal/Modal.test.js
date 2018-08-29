import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

const props = {
  title: "string",
  name: "string",
  playerName: "string",
  onChangePlayerName: jest.fn(),
}

it('renders without crashing', () => {
  expect(shallow(<Modal {...props}/>)).toMatchSnapshot();
});