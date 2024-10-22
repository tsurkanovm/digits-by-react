import React from "react";
import {MoveObj} from "./GameBoard.tsx";

type ResultProp = {
    moves: MoveObj[]
}
export const Results: React.FC<ResultProp> = ({moves}) => {
    return (
        <div className='results'>
            {moves.map((moveItem)=>
                <p key={moveItem.id}>
                    {`${moveItem.move} | ${moveItem.score}`}
                </p>
            )}
        </div>
    )
}