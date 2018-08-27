const CHANGE_PLAYER_NAME_1 = 'CHANGE_PLAYER_NAME_1';
const CHANGE_PLAYER_NAME_2 = 'CHANGE_PLAYER_NAME_2';
const CHANGE_PLAYER_TURN = 'CHANGE_PLAYER_TURN';
const CHANGE_MATRIX = 'CHANGE_MATRIX';

const initialState = {
  playerName1: '',
  playerName2: '',
  playerTurn: 1,
  matrix: [[0,0,0]
          ,[0,0,0]
          ,[0,0,0]]
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_PLAYER_NAME_1:
      return {
        ...state,
        playerName1: action.payload
      };
    case CHANGE_PLAYER_NAME_2:
      return {
        ...state,
        playerName2: action.payload
      };
    case CHANGE_PLAYER_TURN:
      return {
        ...state,
        playerTurn: action.payload
      };
    case CHANGE_MATRIX:
      return {
        ...state,
        matrix: action.payload
      };
    default:
      return state;
  }
}

export const updatePlayerName = target => ({
  type: target.name === "player1" ? CHANGE_PLAYER_NAME_1:CHANGE_PLAYER_NAME_2,
  payload: target.value
});

export const updatePlayerTurn = playerTurn => ({
  type: CHANGE_PLAYER_TURN,
  payload: playerTurn
});

export const updateMatrix = matrix => ({
  type: CHANGE_MATRIX,
  payload: matrix
});