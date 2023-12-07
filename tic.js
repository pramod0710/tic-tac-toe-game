let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
    let currentPlayer = 'X';
    let gameActive = true;
    
    function drawBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
    
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.onclick = handleCellClick;
    
                cell.textContent = board[row][col];
                boardElement.appendChild(cell);
            }
        }
    }
    
    function handleCellClick(event) {
        if (!gameActive) {
            return;
        }
    
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
    
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            event.target.textContent = currentPlayer;
    
            if (checkWinner()) {
                document.getElementById('result').textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (isBoardFull()) {
                document.getElementById('result').textContent = "It's a tie!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }
    
    function checkWinner() {
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (
                (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) ||
                (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer)
            ) {
                return true;
            }
        }
    
        // Check diagonals
        if (
            (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
            (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
        ) {
            return true;
        }
    
        return false;
    }
    
    function isBoardFull() {
        return board.every(row => row.every(cell => cell !== ''));
    }
    
    function resetGame() {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = 'X';
        gameActive = true;
        document.getElementById('result').textContent = '';
        drawBoard();
    }
    
    drawBoard();
    