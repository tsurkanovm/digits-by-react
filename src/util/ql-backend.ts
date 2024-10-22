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

export function getCurrentResultInput(size: number, hits: number, time: number)
{
    return {
        size: `size_${size}`,
        hits: hits,
        time: time
    };
}
