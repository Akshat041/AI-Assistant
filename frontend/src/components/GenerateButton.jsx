import { useState } from "react";

export default function MyButton({ onClick, disabled = false }) {
  return (
    <button
      className="generate-response-btn"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "Generating..." : "Generate"}
    </button>
  );
}
