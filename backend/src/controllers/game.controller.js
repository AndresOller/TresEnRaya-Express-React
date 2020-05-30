// Controller of Game
const gameCtrl = {};
const Game = require('../models/Game');

// Get board with a new token
gameCtrl.getIAToken = async (req, res) => {
  const { board } = req.body;
  const game = new Game(board);

  if (!game.isBoardOk()) {
    res.status(400);
    res.json({message: 'Error in board'});
    return;
  }

  const newPosition = game.addNewTokenByIA();

  res.json({ newPosition });
};

// Get board with a new token
gameCtrl.getStatus = async (req, res) => {
  const { board } = req.body;
  const game = new Game(board);

  if (!game.isBoardOk()) {
    res.status(400);
    res.json({message: 'Error in board'});
    return;
  }

  let winner = game.checkHasWon();
  let endGame = game.isBoardFull() || (winner !== null);

  let status = {
    winner: winner,
    endGame: endGame
  };

  // Response
  res.json({ status });
};

module.exports = gameCtrl;