import React from 'react';
import axios from 'axios';
import './Board.css'
import Square from './Square'

const DEFAULT_STATE = {
  squares: Array(9).fill(''),
  xIsNext: true,
  winner: null,
  endGame: false
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  async handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    if (this.state.squares[i] || this.state.endGame) {
      return;
    }
    await this.getStatus(squares);
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    if (!this.state.xIsNext) {
      const iaClick = await this.getNextTokenByIA();
      await new Promise(resolve => setTimeout(resolve, 300));
      this.handleClick(iaClick);
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  async getStatus(squares) {
    const board = {
      board: squares
    }
    const status = await axios.post('http://localhost:4000/api/game/status', board);
    this.setState({
      winner: status.data.status.winner,
      endGame: status.data.status.endGame
    })
  }

  async getNextTokenByIA() {
    const board = {
      board: this.state.squares
    }
    const newPosition = await axios.post('http://localhost:4000/api/game/IAToken', board);

    return newPosition.data.newPosition;
  }

  resetBoard() {
    this.setState(DEFAULT_STATE);
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Ganador ' + this.state.winner;
    }
    else if (this.state.endGame) {
      status = 'Empate';
    }
    else {
      status = 'Juega ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="board">
        <div className="board-status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className="reset-game" onClick={() => this.resetBoard()}>REINCIAR PARTIDA</button>
      </div>
    );
  }
}