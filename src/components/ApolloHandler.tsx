import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

export default function ApolloHandler({ children })
{
    // not use now, for now it directly setup in main.jsx
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'http://fin.local/graphql',
        }),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
        );
}
