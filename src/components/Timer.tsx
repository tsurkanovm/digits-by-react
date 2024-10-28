import React from "react";

export const Timer: React.FC<{time: number}> = ({time}) => {
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