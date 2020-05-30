import React from 'react';
import './Game.css'
import Board from './Board'

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h1 className="title">TRES EN RAYA</h1>
        <Board />
      </div>
    )
  }
}