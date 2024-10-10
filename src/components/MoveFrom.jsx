import React, {useContext, useEffect, useMemo, useState} from 'react';
import {GameContext} from "../store/game-context.jsx";
import {getCurrentScore, initiateGoal} from "../util/core.js";

const MoveForm = ({setMove, gameOver, setGameOver}) => {
    const {size, gameCount} =  useContext(GameContext);
    const [values, setValues] = useState([]);
    const [errors, setErrors] = useState('');
    const [invalidIndex, setInvalidIndex] = useState(null);

    useEffect(() => {
        setValues(Array(size).fill(''));
    }, [size]);

    function validateMove(newValues) {
        let newError = '';
        let newInvalidIndex = null;
        const uniqueValues = new Set();
        for (let i = 0; i < size; i++) {
            if (newValues[i] === '') {
                continue;
            }

            if (!/^[0-9]$/.test(newValues[i])) {
                newInvalidIndex = i;
                newError = 'All inputs must be a single digit number.';
                break;
            } else if (uniqueValues.has(newValues[i])) {
                newInvalidIndex = i;
                newError = 'All inputs must contain unique single digit numbers.';
                break;
            } else {
                uniqueValues.add(newValues[i]);
            }
        }

        setErrors(newError);
        setInvalidIndex(newInvalidIndex);
    }

    const handleChange = (index, event) => {
        const value = event.target.value;
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        validateMove(newValues);
    };

    function isMoveIncomplete() {
        return values.some(value => value === '');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //validateMove(values);
        if (isMoveIncomplete() || invalidIndex !== null) {
            setErrors('All inputs must be filled with a unique single digit number.');
        } else {
            if (gameOver) {
                setGameOver(false);
            }
            takeMove(values.join(''));
            setValues(Array(size).fill(''));
        }
    };

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

    const isInputDisabled = (index) => {
        if (invalidIndex === null || invalidIndex === index) {
            return false;
        }

        for (let i = 0; i < size; i++) {
            if (invalidIndex < i) {
                return true;
            }
        }

        return false;
    };

    function isMoveBtnDisabled() {
        return invalidIndex !== null || isMoveIncomplete();
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <section id="player">
                <div className="inputs-wrapper">
                    {values.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(index, e)}
                            maxLength="1"
                            required
                            disabled={isInputDisabled(index)}
                            style={{
                                borderColor: invalidIndex === index && value !== '' ? 'red' : 'initial'
                            }}
                        />
                    ))}
                </div>
                {errors && (
                    <div className="error-wrap">
                        {errors}
                    </div>
                )}
                <button className="action-btn" type="submit" disabled={isMoveBtnDisabled()}>Move</button>
            </section>
        </form>
    );
};

export default MoveForm;