import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://fin.local/graphql',
    }),
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  // </React.StrictMode>,
)
