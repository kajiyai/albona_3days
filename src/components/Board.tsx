import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { Square } from "./Square"

interface BoardProps {
    squares: Array<string | null>;
    onClick: (i: number) => void;
    size: number;
}

export const Board: React.FC<BoardProps> = ({ squares, onClick, size }) => {
    const renderSquare = (i: number) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    };

    const boardRows = Array(size)
        .fill(null)
        .map((_, i) => (
            <div key={i} className="board-row">
                {Array(size)
                    .fill(null)
                    .map((_, j) => renderSquare(i * size + j))}
            </div>
        ));


    return (
        <div>{boardRows}</div>
    );
}


