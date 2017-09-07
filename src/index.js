import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const props = {
  title: "Goosebumps",
  languages: [{
    name: "cURL"
  }],
  states: [
    {
      title: "page one",
      edges: [{
        title: "the final chapter"
      }]
    },
    {
      title: "the final chapter"
    }
  ]
}

ReactDOM.render(<App {...props}/>, document.getElementById('root'));
registerServiceWorker();
