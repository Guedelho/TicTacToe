import React, { Component } from 'react';
import {connect} from 'react-redux';

import './Home.css';

import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import Footer from '../../components/footer/Footer';

import {updatePlayerName, updatePlayerTurn, updateMatrix} from "../../modules/tictactoe";

class Home extends Component {

  onClickBlock = (e, i, j) => {
    if(!this.props.matrix[i][j]) {
      let matrix = this.props.matrix;
      let playerTurn = this.props.playerTurn;

      e.target.classList.add("player" + playerTurn);

      matrix[i][j] = playerTurn;
      this.props.updateMatrix(matrix);

      this.gameController(matrix, playerTurn);

      playerTurn = playerTurn === 1 ? 2:1;
      this.props.updatePlayerTurn(playerTurn);
    } else {
      console.log("não pode");
    }
  };

  gameController = (matrix, playerTurn) => {
    let result = this.verifyLine(matrix, false, false) || this.verifyLine(this.reverseMatrix(matrix), true, false) || this.verifyLine(this.diagonalMatrix(matrix), false, true);
    
    if(result){
      if(result.winner === 1){
        console.log(this.props.playerName1);
      } else {
        console.log(this.props.playerName2);
      }
      console.log(result);
    } else if (this.isFull(matrix)) {
      console.log("empate");
    }
  };

  verifyLine = (matrix, isReverse, isDiagonal) => {
    for(let i = 0; i < matrix.length; i++){
      if(matrix[i].every((value) => value === 1) || matrix[i].every((value) => value === 2)){
        return {
          winner: matrix[i][0],
          lineIndex: i,
          isReverse: isReverse,
          isDiagonal: isDiagonal
        };
      }
    }
  }

  diagonalMatrix = (matrix) => {
    let diagonalX = [];
    let diagonalY = [];

    for(let i = 0; i < matrix.length; i++) {
      diagonalX.push(matrix[i][i]);
      diagonalY.push(matrix[i][matrix.length - i - 1]);
    }

    return [diagonalX, diagonalY];
  }

  reverseMatrix = (matrix) => matrix.map((line, i) => line.map((value, j) => matrix[j][i]));

  isFull = (matrix) => matrix.map(line => line.every(value => value !== 0)).every(value => value === true);

  render() {
    const {playerName1, playerName2, updatePlayerName, matrix} = this.props;
    return (
      <div className="Home">
        <Header />
        <Main>
          {/* <h1>TicTacToe</h1> */}
          {/* <input name="player1" value={playerName1} onChange={updatePlayerName}/>  */}
          {/* <input name="player2" value={playerName2} onChange={updatePlayerName}/> */}
          <div className="container">
            <div className="matrix">
              {matrix.map((line, i) => (
                line.map((value, j) => (
                  <div key={i + "" + j} className="value" onClick={(e) => this.onClickBlock(e, i, j)}></div>
                ))
              ))}
            </div>
          </div>
        </Main>
        <Footer />
      </div>
    );
  }
}

const initMapStateToProps = state => ({
  playerName1: state.tictactoe.playerName1,
  playerName2: state.tictactoe.playerName2,
  playerTurn: state.tictactoe.playerTurn,
  matrix: state.tictactoe.matrix
});

const initMapDispatchToProps = dispatch => ({
  updatePlayerName: (e) => dispatch(updatePlayerName(e.target)),
  updatePlayerTurn: (playerTurn) => dispatch(updatePlayerTurn(playerTurn)),
  updateMatrix: (matrix) => dispatch(updateMatrix(matrix))
});

export default connect(initMapStateToProps, initMapDispatchToProps)(Home);