
import { GameContext } from "../store/game-context.tsx";
import ErrorBlock from "./ErrorBlock";
import {GET_BEST_RESULTS} from "../util/ql-backend.ts";
import {Key, useContext} from "react";
import {useQuery} from "@apollo/client";

export function BestResults() {
    const {size, gameCount} = useContext(GameContext);

    console.log('New game #', gameCount);
    const {loading, data, error}
        = useQuery(GET_BEST_RESULTS, {
        variables: {size: `size_${size}`},
        fetchPolicy: "network-only"
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorBlock title='An error occurred!' message={error.message} />;

    if (data) {
        return (
            <>
                <div className="best-results">
                    <p><strong>Best results:</strong></p>
                    {data.bestResults.map((result: { hits: number; time: number; }, index: Key) =>
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
