document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");

    let currentPlayer = "X";
    let gameActive = true;

    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                gameActive = false;
                status.innerText = `Player ${currentPlayer} wins!`;
                break;
            }
        }

        if (!gameActive) return;

        if (![...cells].some(cell => !cell.innerText)) {
            gameActive = false;
            status.innerText = "It's a draw!";
        }
    };

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = parseInt(cell.dataset.index);

        if (!gameActive || cell.innerText !== "") return;

        cell.innerText = currentPlayer;
        cell.classList.add(`player-${currentPlayer.toLowerCase()}`);

        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.innerText = `Player ${currentPlayer}'s turn`;
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
});
