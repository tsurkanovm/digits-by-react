import {useState} from "react";

export function Sizer({size, setSize, gameOver}) {


    const handleChange = () => {
        setSize(prevSize => (prevSize === '4' ? '5' : '4'));
    };

    return (
        <div id='player'>
            <p>Size - {size}</p>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={size === '5'}
                    onChange={handleChange}
                    disabled={!gameOver}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}