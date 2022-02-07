import React from "react";
import { Textfit } from "react-textfit";
import "./Question.css";

const Question = ({ question }) => {
  return (
    <Textfit className="question" mode="single" max={50}>
      {question}
    </Textfit>
  );
};

export default Question;