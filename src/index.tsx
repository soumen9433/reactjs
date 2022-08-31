import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

// import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/variables.scss";
import "./assets/scss/index.scss";

import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Store} from "redux";
import {Provider} from "react-redux";
import {createBrowserHistory, History} from "history";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import rootStore from "./stores/rootStore";
import App from "./views/App";
import environment from "environment";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

(async (window: Window): Promise<void> => {
  const initialState: any = {};
  const history: History = createBrowserHistory({
    basename: environment.route.baseRoute
  });
  const store: Store = rootStore(initialState, history);

  const client = new ApolloClient({
    uri: environment.api.graphql,
    cache: new InMemoryCache()
  });

  const rootEl: HTMLElement | null = document.getElementById("root");
  const render = (Component: any, el: HTMLElement | null): void => {
    ReactDOM.render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Component history={history} dispatch={store.dispatch} />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);

serviceWorkerRegistration.register();
