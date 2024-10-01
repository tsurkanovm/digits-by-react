import {useRef, useState} from "react";
import {Timer} from "./Timer.jsx";

export function TimerHandler({gameOver, setTimeResult}) {
    const [time, setTime] = useState(0);
    let timer = null;

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