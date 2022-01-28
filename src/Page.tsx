import React, { Component } from 'react';
import Markdown from 'react-markdown';

class Page extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{this.props.title}</h4>
          <Markdown className="card-text">{this.props.content}</Markdown>
          {this.props.edges.map((e) => (
            <a
              tabIndex="0"
              className="card-link"
              onClick={() => this.props.setCurrentPage(e.title)}
              key={e.title}
            >
              {e.title}
            </a>
          ))}
        </div>
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
