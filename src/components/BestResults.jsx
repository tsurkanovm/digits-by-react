import {useContext, useEffect, useState} from "react";
import {GameContext} from "../store/game-context.jsx";

export function BestResults() {
    const [bestResult, setBestResult] = useState([]);
    const {size, gameCount} =  useContext(GameContext);
    // size will use later to get best results by size

    useEffect(() => {
        async function fetchBestResult() {
            const response = await fetch('http://fin.local/rest/V1/digits/best');
            const resData = await response.json();
            setBestResult(resData);
        }

        fetchBestResult();
    }, [gameCount, size])
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