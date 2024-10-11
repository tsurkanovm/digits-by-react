import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {GameContext} from "../store/game-context.jsx";
import {getCurrentScore, initiateGoal} from "../util/core.js";

const MoveForm = ({setMove, gameOver, setGameOver}) => {
    const {size, gameCount} =  useContext(GameContext);
    const [values, setValues] = useState([]);
    const [errorPointer, setErrorPointer] = useState(null);
    const inputsRef = useRef([]);

    useEffect(() => {
        setValues(Array(size).fill(''));
    }, [size]);

    function setFocus(ind) {
        inputsRef.current[ind].setAttribute("tabindex", "0");
        inputsRef.current[ind].focus();
    }

    useEffect(() => {
        setTimeout(() => { // needs to be sure that all DOM is loaded
            setFocus(0); // set focus to the first input
        }, 0);
    }, []);

    function validateMove(newValues) {
        let errorMsg = '';
        let inputIndex = null;
        const uniqueValues = new Set();
        for (inputIndex = 0; inputIndex < size; inputIndex++) {
            if (newValues[inputIndex] === '') {
                continue;
            }

            if (!/^[0-9]$/.test(newValues[inputIndex])) {
                errorMsg = 'All inputs must be a single digit number.';
                break;
            } else if (uniqueValues.has(newValues[inputIndex])) {
                errorMsg = 'All inputs must contain unique single digit numbers.';
                break;
            } else {
                uniqueValues.add(newValues[inputIndex]);
            }
        }

        if (errorMsg) {
            setErrorPointer(
                {
                    errorMsg: errorMsg,
                    inputIndex: inputIndex,
                }
            );
        } else if (errorPointer) {
            setErrorPointer(null);
        }
    }

    const handleChange = (index, event) => {
        const value = event.target.value;
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        validateMove(newValues);
        if (value) {
            setFocus(index + 1);
        }
    };

    function isMoveIncomplete() {
        return values.some(value => value === '');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isMoveIncomplete() && errorPointer === null) {
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
        if (errorPointer === null || errorPointer.inputIndex === index) {
            return false;
        }

        for (let i = 0; i < size; i++) {
            if (errorPointer.inputIndex < i) {
                return true;
            }
        }

        return false;
    };

    function isMoveBtnDisabled() {
        return errorPointer !== null || isMoveIncomplete();
    }

    function isInputHasError(index, value) {
        return value !== '' && errorPointer && errorPointer.inputIndex === index;
    }

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !event.target.value && index > 0) {
            setFocus(index - 1);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <section id="player">
                <div className="inputs-wrapper">
                    {values.map((value, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength="1"
                            required
                            disabled={isInputDisabled(index)}
                            className={isInputHasError(index, value) ? 'error-border' : null}
                        />
                    ))}
                </div>
                {errorPointer && (
                    <div className="error-wrap">
                        {errorPointer.errorMsg}
                    </div>
                )}
                <button className="action-btn" type="submit" disabled={isMoveBtnDisabled()}>Move</button>
            </section>
        </form>
    );
};

export default MoveForm;