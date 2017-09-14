import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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


ReactDOM.render(
  <App initialState={props} />, document.getElementById('root'));
registerServiceWorker();
