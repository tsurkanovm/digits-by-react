import { gql } from "@apollo/client";

// const client = new ApolloClient({
//     link: new HttpLink({
//         uri: 'http://fin.local/graphql',
//     }),
//     cache: new InMemoryCache()
// });

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

// export const bestResultLoader = async () => {
//     try {
//         const { data } = await client.query({
//             query: GET_BEST_RESULTS,
//         });
//
//         return data;
//     } catch (error) {
//         throw new Response('Failed to fetch best results data', { status: 500 });
//     }
// };