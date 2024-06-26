
class TicTacToe {
    private board: string[];
    private currentPlayer: string;
    private winner: string | null;
    private isSinglePlayer: boolean;

    constructor(isSinglePlayer: boolean = false) {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.winner = null;
        this.isSinglePlayer = isSinglePlayer;
    }

    public getBoard(): string[] {
        return this.board;
    }

    public getCurrentPlayer(): string {
        return this.currentPlayer;
    }

    public getWinner(): string | null {
        return this.winner;
    }

    public makeMove(index: number): void {
        if (!this.isCellEmpty(index) || this.winner) return;

        this.board[index] = this.currentPlayer;

        if (this.checkWinner()) {
            this.winner = this.currentPlayer;
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }

        if (this.isSinglePlayer && this.currentPlayer === 'O') {
            this.makeComputerMove();
        }
    }

    public resetGame(): void {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.winner = null;
    }

    private isCellEmpty(index: number): boolean {
        return this.board[index] === '';
    }

    private checkWinner(): boolean {
        const winningCombos: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return true;
            }
        }

        return false;
    }

    private makeComputerMove(): void {
        const emptyCells: number[] = [];
        this.board.forEach((cell, index) => {
            if (cell === '') {
                emptyCells.push(index);
            }
        });

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
       setTimeout(() => {
this.makeMove(emptyCells[randomIndex]);
        render();
    }, 250); 
    }
}

let ticTacToe: TicTacToe | null = null;

const gameModeElement = document.getElementById('game-mode')!;
const boardElement = document.getElementById('board')!;
const statusElement = document.getElementById('status')!;
const resetButton = document.getElementById('reset-button')!;

function startTwoPlayerGame() {
    ticTacToe = new TicTacToe(false);
    setupGame();
    showResetButton();
}

function startSinglePlayerGame() {
    ticTacToe = new TicTacToe(true);
    setupGame();
    showResetButton();
}

function showResetButton() {
    document.getElementById('reset-button')!.style.display = 'block';
}

function setupGame() {
    gameModeElement.style.display = 'none';
    render();
}

function render() {
    boardElement.innerHTML = '';
    ticTacToe!.getBoard().forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.textContent = cell;
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', () => {
            if (!ticTacToe!.getWinner()) {
                ticTacToe!.makeMove(index);
                render();
            }
        });
        boardElement.appendChild(cellElement);
    });

    if (ticTacToe!.getWinner()) {
        statusElement.textContent = `Победитель: ${ticTacToe!.getWinner()}`;
    } else if (ticTacToe!.getBoard().every(cell => cell !== '')) {
        statusElement.textContent = 'Ничья!';
    } else {
        statusElement.textContent = `Текущий игрок: ${ticTacToe!.getCurrentPlayer()}`;
    }
}

function resetGame() {
    gameModeElement.style.display = 'block';
    boardElement.innerHTML = '';
    statusElement.textContent = '';
    ticTacToe = null;
    resetButton.style.display = 'none';
}



document.getElementById('two-player')!.addEventListener('click', startTwoPlayerGame);
document.getElementById('single-player')!.addEventListener('click', startSinglePlayerGame);
resetButton.addEventListener('click', resetGame);