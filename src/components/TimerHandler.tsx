import React, {useState} from "react";
import {Timer} from "./Timer";

type TimerHandlerProp = {
    gameOver: boolean,
    setTimeResult: (time:number) => void
};

export const TimerHandler: React.FC<TimerHandlerProp> = ({gameOver, setTimeResult}) => {
    const [time, setTime] = useState(0);
    let timer: number|undefined;

    function handleStart() {
        timer = setInterval(
            () => {
                setTime(
                    (prevTime) => prevTime + 1
                );
            }, 1000
        )
    }
    function handleStop() {
        clearInterval(timer);
        setTimeResult(time);
    }

    if (gameOver) {
        handleStop();
    }

    if (time === 0 && !gameOver) {
        handleStart();
    }

    return (
        <Timer time={time}/>
    );
}