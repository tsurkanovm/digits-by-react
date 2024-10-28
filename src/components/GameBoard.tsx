import {Results} from "./Results";
import React, {useRef, useState} from "react";
import {TimerHandler} from "./TimerHandler";
import {Timer} from "./Timer";
import ResultModal, {ResultModalHandle} from "./ResultModal";
import {Sizer} from "./Sizer";
import ErrorBlock from "./ErrorBlock";
import {getCurrentResultInput, SET_CURRENT_RESULT} from "../util/ql-backend.ts";
import {useMutation} from "@apollo/client";
import MoveFrom from "./MoveFrom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {moveActions} from "../store/move-slice.ts";



export const GameBoard: React.FC = () => {
    const dispatch = useAppDispatch();
    const size = useAppSelector((state) => state.move.size);
    const movesArray = useAppSelector((state) => state.move.moveArray);
    const [timeResult, setTimeResult] = useState(0);
    const resDialog = useRef<ResultModalHandle>(null);

    // Apollo mutation hook
    const [setCurrentResult] = useMutation(SET_CURRENT_RESULT);

    function resetGame() {
        // @ts-ignore
        dispatch(moveActions.resetGame());
        // setGameCount((prev) => prev + 1);
        // setMove([]);
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
            <Sizer/>
            <Results/>
            <MoveFrom />
            { movesArray.length && !timeResult ?
                <TimerHandler setTimeResult={setTimeResultHandler}/>
                :
                <Timer time={0}/>
            }
            <ResultModal ref={resDialog} timeResult={timeResult} onClose={resetGame}/>
        </>
    );
};
