import React, {useState} from "react";
import {Timer} from "./Timer";
import {useAppSelector} from "../store/hooks.ts";

export const TimerHandler: React.FC<{setTimeResult: (time:number) => void}> = (props) => {
    const [time, setTime] = useState(0);
    const gameOver = useAppSelector((state) => state.move.gameOver);
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
        props.setTimeResult(time);
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