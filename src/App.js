
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
      if (duyetDoc(parseInt(i / COL, 10), parseInt(i % COL, 10), squares) ||
        duyetNgang(parseInt(i / COL, 10), parseInt(i % COL, 10), squares) ||
        duyetCheoXuoi(parseInt(i / COL, 10), parseInt(i % COL, 10), squares) ||
        duyetCheoNguoc(parseInt(i / COL, 10), parseInt(i % COL, 10), squares)
      ) {
        return true;
      }
    }
  }
  return false;
}

function duyetDoc(dong, cot, arr) {
  if (dong > ROW - 5) {
    return false;
  }
  let dem;

  for (dem = 1; dem < 5; dem++) {
    if (arr[(dong + dem) * COL + cot] !== arr[dong * COL + cot]) {
      return false;
    }
  }
  //chặn bởi biên
  if (dong === 0 || (dong + dem) === COL) {
    return true;
  }
  //không chặn 2 đầu
  if (arr[(dong - 1) * COL + cot] === null || arr[(dong + dem) * COL + cot] === null) {
    return true;
  }
  return false;
}

function duyetNgang(dong, cot, arr) {
  if (cot > COL - 5) {
    return false;
  }
  let dem;

  for (dem = 1; dem < 5; dem++) {
    if (arr[dong * COL + (cot + dem)] !== arr[dong * COL + cot]) {
      return false;
    }

  }
  //chặn bởi biên
  if (cot === 0 || (cot + dem) === COL) {
    return true;
  }
  //không chặn 2 đầu
  if (arr[dong * COL + (cot - 1)] === null || arr[dong * COL + (cot + dem)] === null) {
    return true;
  }
  return false;
}


// cheo \
function duyetCheoXuoi(dong, cot, arr) {
  if (dong > COL - 5 || cot > COL - 5) {
    return false;
  }
  let dem;

  for (dem = 1; dem < 5; dem++) {
    if (arr[(dong + dem) * COL + (cot + dem)] !== arr[dong * COL + cot]) {
      return false;
    }

  }
  if (dong === 0 || (dong + dem) === ROW || cot === 0 || (cot + dem) === COL) {
    return true;
  }
  if (arr[(dong - 1) * COL + (cot - 1)] === null || arr[(dong + dem) * COL + (cot + dem)] === null) {
    return true;
  }
  return false;
}

// cheo /
function duyetCheoNguoc(dong, cot, arr) {
  if (dong < 4 || cot > COL - 5) {
    return false;
  }
  let dem;

  for (dem = 1; dem < 5; dem++) {
    if (arr[(dong - dem) * COL + (cot + dem)] !== arr[dong * COL + cot]) {
      return false;
    }
  }
  if (dong === 4 || dong === (ROW - 1) || cot === 0 || (cot + dem) === COL) {
    return true;
  }
  if (arr[(dong + 1) * COL + (cot - 1)] === null || arr[(dong - dem) * COL + (cot + dem)] === null) {
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
