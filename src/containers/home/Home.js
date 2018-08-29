import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Home.css';

import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import Modal from "../../components/modal/Modal";

import {
  updatePlayerName,
  updatePlayerTurn,
  updatePlayerVictory,
  updateGameCount,
  updateMatrix
} from "../../modules/tictactoe";

export const verifyLine = (matrix, isReverse, isDiagonal) => {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].every((value) => value === 1) || matrix[i].every((value) => value === 2)) {
      return {
        winner: matrix[i][0],
        lineIndex: i,
        isReverse: isReverse,
        isDiagonal: isDiagonal
      };
    }
  }

  return false;
};

export const diagonalMatrix = (matrix) => {
  let diagonalX = [];
  let diagonalY = [];

  for (let i = 0; i < matrix.length; i++) {
    diagonalX.push(matrix[i][i]);
    diagonalY.push(matrix[i][matrix.length - i - 1]);
  }

  return [diagonalX, diagonalY];
};

export const reverseMatrix = (matrix) => matrix.map((line, i) => line.map((value, j) => matrix[j][i]));

class Home extends Component {
  constructor(){
    super();

    this.state = {
      movesCount: 0,
      degCount: 0,
      result: 0,
      winnerPlayer: ''
    }
  }

  onClickBlock = (e, i, j) => {
    let matrix = this.props.matrix;

    if (!matrix[i][j] && !this.state.result) {
      this.controlMatrixAnimation(e, this.props.playerTurn);

      matrix[i][j] = this.props.playerTurn;
      this.props.updateMatrix(matrix);

      this.setState({movesCount: this.state.movesCount + 1});

      if(this.gameController(matrix)) return;

      this.props.updatePlayerTurn(this.props.playerTurn === 1 ? 2 : 1);

    } else if(!this.state.result){
      const matrix = document.querySelector(".matrix");

      matrix.classList.add("warning");

      setTimeout(() => {
        matrix.classList.remove("warning");
      }, 300);
    }
  };

  gameController = (matrix) => {
    const result = verifyLine(matrix, false, false) || verifyLine(reverseMatrix(matrix), true, false) || verifyLine(diagonalMatrix(matrix), false, true);

    if (result) {
      this.handlerResult(result);
    } else if (this.state.movesCount === 9) {
      this.setState({result: 2});
    }

    if(result || this.state.movesCount === 9){
      this.handleEndGame();
      return true;
    }
    return false;
  };

  handlerResult = (result) => {
    const winnerLine = document.querySelector(".winner-line");
    const home = document.querySelector(".Home");

    if (result.winner === 1) {
      this.props.updatePlayerVictory("player1", this.props.playerVictory1 + 1);
    } else {
      this.props.updatePlayerVictory("player2", this.props.playerVictory2 + 1);
    }

    if (result.isReverse) {
      winnerLine.classList.add("reverse");
    } else if (result.isDiagonal) {
      winnerLine.classList.add("diagonal");
    } else {
      winnerLine.classList.add("normal");
    }

    winnerLine.classList.add("index" + result.lineIndex);
    home.classList.add("winner");
    this.setState({result: 1});
  };

  handleEndGame = () => {
    this.props.updateGameCount(this.props.gameCount + 1);
    this.props.updateMatrix(null);
  };

  controlMatrixAnimation = (e, playerTurn) => {
    e.target.classList.add("type" + playerTurn);

    this.setState({degCount: this.state.degCount + 90});
  };

  resetGameInterface = (playerColor) => {
    const winnerLine = document.querySelector(".winner-line");
    const home = document.querySelector(".Home");
    const value = [...document.querySelectorAll(".value")];

    winnerLine.className = "winner-line";
    home.className = "Home " + playerColor;
    value.map(element => element.className = "value");

    this.setState({result: 0, movesCount: 0, degCount: 0});
  };

  render() {
    const {
      playerName1,
      playerVictory1,
      playerName2,
      playerVictory2,
      updatePlayerName,
      playerTurn,
      gameCount,
      matrix
    } = this.props;

    const player = {
      name: playerTurn === 1 ? playerName1:playerName2,
      color: playerTurn === 1 ? "blue":"green"
    };

    const contentTransform = `rotate(${this.state.degCount}deg)`;

    return (
      <div className={`Home ${player.color}`}>
        <Modal title={"Jogador N1, digite seu nome:"} name={"player1"} playerName={playerName1} onChangePlayerName={updatePlayerName}/>
        <Modal title={"Jogador N2, digite seu nome:"} name={"player2"} playerName={playerName2} onChangePlayerName={updatePlayerName}/>
        <Header result={this.state.result} playerName={player.name} playerColor={player.color}/>
        <Main>
          <div className="container">
            <div className="data-players">
              <div className="data-player1">
                <div className="player-name">{playerName1} - {playerVictory1}</div>
              </div>
              <div className="game-count">
                <div>Jogo - {gameCount}</div>
              </div>
              <div className="data-player2">
                <div className="player-name">{playerName2} - {playerVictory2}</div>
              </div>
            </div>
            <div className="content" style={{transform: contentTransform}}>
              <div className="winner-line">
              </div>
              <div className="matrix">
                {matrix.map((line, i) => (
                  line.map((value, j) => (
                    <div key={i + "" + j}
                         className="value"
                         onClick={(e) => this.onClickBlock(e, i, j)}>
                    </div>
                  ))
                ))}
              </div>
            </div>
            <div className="restart">
              <div onClick={(e) => this.resetGameInterface(player.color)}>Recomeçar!</div>
            </div>
          </div>
        </Main>
      </div>
    );
  }
}

const initMapStateToProps = state => ({
  playerName1: state.tictactoe.playerName1,
  playerVictory1: state.tictactoe.playerVictory1,
  playerName2: state.tictactoe.playerName2,
  playerVictory2: state.tictactoe.playerVictory2,
  playerTurn: state.tictactoe.playerTurn,
  gameCount: state.tictactoe.gameCount,
  matrix: state.tictactoe.matrix
});

const initMapDispatchToProps = dispatch => ({
  updatePlayerName: (e) => dispatch(updatePlayerName(e.target)),
  updatePlayerTurn: (playerTurn) => dispatch(updatePlayerTurn(playerTurn)),
  updateGameCount: (gameCount) => dispatch(updateGameCount(gameCount)),
  updatePlayerVictory: (player, victory) => dispatch(updatePlayerVictory(player, victory)),
  updateMatrix: (matrix) => dispatch(updateMatrix(matrix))
});

export default connect(initMapStateToProps, initMapDispatchToProps)(Home);
