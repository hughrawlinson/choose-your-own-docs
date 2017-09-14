import React from 'react';
import querystring from 'querystring';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Analytics from './Analytics';
import UI from './UI';


function App (props) {
  let store = createStore((state = props.initialState, action) => {
    switch (action.type) {
      case '@@INIT':
        return {
          ...state,
          currentState: state.initialState || (s => s && s[0] && s[0].title)(state.states),
          language: (l => l && l[0])(state.languages),
          hash: querystring.parse(window.location.hash.substr(1))
        }
      case 'SET_CURRENT_PAGE':
        return {
          ...state,
          currentState: action.to
        };
      case 'SET_LANGUAGE':
        return {
          ...state,
          language: state.languages.find(language => language.name === action.to)
        };
      case 'NODE_CLICK':
        return {
          ...state,
          states: [
            ...state.states.filter(state => state.title !== action.node.data.node.id),
            {
              ...state.states.find(state => state.title === action.node.data.node.id),
              size: 5
            }
          ]
        }
      case 'HASH_CHANGE':
        return {
          ...state,
          hash: action.hash
        }
      default:
        return state;
    }
  }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  window.addEventListener("hashchange", () => {
    store.dispatch({
      type: "HASH_CHANGE",
      hash: querystring.parse(window.location.hash.substr(1))
    });
  }, false);

  return (
    <div className="container">
      <Provider store={store}>
        { store.getState().hash.display === "analytics"
          ? <Analytics />
          : <UI /> }
      </Provider>
    </div>
  );
}

export default App;
