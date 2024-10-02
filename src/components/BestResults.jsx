import {useContext, useEffect, useState} from "react";
import {GameContext} from "../store/game-context.jsx";
import ErrorBlock from "./ErrorBlock.jsx";
import {getBestResultsFromServer} from "../util/backend.js";

export function BestResults() {
    const [bestResult, setBestResult] = useState([]);
    const [error, setError] = useState(null);
    const {size, gameCount} = useContext(GameContext);
    // size will use later to get best results by size

    useEffect(() => {
        async function fetchBestResult() {
            try {
                setBestResult(await getBestResultsFromServer());
            } catch (error) {
                setError({message: error.message || 'Could not fetch best results. Please try again.'});
            }
        }

        fetchBestResult();
        console.dir(bestResult);

    }, [gameCount, size])

    if (error) {
        return <ErrorBlock title='An error occured!' message={error.message}/>
    }

    return (
        <>
            <div className="best-results">
                <p><strong> Best results: </strong></p>
                {bestResult.map((result) =>
                    <p key={Math.random() * 1000}>
                        {`Score - ${result.hits} with time - ${result.time}`}
                    </p>
                )}
            </div>
        </>
    );
}