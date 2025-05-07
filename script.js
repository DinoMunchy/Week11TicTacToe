// Wait for the DOM to be fully loaded before initializing the game
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const gameGrid = document.getElementById('game-grid');
    const cells = document.querySelectorAll('.cell');
    const turnDisplay = document.getElementById('turn-display');
    const resetButton = document.getElementById('reset-button');
    const alertContainer = document.getElementById('alert-container');
    const alertMessage = document.getElementById('alert-message');
    const scoreX = document.getElementById('score-x');
    const scoreO = document.getElementById('score-o');

    // Game state variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board array
    let gameActive = true;
    let scores = { X: 0, O: 0 }; // Track scores for both players

    // All possible winning combinations (rows, columns, and diagonals)
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Handle cell click events
    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        // Ignore clicks if cell is already filled or game is not active
        if (gameBoard[index] !== '' || !gameActive) return;

        // Update game state
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        // Check for win
        if (checkWin()) {
            scores[currentPlayer]++;
            updateScores();
            showAlert(`${currentPlayer} wins!`, 'success');
            gameActive = false;
            return;
        }

        // Check for draw
        if (checkDraw()) {
            showAlert("It's a draw!", 'warning');
            gameActive = false;
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `${currentPlayer}'s Turn`;
    }

    // Check if current player has won
    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    // Check if the game is a draw (all cells filled)
    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    // Display alert message with specified type (success/warning)
    function showAlert(message, type) {
        const alert = alertContainer.querySelector('.alert');
        alert.className = `alert alert-${type}`;
        alertMessage.textContent = message;
        alertContainer.style.display = 'block';
    }

    // Update score display
    function updateScores() {
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
    }

    // Reset game state
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        turnDisplay.textContent = "X's Turn";
        alertContainer.style.display = 'none';
        
        // Clear all cells
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }

    // Add click event listeners to all cells
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Add click event listener to reset button
    resetButton.addEventListener('click', resetGame);
}); 