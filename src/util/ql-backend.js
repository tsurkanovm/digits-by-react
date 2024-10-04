import {gql} from "@apollo/client";

export const GET_BEST_RESULTS = gql`
    query GetBestResults($size: SizeEnum!) {
        bestResults(size: $size) {
            time
            hits
            size
        }
    }
`;

export const SET_CURRENT_RESULT = gql`
    mutation SetCurrentResult($result: ResultInput!) {
        setCurrentResult(currentResult: $result) {
            creation_time
        }
    }
`;

export function getCurrentResultInput(size, hits, time)
{
    return {
        size: `size_${size}`, // Adjust this according to your enum definition
        hits: hits,
        time: time
    };
}
