import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Home.css';

import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import Footer from '../../components/footer/Footer';

import {
  updatePlayerName,
  updatePlayerTurn,
  updatePlayerVictory,
  updateGameCount,
  updateMatrix
} from "../../modules/tictactoe";

class Home extends Component {
  onClickBlock = (e, i, j) => {
    if (!this.props.matrix[i][j]) {
      let matrix = this.props.matrix;
      let playerTurn = this.props.playerTurn;

      e.target.classList.add("player" + playerTurn);

      matrix[i][j] = playerTurn;
      this.props.updateMatrix(matrix);

      this.gameController(matrix);

      playerTurn = playerTurn === 1 ? 2 : 1;
      this.props.updatePlayerTurn(playerTurn);
    } else {
      console.log("não pode");
    }
  };

  gameController = (matrix) => {
    let result = this.verifyLine(matrix, false, false) || this.verifyLine(this.reverseMatrix(matrix), true, false) || this.verifyLine(this.diagonalMatrix(matrix), false, true);

    if (result) {
      let winnerLine = document.querySelector(".winner-line");

      if (result.winner === 1) {
        console.log(this.props.playerName1);
        let playerVictory1 = this.props.playerVictory1;
        playerVictory1++;
        this.props.updatePlayerVictory("player1", playerVictory1);
      } else {
        console.log(this.props.playerName2);
        let playerVictory2 = this.props.playerVictory2;
        playerVictory2++;
        this.props.updatePlayerVictory("player1", playerVictory2);
      }

      if (result.isReverse) {
        winnerLine.classList.add("reverse");
      } else if (result.isDiagonal) {
        winnerLine.classList.add("diagonal");
      } else {
        winnerLine.classList.add("normal");
      }
      winnerLine.classList.add("index" + result.lineIndex);
    } else if (this.isFull(matrix)) {
      console.log("empate");
    }

    if(result || this.isFull(matrix)){
      let gameCount = this.props.gameCount;
      gameCount++;
      this.props.updateGameCount(gameCount);
      this.props.updateMatrix(null);
    }
  };

  resetGameInterface = () => {
    let winnerLine = document.querySelector(".winner-line");
    winnerLine.className = "winner-line";
    [...document.querySelectorAll(".value")].map(element => element.className = "value");
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

  isFull = (matrix) => matrix.map(line => line.every(value => value !== 0)).every(value => value === true);

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
    return (
      <div className="Home">
        <Header/>
        <Main>
          {/* <input name="player1" value={playerName1} onChange={updatePlayerName}/>  */}
          {/* <input name="player2" value={playerName2} onChange={updatePlayerName}/> */}
          <div className="container">
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
          </div>
        </Main>
        <Footer/>
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