
import React, { Component } from 'react'

import './App.css';

const ROW = 20, COL = 20;

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );

}

function calculateWinner(squares) {
  for (var i = 0; i < squares.length; i++) {
    if (squares[i]) {
      if (checkCol(parseInt(i / COL, 10), parseInt(i % COL, 10), squares) ||
        checkRow(parseInt(i / COL, 10), parseInt(i % COL, 10), squares) ||
        checkDiagonal1(parseInt(i / COL, 10), parseInt(i % COL, 10), squares) ||
        checkDiagonal2(parseInt(i / COL, 10), parseInt(i % COL, 10), squares)
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkCol(row, col, arr) {
  if (row > ROW - 5) {
    return false;
  }
  let count;

  for (count = 1; count < 5; count++) {
    if (arr[(row + count) * COL + col] !== arr[row * COL + col]) {
      return false;
    }
  }
  //chặn bởi biên
  if (row === 0 || (row + count) === COL) {
    return true;
  }
  //không chặn 2 đầu
  if (arr[(row - 1) * COL + col] === null || arr[(row + count) * COL + col] === null) {
    return true;
  }
  return false;
}

function checkRow(row, col, arr) {
  if (col > COL - 5) {
    return false;
  }
  let count;

  for (count = 1; count < 5; count++) {
    if (arr[row * COL + (col + count)] !== arr[row * COL + col]) {
      return false;
    }

  }
  //chặn bởi biên
  if (col === 0 || (col + count) === COL) {
    return true;
  }
  //không chặn 2 đầu
  if (arr[row * COL + (col - 1)] === null || arr[row * COL + (col + count)] === null) {
    return true;
  }
  return false;
}


// cheo \
function checkDiagonal1(row, col, arr) {
  if (row > COL - 5 || col > COL - 5) {
    return false;
  }
  let count;

  for (count = 1; count < 5; count++) {
    if (arr[(row + count) * COL + (col + count)] !== arr[row * COL + col]) {
      return false;
    }

  }
  if (row === 0 || (row + count) === ROW || col === 0 || (col + count) === COL) {
    return true;
  }
  if (arr[(row - 1) * COL + (col - 1)] === null || arr[(row + count) * COL + (col + count)] === null) {
    return true;
  }
  return false;
}

// cheo /
function checkDiagonal2(row, col, arr) {
  if (row < 4 || col > COL - 5) {
    return false;
  }
  let count;

  for (count = 1; count < 5; count++) {
    if (arr[(row - count) * COL + (col + count)] !== arr[row * COL + col]) {
      return false;
    }
  }
  if (row === 4 || row === (ROW - 1) || col === 0 || (col + count) === COL) {
    return true;
  }
  if (arr[(row + 1) * COL + (col - 1)] === null || arr[(row - count) * COL + (col + count)] === null) {
    return true;
  }
  return false;
}



class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(400).fill(null),
      xIsNext: true,
      status: false,
      winner: null,
    };
  }


  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] && calculateWinner(squares) === false) {
      return;
    }
    if (this.state.status === true) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    var winner = squares[i]
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: winner,
    });
    if (squares[i] && calculateWinner(squares)) {
      console.log('winner');

      this.setState({ status: true, });

      return;
    }


  }

  newGame() {
    this.setState({
      squares: Array(400).fill(null),
      xIsNext: true,
      status: false,
      winner: null,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} />
    );
  }


  render() {
    const status = calculateWinner(this.state.squares) === false ? 'Next player: ' + (this.state.xIsNext ? 'X' : 'O') : 'The Winner is: ' + this.state.winner;
    let numbers = [];
    for (let i = 0; i < 400; i++) {
      numbers.push(i);
    }
    let list = numbers.map(number => (
      this.renderSquare(number)
    ));

    return (
      <div>
        <div className="status">{status}</div>

        <div>
          <button onClick={() => this.newGame()}>New Game</button>
        </div>
        <div className="board-row" >
          {list}
        </div>
       
      </div>

    )
  }

}
class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board></Board>
        </div>
        <div className="game-info">

        </div>
      </div>
    );
  }
}



export default Game;
