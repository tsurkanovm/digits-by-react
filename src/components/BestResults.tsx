
import {GET_BEST_RESULTS} from "../util/ql-backend.ts";
import {Key} from "react";
import {useQuery} from "@apollo/client";
import {useAppSelector} from "../store/hooks.ts";

export function BestResults() {
    //const data = useLoaderData();
    const size = useAppSelector((state) => state.move.size);

    const {loading, data, error}
        = useQuery(GET_BEST_RESULTS, {
        variables: {size: `size_${size}`},
        fetchPolicy: "network-only"
    });

    if (loading) return <p>Loading...</p>;
    if (error) throw new Error(error.message);

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
