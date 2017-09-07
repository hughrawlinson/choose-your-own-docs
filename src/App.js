import React, { Component } from 'react';
import './App.css';
import Page from './Page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: this.props.initialState || this.props.states[0].title,
      language: this.props.languages[0] || 'default'
    };
  }

  getCurrentPage() {
    return this.props.states.find(e => e.title === this.state.pageState);
  }

  render() {
    return (
      <div>
        <a>home</a>
        <h1 className="title">{this.props.title}</h1>
        <Page {...this.getCurrentPage()} />
      </div>
    );
  }
}

App.defaultProps = {
  states: [{
    title: "States not yet set up"
  }],
  languages: []
}

export default App;
