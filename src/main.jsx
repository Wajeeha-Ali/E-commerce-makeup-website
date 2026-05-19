import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </BrowserRouter>
);