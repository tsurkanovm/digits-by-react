import {Results} from "./Results.jsx";
import Move from "./Move.jsx";
import {useContext, useRef, useState} from "react";
import {TimerHandler} from "./TimerHandler.jsx";
import {Timer} from "./Timer.jsx";
import ResultModal from "./ResultModal.jsx";
import {Sizer} from "./Sizer.jsx";
import ErrorBlock from "./ErrorBlock.jsx";
import {GameContext} from "../store/game-context.jsx";
import {getCurrentResultInput, SET_CURRENT_RESULT} from "../util/ql-backend.js";
import {useMutation} from "@apollo/client";

export const GameBoard = () => {
    const [movesArray, setMove] = useState([]);
    const [gameOver, setGameOver] = useState(true);
    const [timeResult, setTimeResult] = useState(0);
    const resDialog = useRef();
    const { size } = useContext(GameContext);

    // Apollo mutation hook
    const [setCurrentResult, { data, loading, error }] = useMutation(SET_CURRENT_RESULT);

    function setNewMove(newMove) {
        setMove(prevMoves => [...prevMoves, newMove])
    }

    function resetGame() {
        setMove([]);
        setTimeResult(0);
    }

    async function setTimeResultHandler(timeResult) {
        setTimeResult(timeResult);
        if (timeResult) {
            try {
                const response = await setCurrentResult({
                    variables: {
                        result: getCurrentResultInput(size, movesArray.length, timeResult)
                    }
                });

                console.log("Response from server:", response.data);
                console.dir(response.data);
                resDialog.current.open();
            } catch (error) {
                console.error("Error sending result to server:", error);
                return <ErrorBlock title='An error occurred!' message={error.message} />;
            }
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
        </>
    );
};
