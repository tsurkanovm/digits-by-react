import {Results} from "./Results.jsx";
import Move from "./Move.jsx";
import {useCallback, useRef, useState} from "react";
import {TimerHandler} from "./TimerHandler.jsx";
import {Timer} from "./Timer.jsx";
import ResultModal from "./ResultModal.jsx";
import {Sizer} from "./Sizer.jsx";


export const GameBoard = () => {
    const [movesArray, setMove] = useState([]);
    const [gameOver, setGameOver] = useState(true);
    const [timeResult, setTimeResult] = useState(0);
    const resDialog = useRef();

    //unique Id
    const setNewMove = useCallback((newMove) => {
            setMove(prevMoves =>
            [
                ...prevMoves,
                newMove
            ]
        )
    }, []);

    const setTimeResultCallBack = useCallback((result) => {
        setTimeResult(result);
    }, []);

    const resetGame = useCallback(() => {
        setMove([]);
        setTimeResult(0);
    }, []);

    if (timeResult) {
        resDialog.current.open();
    }

    return (
        <>
            <Sizer gameOver={gameOver}/>
            <Results moves={movesArray}/>
            <Move setMove={setNewMove} gameOver={gameOver} setGameOver={setGameOver}/>
            { movesArray.length && !timeResult ?
                <TimerHandler gameOver={gameOver} setTimeResult={setTimeResultCallBack}/>
                :
                <Timer time={0}/>
            }
            <ResultModal ref={resDialog} timeResult={timeResult} movesCount={movesArray.length} onClose={resetGame}/>
        {/*    send result to the server */}
        </>
    );
}