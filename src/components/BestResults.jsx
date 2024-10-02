import {useContext, useEffect, useState} from "react";
import {GameContext} from "../store/game-context.jsx";
import ErrorBlock from "./ErrorBlock.jsx";

export function BestResults() {
    const [bestResult, setBestResult] = useState([]);
    const [error, setError] = useState(null);
    const {size, gameCount} = useContext(GameContext);
    // size will use later to get best results by size

    useEffect(() => {
        async function fetchBestResult() {
            try {
                const response = await fetch('http://fin.local/rest/V1/digits/best');
                const resData = await response.json();

                if (!response.ok) {
                    throw Error('Failed to fetch best results');
                }

                setBestResult(resData);
            } catch (error) {
                setError({message: error.message || 'Could not fetch best results. Please try again.'});
            }
        }

        fetchBestResult();

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