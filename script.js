const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("game-status");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] === null && isGameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkGameState();
      if (isGameActive) {
        currentPlayer = "O";
        setTimeout(aiMove, 500); // AI plays after a short delay
      }
    }
  });
});

// AI move
function aiMove() {
  const availableCells = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);
  if (availableCells.length > 0) {
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    checkGameState();
    if (isGameActive) {
      currentPlayer = "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

// Check game state
function checkGameState() {
  let winner = null;

  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });

  if (winner) {
    isGameActive = false;
    statusText.textContent = `Player ${winner} Wins!`;
    setTimeout(restartGame, 1000); // Restart after 1 second
  } else if (!board.includes(null)) {
    isGameActive = false;
    statusText.textContent = "It's a Tie!";
    setTimeout(restartGame, 1000); // Restart after 1 second
  }
}

// Restart game
function restartGame() {
  board.fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}