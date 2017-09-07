import React, { Component } from 'react';
import Markdown from 'react-markdown';

class Page extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Markdown source={this.props.content}/>
        <ul>
          {this.props.edges.map(e => (
            //TODO: onclick dispatch state change
            <li key={e.title}><a>{ e.title }</a></li>
          ))}
        </ul>
      </div>
    );
  }
}

Page.defaultProps = {
  title: "UNDEFINED STATE",
  content: "_this page has no content_",
  edges: []
}

export default Page;
