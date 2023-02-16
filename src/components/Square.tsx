import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

