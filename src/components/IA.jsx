import { TURNS, winners } from '../utils/constants.js';

const checkWinner = (board) => {
    for (const line of winners) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const getAvailableMoves = (board) => {
    return board.reduce((acc, curr, index) => {
        if (curr === null) acc.push(index);
        return acc;
    }, []);
};

const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === TURNS.o) return { score: 10 - depth };
    if (winner === TURNS.x) return { score: depth - 10 };
    if (getAvailableMoves(board).length === 0) return { score: 0 };

    if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove = null;
        for (const move of getAvailableMoves(board)) {
            board[move] = TURNS.o;
            const { score } = minimax(board, depth + 1, false);
            board[move] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        let bestMove = null;
        for (const move of getAvailableMoves(board)) {
            board[move] = TURNS.x;
            const { score } = minimax(board, depth + 1, true);
            board[move] = null;
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return { score: bestScore, move: bestMove };
    }
};

export const getBestMove = (board) => {
    return minimax(board, 0, true).move;
};