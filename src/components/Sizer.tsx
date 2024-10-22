import React, {useContext} from "react";
import {GameContext} from "../store/game-context";

type SizerProp = {
    gameOver: boolean
}
export const Sizer: React.FC<SizerProp> = ({gameOver})  => {
    const {size, setSize} =  useContext(GameContext);

    const handleChange = () => {
        setSize(prevSize => (prevSize === 4 ? 5 : 4));
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