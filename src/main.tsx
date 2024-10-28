import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App.jsx'
import './index.css'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://fin.local/graphql',
    }),
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
)
