import React from 'react';
import { shallow } from 'enzyme';
import Home, { verifyLine, diagonalMatrix, reverseMatrix } from './Home';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
 
const initialState = {
  tictactoe: {
    playerName1: '',
    playerVictory1: 0,
    playerName2: '',
    playerVictory2: 0,
    playerTurn: 1,
    gameCount: 0,
    matrix: [[0,0,0]
            ,[0,0,0]
            ,[0,0,0]]
  }
}; 

const mockStore = configureStore([thunk]);

let wrapper;
let store;

beforeEach(() => {
  store = mockStore(initialState);
  wrapper = shallow(<Home store={store}/>);
})

it('renders without crashing', () => {
  expect(wrapper).toMatchSnapshot();
});

it('testing reverseMatrixFunction', () => {
  const mockMatrix = [[1,1,1]
                  ,[0,0,0]
                  ,[0,0,0]];
  expect(reverseMatrix(mockMatrix)).toEqual([[1,0,0]
                                            ,[1,0,0]
                                            ,[1,0,0]]);
});

it('testing diagonalMatrixFunction', () => {
  const mockMatrix = [[1,0,0]
                  ,[0,1,0]
                  ,[0,0,1]];
  expect(diagonalMatrix(mockMatrix)).toEqual([[1,1,1]
                                             ,[0,1,0]]);
});

it('testing verifyLineFunction', () => {
  const mockMatrix = [[0,0,0]
                  ,[1,1,1]
                  ,[0,0,0]];
  expect(verifyLine(mockMatrix, true, false)).toEqual({
    winner: 1,
    lineIndex: 1,
    isReverse: true,
    isDiagonal: false
  });
});

