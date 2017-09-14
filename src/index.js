import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
/* import App from './Analytics';*/
import registerServiceWorker from './registerServiceWorker';

const props = {
  title: "Goosebumps",
  initialState: "The adventure begins",
  languages: [{
    name: "cURL"
  },{
    name: "Javascript"
  }],
  states: [
    {
      title: "The adventure begins",
      content: `_intrepid adventure **start** chapter_
\`\`\`cURL
{"b":"b"}
\`\`\`
\`\`\`Javascript
{"a":"a"}
\`\`\``,
      edges: [{
        title: "Intrepid challenger sets out"
      }]
    },
    {
      title: "Intrepid challenger sets out",
      content: "And lo, drognor went out into the mist",
      edges: [{
        title: "Eat the bad berries"
      },{
        title: "Survive the berries"
      }]
    },
    {
      title: "Eat the bad berries",
      content: "too bad, you die",
      edges: [{
        title: "you dead"
      }]
    },
    {
      title: "Survive the berries",
      content: "You can fight another day",
      edges: [{
        title: "Go fishing"
      }, {
        title: "Go hunting"
      }]
    },
    {
      title: "Go hunting",
      content: "You get mauled by a bear. You dead.",
      edges: [{
        title: "you dead"
      }]
    },
    {
      title: "Go fishing",
      content: "A bear attacks, but you kill it with your fishing rod. Well done."
    },
    {
      title: "you dead",
      content: "lol bye"
    }
  ]
}

let store = createStore((state = props, action) => {
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

ReactDOM.render(
  <div className="container">
    <Provider store={store}>
      <App />
    </Provider>
  </div>
  , document.getElementById('root'));
registerServiceWorker();
