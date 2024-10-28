import React from "react";

import {useSelector} from "react-redux";
import {MoveObj, MoveState} from "../store/move-slice.ts";

export const Results: React.FC = () => {
    const moves = useSelector((state:MoveState) => state.move.moveArray);
    return (
        <div className='results'>
            {moves.map((moveItem: MoveObj)=>
                <p key={moveItem.id}>
                    {`${moveItem.move} | ${moveItem.score}`}
                </p>
            )}
        </div>
    )
}