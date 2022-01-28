// @ts-nocheck
import React from "react";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import Analytics from "./Analytics.tsx";
import UI from "./UI.tsx";

const grabHashState = () => {
  return Object.fromEntries(
    new URLSearchParams(window.location.hash.slice(1)).entries()
  );
};

function App(props) {
  let store = createStore((state = props.initialState, action) => {
    switch (action.type) {
      case "@@INIT":
        return {
          ...state,
          currentState:
            state.initialState ||
            ((s) => s && s[0] && s[0].title)(state.states),
          history: [
            state.initialState ||
              ((s) => s && s[0] && s[0].title)(state.states),
          ],
          language: ((l) => l && l[0])(state.languages),
          hash: grabHashState(),
        };
      case "HOME":
        return {
          ...state,
          currentState:
            state.initialState ||
            ((s) => s && s[0] && s[0].title)(state.states),
          history: [
            state.initialState ||
              ((s) => s && s[0] && s[0].title)(state.states),
          ],
          language: ((l) => l && l[0])(state.languages),
          hash: grabHashState(),
        };
      case "SET_CURRENT_PAGE":
        return {
          ...state,
          history: [...state.history, action.to],
          currentState: action.to,
        };
      case "SET_LANGUAGE":
        return {
          ...state,
          language: state.languages.find(
            (language) => language.name === action.to
          ),
        };
      case "NODE_CLICK":
        return {
          ...state,
          states: [
            ...state.states.filter(
              (state) => state.title !== action.node.data.node.id
            ),
            {
              ...state.states.find(
                (state) => state.title === action.node.data.node.id
              ),
              size: 5,
            },
          ],
        };
      case "HASH_CHANGE":
        return {
          ...state,
          hash: action.hash,
        };
      default:
        return state;
    }
  }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  window.addEventListener(
    "hashchange",
    () => {
      store.dispatch({
        type: "HASH_CHANGE",
        hash: grabHashState(),
      });
    },
    false
  );

  const state = store.getState();

  return (
    <div className="container">
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    </div>
  );
}

const ConnectedApp = connect((state) => state)((state) =>
  state.hash?.display === "analytics" ? <Analytics /> : <UI />
);

export default App;
