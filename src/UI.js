import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UI.css';
import Page from './Page';

class UI extends Component {
  getCurrentPage() {
    return this.props.states.find(e => e.title === this.props.currentState);
  }

  render() {
    return (
      <div>
        <style>
          {`code.language-${this.props.language.name} {
            display: block;
          }
          `}
        </style>
        { this.props.language &&
        (
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="languageSelect">Language</label>
              <select
                id="languageSelect"
                className="form-control"
                value={this.props.language.name}
                onChange={(e) => {
                    this.props.dispatch({type: "SET_LANGUAGE", to: e.target.value})
                }}>
                {this.props.languages.map(language => (
                  <option key={language.name} value={language.name}>{language.name}</option>
                ))}
              </select>
            </div>
          </form>
        )
        }
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => {
          this.props.dispatch({type: "SET_CURRENT_PAGE", to: this.props.initialState});
      }}>home</button>
      <h1 className="title">{this.props.title}</h1>
      <Page {...this.getCurrentPage()} setCurrentPage={(link) => this.props.dispatch({
          type: "SET_CURRENT_PAGE",
          to: link
      })} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    languages: [],
    ...state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

const VisibleUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(UI);

export default VisibleUI;
