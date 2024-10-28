import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import {getCurrentScore, initiateGoal} from "../util/core.ts";

export type MoveObj = {
    move:string,
    score:string,
    id: number
};

 export type MoveState = {
     moveArray: MoveObj[],
     gameOver: boolean,
     size: number
 };

 let goal: number[] = [];

const moveSlice: Slice = createSlice({
    name: 'move',
    initialState: { moveArray: [], gameOver: false, size: 4 } as MoveState,
    reducers: {

        addMove(state, action: PayloadAction<string>) {
            if (!goal.length) {
                goal = initiateGoal(state.size);
            }
            const currentScore = getCurrentScore(action.payload, goal);
            const newMoveObj: MoveObj = {
                move: action.payload,
                score: currentScore,
                id: state.moveArray.length
            };

            state.moveArray = state.moveArray.concat(newMoveObj);

            if (parseInt(currentScore[currentScore.length - 1]) === state.size) {
                state.gameOver = true;
            } else if (state.gameOver) {
                state.gameOver = false; // first move
            }
        },

        resetGame(state) {
            state.moveArray = [];
            state.gameOver = true;
        },

        setSize(state) {
            state.size = (state.size === 4 ? 5 : 4);
        }
    }
});

export const moveActions = moveSlice.actions;

export default moveSlice;