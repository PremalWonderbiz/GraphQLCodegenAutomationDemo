import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import { HttpLink } from "@apollo/client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5186';
console.log(import.meta.env.VITE_API_BASE_URL);

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${API_BASE_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
