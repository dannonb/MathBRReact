import React from "react";
import { Textfit } from "react-textfit";
import "./Score.css";

const Score = ({ playerCount, score }) => {
  return (
    <div className="score">
      <div>
        Score: {score}
      </div>
      <div>
        Players: {playerCount}
      </div>
    </div>
  );
};

export default Score;