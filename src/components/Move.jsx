import React, {useState, useMemo} from 'react';

import {getCurrentScore, initiateGoal, isMoveHasUniqueDigits} from "../util/core.js";

export default function Move({setMove, gameOver, setGameOver}) {

    const [canMove, setCanMove] = useState(false);
    const [gameCount, setGameCount] = useState(0);
    const [currentValue, setCurrentValue] = useState('');
    const [previousValue, setPreviousValue] = useState('');

    const goal = useMemo(() => {
         return initiateGoal();
    },
        [gameCount]
    );

    function takeMove(currentMove)
    {
        const currentScore = getCurrentScore(currentMove, goal);
        setMove({move:currentMove, score:currentScore, id: Math.random() * 1000});

        if (parseInt(currentScore[currentScore.length - 1]) === 4) {
            setGameOver(true);
            setGameCount((prev) => prev + 1);
        }
    }

    function handleClick()
    {
        if (gameOver) {
            setGameOver(false);
        }
        takeMove(currentValue);
        setCurrentValue('');
        setCanMove(false);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setCurrentValue(value);

        if (value && (value.length > 4 || !/\d+$/.test(value) || !isMoveHasUniqueDigits(value))) {
            setCurrentValue(previousValue);
        } else {
            setPreviousValue(value);
        }

        if (value && value.length === 4 && /\d+$/.test(value)) {
            setCanMove(true);
        } else {
            setCanMove(false);
        }
    };

  return (
    <section id="player">
      <p>
        <input value={currentValue} onChange={handleChange} type="text"/>

          <button disabled={!canMove} onClick={handleClick}>Move</button>
      </p>
    </section>
  );
}
