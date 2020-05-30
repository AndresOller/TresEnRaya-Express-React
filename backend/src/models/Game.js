// Model of Game
const TOKENS = {
  IA: 'O',
  PLAYER: 'X',
  EMPTY: ''
};

const BOARD_LENGTH = 9;

const modelGame = class Game {
  constructor(board) {
    this.board = board;
  }

  // See if board is array
  checkTypeBoard() {
    return Array.isArray(this.board);
  }

  // See if board is 3X3
  checkBoardLength() {
    return (this.board.length == BOARD_LENGTH) ? true : false;
  }

  // Check if player has won
  checkHasWon() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a];
      }
    }
    return null;
  }

  // Check if Board is full
  isBoardFull() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == TOKENS.EMPTY) {
        return false;
      }
    }

    return true;
  }

  // See if have the correct tokens in board
  checkTokensInBoard() {
    let resp = true;
    this.board.forEach(e => {
      if (e != TOKENS.IA && e != TOKENS.PLAYER && e != TOKENS.EMPTY) {
        resp = false;
      }
    });
    return resp;
  }

  isBoardOk() {
    let resp = true;
    try {
      if (!this.checkTypeBoard()
      || !this.checkTokensInBoard()
      || !this.checkBoardLength()
    ) {
      resp =  false;
    }
    } catch (error) {
      resp =  false;
    }
    
    return resp;
  }

  // Add new Token by IA using Minimax 
  // By https://github.com/gammafp/minimax_tictactoe
  addNewTokenByIA() {
    let position = 0;
    let best = -10;
    let min;
    for (let i = 0; i < BOARD_LENGTH; i++) {
      if (this.board[i] == TOKENS.EMPTY) {
        this.board[i] = TOKENS.IA;
        min = this.min();

        if (min > best) {
          best = this.min();
          position = i;
        }
        this.board[i] = TOKENS.EMPTY;
      }
    }
    this.board[position] = TOKENS.IA;
    return position;
  }

  // Min of Minimax
  min() {
    if (this.checkHasWon() !== null) {
      return 1;
    }
    if (this.isBoardFull()) {
      return 0;
    } else {
      let best = 10;
      let response;
      for (let i = 0; i < this.board.length; i++) {
        if (this.board == TOKENS.EMPTY) {
          this.board[i] = TOKENS.PLAYER;
          response = this.max();
          if (response < best) {
            best = response;
          }
          this.board[i] = TOKENS.EMPTY;
        }
      }
      return best;
    }
  }

  // Max of Minimax
  max() {
    if (this.checkHasWon() !== null) {
      return -1;
    }
    if (this.isBoardFull()) {
      return 0;
    } else {
      let best = 10;
      let response;
      for (let i = 0; i < this.board.length; i++) {
        if (this.board == TOKENS.EMPTY) {
          this.board[i] = TOKENS.IA;
          response = this.min();
          if (response < best) {
            best = response;
          }
          this.board[i] = TOKENS.EMPTY;
        }
      }
      return best;
    }
  }

}

module.exports = modelGame;