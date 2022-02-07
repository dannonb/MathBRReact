import React, { useState } from "react";

import Wrapper from "../../components/Wrapper/Wrapper";
import Screen from "../../components/Screen/Screen";
import ButtonBox from "../../components/ButtonBox/ButtonBox";
import Button from "../../components/Button/Button";
import Score from "../../components/Score/Score";
import Question from "../../components/Question/Question";

const btnValues = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [ 0, "Send"],
];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const NumberPad = () => {
    let [number, setNumber] = useState(0)
    let [score, setScore] = useState(0)

    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(number.num).length < 16) {
            setNumber({
                ...number,
                num:
                    number.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(number.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(number + value)))
                            : toLocaleString(number.num + value),
                res: !number.sign ? 0 : number.res,
            });
        }
    };

    const resetClickHandler = () => {
        setNumber(0);
    };

    return (
        <Wrapper>
            <Score score={score && score} playerCount={3} />
            <Question question={"523 + 354"} />
            <Screen value={number && number} />
            <ButtonBox>
                {btnValues.flat().map((btn, i) => {
                    return (
                        <Button
                            key={i}
                            className={btn === "Send" ? "equals" : ""}
                            value={btn}
                            onClick={numClickHandler}
                        />
                    );
                })}
            </ButtonBox>
        </Wrapper>
    )
}

export default NumberPad