import React, { useReducer } from "react";
import "../index.css";
import { Board } from "./index";

// board size setting
const SIZE: number = 5;


interface GameState {
    history: { squares: Array<string | null> }[];
    stepNumber: number;
    xIsNext: boolean;
}

interface GameAction {
    type: 'CLICK_SQUARE' | 'JUMP_TO';
    squareIndex?: number;
    stepNumber?: number;
}

const initialState: GameState = {
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'CLICK_SQUARE': {
            const newHistory = state.history.slice(0, state.stepNumber + 1);
            const current = newHistory[newHistory.length - 1];
            // Making copy is important.
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[action.squareIndex!]) {
                return state;
            }
            squares[action.squareIndex!] = state.xIsNext ? 'X' : 'O';
            return {
                ...state,
                history: [...newHistory, { squares }],
                stepNumber: newHistory.length,
                xIsNext: !state.xIsNext,
            };
        }
        case 'JUMP_TO': {
            return {
                ...state,
                stepNumber: action.stepNumber!,
                xIsNext: action.stepNumber! % 2 === 0,
            };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const Game: React.FC = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const { history, stepNumber, xIsNext } = state;

    const handleClick = (i: number) => {
        dispatch({ type: 'CLICK_SQUARE', squareIndex: i });
    };

    const jumpTo = (step: number) => {
        dispatch({ type: 'JUMP_TO', stepNumber: step });
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ? `Go to move #${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={handleClick}
                    size={SIZE}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};


const calculateWinner = (squares: Array<string | null>): string | null => {
    const lines: Array<Array<number>> = [];

    // add horizontal lines
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j <= SIZE - 5; j++) {
            lines.push(Array.from({ length: 5 }, (_, k) => i * SIZE + j + k));
        }
    }

    // add vertical lines
    for (let i = 0; i <= SIZE - 5; i++) {
        for (let j = 0; j < SIZE; j++) {
            lines.push(Array.from({ length: 5 }, (_, k) => (i + k) * SIZE + j));
        }
    }

    // add diagonal lines
    for (let i = 0; i <= SIZE - 5; i++) {
        for (let j = 0; j <= SIZE - 5; j++) {
            lines.push(Array.from({ length: 5 }, (_, k) => (i + k) * SIZE + j + k));
            lines.push(Array.from({ length: 5 }, (_, k) => (i + k) * SIZE + j + 4 - k));
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            return squares[a];
        }
    }

    return null;
};
