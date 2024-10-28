import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {moveActions, MoveState} from "../store/move-slice.ts";
import {useAppSelector} from "../store/hooks.ts";


export const Sizer: React.FC = ()  => {
    const dispatch = useDispatch();
    const size = useAppSelector((state) => state.move.size);
    const gameOver = useAppSelector((state) => state.move.gameOver);

    const handleChange = () => {
        dispatch(moveActions.setSize());
    };

    return (
        <div id='player' className="size-wrapper">
            <h2>Size - {size}</h2>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={size === 5}
                    onChange={handleChange}
                    disabled={!gameOver}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
};