export const CHANGE_PLAYER_NAME_1 = 'CHANGE_PLAYER_NAME_1';
export const CHANGE_PLAYER_VICTORY_1 = 'CHANGE_PLAYER_VICTORY_1';
export const CHANGE_PLAYER_NAME_2 = 'CHANGE_PLAYER_NAME_2';
export const CHANGE_PLAYER_VICTORY_2 = 'CHANGE_PLAYER_VICTORY_2';
export const CHANGE_PLAYER_TURN = 'CHANGE_PLAYER_TURN';
export const CHANGE_GAME_COUNT = 'CHANGE_GAME_COUNT';
export const CHANGE_MATRIX = 'CHANGE_MATRIX';

const initialState = {
  playerName1: '',
  playerVictory1: 0,
  playerName2: '',
  playerVictory2: 0,
  playerTurn: 1,
  gameCount: 0,
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
    case CHANGE_PLAYER_VICTORY_1:
      return {
        ...state,
        playerVictory1: action.payload
      };
    case CHANGE_PLAYER_NAME_2:
      return {
        ...state,
        playerName2: action.payload
      };
    case CHANGE_PLAYER_VICTORY_2:
      return {
        ...state,
        playerVictory2: action.payload
      };
    case CHANGE_GAME_COUNT:
      return {
        ...state,
        gameCount: action.payload
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

export const updatePlayerVictory = (player, victory) => ({
  type: player === "player1" ? CHANGE_PLAYER_VICTORY_1:CHANGE_PLAYER_VICTORY_2,
  payload: victory
});

export const updateGameCount = gameCount => ({
  type: CHANGE_GAME_COUNT,
  payload: gameCount
});

export const updatePlayerTurn = playerTurn => ({
  type: CHANGE_PLAYER_TURN,
  payload: playerTurn
});

export const updateMatrix = matrix => ({
  type: CHANGE_MATRIX,
  payload: matrix || [[0,0,0], [0,0,0],[0,0,0]]
});