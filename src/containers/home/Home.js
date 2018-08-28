import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Home.css';

import Header from '../../components/header/Header';
import Main from '../../components/main/Main';

import {
  updatePlayerName,
  updatePlayerTurn,
  updatePlayerVictory,
  updateGameCount,
  updateMatrix
} from "../../modules/tictactoe";

class Home extends Component {
  constructor(){
    super();

    this.state = {
      degCount: 0,
      result: 0,
      winnerPlayer: ''
    }
  }

  onSubmitPlayerName = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.add("hide");
  };

  onClickBlock = (e, i, j) => {
    if (!this.props.matrix[i][j]) {
      let matrix = this.props.matrix;
      let playerTurn = this.props.playerTurn;

      this.controlMatrixAnimation(e, playerTurn);

      matrix[i][j] = playerTurn;
      this.props.updateMatrix(matrix);

      if(this.gameController(matrix)) return;

      playerTurn = playerTurn === 1 ? 2 : 1;
      this.props.updatePlayerTurn(playerTurn);
    } else if(!this.state.result){
      let matrix = document.querySelector(".matrix");

      matrix.classList.add("warning");

      setTimeout(() => {
        matrix.classList.remove("warning");
      }, 300);
    }
  };

  gameController = (matrix) => {
    let result = this.verifyLine(matrix, false, false) || this.verifyLine(this.reverseMatrix(matrix), true, false) || this.verifyLine(this.diagonalMatrix(matrix), false, true);

    if (result) {
      let winnerLine = document.querySelector(".winner-line");
      let home = document.querySelector(".Home");

      if (result.winner === 1) {
        let playerVictory1 = this.props.playerVictory1;
        playerVictory1++;
        this.props.updatePlayerVictory("player1", playerVictory1);
      } else {
        let playerVictory2 = this.props.playerVictory2;
        playerVictory2++;
        this.props.updatePlayerVictory("player2", playerVictory2);
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
    } else if (this.isFull(matrix)) {
      this.setState({result: 2});
    }

    if(result || this.isFull(matrix)){
      let gameCount = this.props.gameCount;
      gameCount++;
      this.props.updateGameCount(gameCount);
      this.props.updateMatrix(null);
      return true;
    }
    return false;
  };

  controlMatrixAnimation = (e, playerTurn) => {
    let degCount = this.state.degCount;
    let content = document.querySelector(".container .content");

    this.setState({degCount: degCount + 90}, () => {
      content.style.transform = `rotate(${this.state.degCount}deg)`;
    });
    e.target.classList.add("player" + playerTurn);
  };

  resetGameInterface = () => {
    let winnerLine = document.querySelector(".winner-line");
    let home = document.querySelector(".Home");
    let value = [...document.querySelectorAll(".value")];

    winnerLine.className = "winner-line";
    home.className = "Home";
    value.map(element => element.className = "value");

    this.setState({result: 0});
  };

  verifyLine = (matrix, isReverse, isDiagonal) => {
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
  };

  diagonalMatrix = (matrix) => {
    let diagonalX = [];
    let diagonalY = [];

    for (let i = 0; i < matrix.length; i++) {
      diagonalX.push(matrix[i][i]);
      diagonalY.push(matrix[i][matrix.length - i - 1]);
    }

    return [diagonalX, diagonalY];
  };

  reverseMatrix = (matrix) => matrix.map((line, i) => line.map((value, j) => matrix[j][i]));

  isFull = (matrix) => matrix.map(line => line.every(value => value !== 0)).every(value => value);

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

    return (
      <div className={`Home ${player.color}`}>
        <div className="modal">
          <form className="content" onSubmit={this.onSubmitPlayerName}>
            <h2>Jogador N1, digite seu nome:</h2>
            <input name="player1" minLength="4" value={playerName1} onChange={updatePlayerName} required/>
            <button type="submit">Continuar</button>
          </form>
        </div>
        <div className="modal">
          <form className="content" onSubmit={this.onSubmitPlayerName}>
            <h2>Jogador N2, digite seu nome:</h2>
            <input name="player2" minLength="4" value={playerName2} onChange={updatePlayerName} required/>
            <button type="submit">Continuar</button>
          </form>
        </div>
        <Header result={this.state.result} playerName={player.name} playerColor={player.color}/>
        <Main>
          <div className="container">
            <div className="data-players">
              <div>
                <div className="player-name">{playerName1}</div>
                <div className="player-victory">Vitorias: {playerVictory1}</div>
              </div>
              <div className="game-count">
                <div>Contador de jogos: {gameCount}</div>
              </div>
              <div>
                <div className="player-name">{playerName2}</div>
                <div className="player-victory">Vitorias: {playerVictory2}</div>
              </div>
            </div>
            <div className="content">
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
              <div onClick={this.resetGameInterface}>Recomeçar!</div>
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
