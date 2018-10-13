import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
/* import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
 
const token = "1826f60dab5b9943c1181483d2ecad757f5825a7";
 
const httpLink = {
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`
  }
};
 
const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache()
});




client.query({
    query: gql`
    {
        repository(owner:"octocat", name:"Hello-World") {
            issues(last:20, states:CLOSED) {
              edges {
                node {
                  title
                  url
                  labels(first:5) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
      }
    `
}).then(result => console.log(result)); */

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
