import {useContext, useEffect, useState} from "react";
import {GameContext} from "../store/game-context.jsx";

export function BestResults() {
    const [bestResult, setBestResult] = useState([]);
    const {size, gameCount} =  useContext(GameContext);
    // size will use later to get best results by size

    useEffect(() => {
        fetch('http://fin.local/rest/V1/digits/best').then((response) => {
            return response.json()
        }).then(
            (resData) => {
                setBestResult(resData);
            }
        )
    }, [gameCount])
    return (
        <>
            <div className="best-results">
                <p><strong> Best results: </strong></p>
                {bestResult.map((result)=>
                    <p key={Math.random()*1000}>
                        {`Score - ${result.hits} with time - ${result.time}`}
                    </p>
                )}
            </div>
        </>
    )
}