import { useContext, useEffect } from "react";
import { GameContext } from "../store/game-context";
import ErrorBlock from "./ErrorBlock";
import { useLazyQuery } from "@apollo/client";
import {GET_BEST_RESULTS} from "../util/ql-backend.js";

export function BestResults() {
    const { size, gameCount } = useContext(GameContext);

    const [fetchResults, { called, loading, data, error }]
        = useLazyQuery(GET_BEST_RESULTS, {
        variables: { size: `size_${size}` }
    });

    useEffect(() => {
        fetchResults();
    }, [size, gameCount, fetchResults]);

    if (!called) return <p>No request made yet.</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorBlock title='An error occurred!' message={error.message} />;

    if (data) {
        return (
            <>
                <div className="best-results">
                    <p><strong>Best results:</strong></p>
                    {data.bestResults.map((result, index) =>
                        <p key={index}>
                            {`Score - ${result.hits} with time - ${result.time}`}
                        </p>
                    )}
                </div>
            </>
        );
    }

    return null;
}
