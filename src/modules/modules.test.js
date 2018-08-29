import * as tictactoe from './tictactoe';

it("testing updatePlayerNameFunction", () => {
  const mockTarget = {
    name: "player1",
    value: "asdf"
  };
  expect(tictactoe.updatePlayerName(mockTarget)).toEqual({
    type: tictactoe.CHANGE_PLAYER_NAME_1,
    payload: mockTarget.value
  });
});

it("testing updatePlayerVictoryFunction", () => {
  expect(tictactoe.updatePlayerVictory("player1", 2)).toEqual({
    type: tictactoe.CHANGE_PLAYER_VICTORY_1,
    payload: 2
  });
});

it("testing updateGameCountFunction", () => {
  expect(tictactoe.updateGameCount(1)).toEqual({
    type: tictactoe.CHANGE_GAME_COUNT,
    payload: 1
  });
});

it("testing updatePlayerNameFunction", () => {
  expect(tictactoe.updatePlayerTurn(1)).toEqual({
    type: tictactoe.CHANGE_PLAYER_TURN,
    payload: 1
  });
});

it("testing updateMatrixFunction", () => {
  const mockMatrix = [[0,0,0]
                   ,[1,1,1]
                   ,[0,0,0]];
  expect(tictactoe.updateMatrix(mockMatrix)).toEqual({
    type: tictactoe.CHANGE_MATRIX,
    payload: mockMatrix
  });
});