import React, {useState, useMemo, useContext} from 'react';

import {getCurrentScore, initiateGoal, isMoveHasUniqueDigits} from "../util/core.js";
import {GameContext} from "../store/game-context.jsx";

export default function Move({setMove, gameOver, setGameOver}) {
    const [canMove, setCanMove] = useState(false);
    const [currentValue, setCurrentValue] = useState('');
    const [previousValue, setPreviousValue] = useState('');

    const {size, gameCount} =  useContext(GameContext);

    const goal = useMemo(() => {
         return initiateGoal(size);
    },
        [gameCount, size]
    );

    function takeMove(currentMove)
    {
        const currentScore = getCurrentScore(currentMove, goal);
        setMove({move:currentMove, score:currentScore, id: Math.random() * 1000});

        if (parseInt(currentScore[currentScore.length - 1]) === size) {
            setGameOver(true);
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

        if (value && (value.length > size || !/\d+$/.test(value) || !isMoveHasUniqueDigits(value))) {
            setCurrentValue(previousValue);
        } else {
            setPreviousValue(value);
        }

        if (value && value.length === size && /\d+$/.test(value)) {
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
