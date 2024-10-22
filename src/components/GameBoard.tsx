import {Results} from "./Results";
import React, {useContext, useRef, useState} from "react";
import {TimerHandler} from "./TimerHandler";
import {Timer} from "./Timer";
import ResultModal, {ResultModalHandle} from "./ResultModal";
import {Sizer} from "./Sizer";
import ErrorBlock from "./ErrorBlock";
import {GameContext} from "../store/game-context";
import {getCurrentResultInput, SET_CURRENT_RESULT} from "../util/ql-backend.ts";
import {useMutation} from "@apollo/client";
import MoveFrom from "./MoveFrom";

export type MoveObj = {
    move:string,
    score:string,
    id: number
};

export const GameBoard: React.FC = () => {
    const [movesArray, setMove] = useState<MoveObj[]>([]);
    const [gameOver, setGameOver] = useState(true);
    const [timeResult, setTimeResult] = useState(0);
    const resDialog = useRef<ResultModalHandle>(null);
    const { size, setGameCount } = useContext(GameContext);

    // Apollo mutation hook
    const [setCurrentResult] = useMutation(SET_CURRENT_RESULT);

    function setNewMove(newMove: MoveObj) {
        setMove(prevMoves => [...prevMoves, newMove])
    }

    function resetGame() {
        setGameCount((prev) => prev + 1);
        setMove([]);
        setTimeResult(0);
    }

    async function setTimeResultHandler(timeResult: number) {
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
            } catch (error) {
                console.error("Error sending result to server:", error);
                const errorMessage = (error as Error).message || 'Unknown error';
                return <ErrorBlock title='An error occurred!' message={errorMessage}/>;
            }

            if (resDialog.current) {
                resDialog.current.open();
            }
        }
    }

    return (
        <>
            <Sizer gameOver={gameOver}/>
            <Results moves={movesArray}/>
            {/*<Move setMove={setNewMove} gameOver={gameOver} setGameOver={setGameOver}/>*/}
            <MoveFrom  setMove={setNewMove} gameOver={gameOver} setGameOver={setGameOver}/>
            { movesArray.length && !timeResult ?
                <TimerHandler gameOver={gameOver} setTimeResult={setTimeResultHandler}/>
                :
                <Timer time={0}/>
            }
            <ResultModal ref={resDialog} timeResult={timeResult} movesCount={movesArray.length} onClose={resetGame}/>
        </>
    );
};
