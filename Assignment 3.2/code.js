document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('board');
    const startButton = document.getElementById('startButton');
    const boardSize = 8;
    let selectedPiece = null;
    let selectedCell = null;

    function createBoard() {
        board.innerHTML = ''; // Clear any existing board cells
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
        }
        initializePieces(); // Initialize pieces after creating the board
    }

    function initializePieces() {
        const cells = Array.from(document.querySelectorAll('.cell'));
        cells.forEach((cell, index) => {
            cell.innerHTML = ''; // Clear any existing pieces
            const row = Math.floor(index / boardSize);
            const col = index % boardSize;

            if ((row + col) % 2 === 1) { // Only place pieces on dark squares
                if (row < 3) cell.innerHTML = '<div class="red-piece"></div>';
                if (row > 4) cell.innerHTML = '<div class="black-piece"></div>';
            }
        });
    }

    function selectPiece(piece, cell) {
        if (piece.classList.contains('red-piece') || piece.classList.contains('black-piece')) {
            clearSelection(); // Clear any previous selection
            selectedPiece = piece;
            selectedCell = cell;
            cell.classList.add('selected');
        }
    }

    function clearSelection() {
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }
        selectedPiece = null;
        selectedCell = null;
    }

    function isValidMove(piece, targetCell) {
        const pieceColor = piece.classList.contains('red-piece') ? 'red' : 'black';
        const fromIndex = Array.from(document.querySelectorAll('.cell')).indexOf(selectedCell);
        const toIndex = Array.from(document.querySelectorAll('.cell')).indexOf(targetCell);

        const fromRow = Math.floor(fromIndex / boardSize);
        const fromCol = fromIndex % boardSize;
        const toRow = Math.floor(toIndex / boardSize);
        const toCol = toIndex % boardSize;

        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);

        // Check if target cell is empty
        if (targetCell.hasChildNodes()) {
            return false;
        }

        // Check for a simple move (diagonal move)
        if (rowDiff === 1 && colDiff === 1) {
            return true;
        }

        // Check for a capture move
        if (rowDiff === 2 && colDiff === 2) {
            const midRow = (fromRow + toRow) / 2;
            const midCol = (fromCol + toCol) / 2;
            const midCellIndex = midRow * boardSize + midCol;
            const midCell = document.querySelectorAll('.cell')[midCellIndex];
            const capturedPiece = midCell.querySelector('.red-piece, .black-piece');
            
            if (capturedPiece && capturedPiece.classList.contains(pieceColor === 'red' ? 'black-piece' : 'red-piece')) {
                return true;
            }
        }

        return false;
    }

    function movePiece(piece, targetCell) {
        const fromIndex = Array.from(document.querySelectorAll('.cell')).indexOf(selectedCell);
        const toIndex = Array.from(document.querySelectorAll('.cell')).indexOf(targetCell);

        // Check for a capture move
        if (Math.abs(toIndex - fromIndex) === 18) { // Assuming normal diagonal move plus one extra diagonal for capture
            const midIndex = (fromIndex + toIndex) / 2;
            const midCell = document.querySelectorAll('.cell')[midIndex];
            midCell.innerHTML = ''; // Remove the captured piece
        }

        targetCell.innerHTML = '';
        targetCell.appendChild(piece);
        if (isPromotion(piece)) promotePiece(piece);
    }

    function isPromotion(piece) {
        const index = Array.from(document.querySelectorAll('.cell')).indexOf(piece.parentNode);
        const row = Math.floor(index / boardSize);
        return (piece.classList.contains('red-piece') && row === boardSize - 1) ||
               (piece.classList.contains('black-piece') && row === 0);
    }

    function promotePiece(piece) {
        piece.classList.add('king');
    }

    function checkWinCondition() {
        const redPieces = document.querySelectorAll('.red-piece');
        const blackPieces = document.querySelectorAll('.black-piece');
        if (redPieces.length === 0) {
            alert('Black wins!');
            createBoard(); // Reset the board
        } else if (blackPieces.length === 0) {
            alert('Red wins!');
            createBoard(); // Reset the board
        }
    }

    function showMessage(message) {
        alert(message); // Display a message using the alert function
    }

    // Event listener for the Start button
    startButton.addEventListener('click', () => {
        createBoard();
        clearSelection();
        showMessage('The game has started!'); // Show message when the game starts
    });

    // Event listener for cell clicks
    document.getElementById('board').addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            const cell = e.target;
            const piece = cell.querySelector('.red-piece, .black-piece');
            if (selectedPiece) {
                if (isValidMove(selectedPiece, cell)) {
                    movePiece(selectedPiece, cell);
                    checkWinCondition(); // Check for a win condition after a move
                }
                clearSelection();
            } else if (piece) {
                selectPiece(piece, cell);
            }
        }
    });
});