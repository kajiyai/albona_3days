import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Game } from "./components/index"

// ========================================

const element = document.getElementById("root");
if (element) {
  const root = ReactDOM.createRoot(element);
  root.render(<Game />);
}

// ========================================
