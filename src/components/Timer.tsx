import React from "react";

type TimerProp = {
    time: number
};

export const Timer: React.FC<TimerProp> = ({time}) => {
    return (
        <>
            <section className="challenge">
                <p className="challenge-time">
                    {time} second{time > 1 ? 's' : ''}
                </p>
            </section>
        </>
    )
}