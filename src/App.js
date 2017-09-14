import React from 'react';
import querystring from 'querystring';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Analytics from './Analytics';
import UI from './UI';

const urlHashParams = querystring.parse(window.location.hash.substr(1));

function App (props) {
  let store = createStore((state = props.initialState, action) => {
    switch (action.type) {
      case '@@INIT':
        return {
          ...state,
          currentState: state.initialState || (s => s && s[0] && s[0].title)(state.states),
          language: (l => l && l[0])(state.languages)
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
      default:
        return state;
    }
  }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return (
    <div className="container">
      <Provider store={store}>
        { urlHashParams.display && urlHashParams.display === "analytics"
            ? <Analytics />
            : <UI /> }
      </Provider>
    </div>
  );
}

export default App;
