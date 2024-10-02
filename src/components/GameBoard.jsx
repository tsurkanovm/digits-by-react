import {Results} from "./Results.jsx";
import Move from "./Move.jsx";
import {useContext, useRef, useState} from "react";
import {TimerHandler} from "./TimerHandler.jsx";
import {Timer} from "./Timer.jsx";
import ResultModal from "./ResultModal.jsx";
import {Sizer} from "./Sizer.jsx";
import {sendResultToServer} from "../util/backend.js";
import ErrorBlock from "./ErrorBlock.jsx";
import {GameContext} from "../store/game-context.jsx";

export const GameBoard = () => {
    const [movesArray, setMove] = useState([]);
    const [gameOver, setGameOver] = useState(true);
    const [timeResult, setTimeResult] = useState(0);
    const resDialog = useRef();
    const {size} = useContext(GameContext);

    function setNewMove(newMove)  {
            setMove(prevMoves =>
            [
                ...prevMoves,
                newMove
            ]
        )
    }

    function resetGame() {
        setMove([]);
        setTimeResult(0);
    }

    async function setTimeResultHandler(timeResult) {
        setTimeResult(timeResult);
        if (timeResult) {
            try {
                await sendResultToServer(timeResult, movesArray.length, size);
            } catch (error) {
                // @todo create error status and trigger here
                return <ErrorBlock title='An error occured!' message={error.message} />;
            }

            resDialog.current.open();
        }
    }

    return (
        <>
            <Sizer gameOver={gameOver}/>
            <Results moves={movesArray}/>
            <Move setMove={setNewMove} gameOver={gameOver} setGameOver={setGameOver}/>
            { movesArray.length && !timeResult ?
                <TimerHandler gameOver={gameOver} setTimeResult={setTimeResultHandler}/>
                :
                <Timer time={0}/>
            }
            <ResultModal ref={resDialog} timeResult={timeResult} movesCount={movesArray.length} onClose={resetGame}/>
        {/*    send result to the server */}
        </>
    );
}