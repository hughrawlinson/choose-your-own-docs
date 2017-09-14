import React, { Component } from 'react';
import { chain } from 'ramda';
import { connect } from 'react-redux';
import { Sigma, SigmaEnableSVG, EdgeShapes } from 'react-sigma'
import Dagre from 'react-sigma/lib/Dagre'

class App extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.graph)
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => {
            this.props.dispatch({type: "SET_CURRENT_PAGE", to: this.props.initialState});
        }}>Live View</button>
        <Sigma
          renderer="svg"
          settings={{
            drawEdges: true,
            clone: false
          }}
          onClickNode={(node) => {
            console.log(node);
            this.props.dispatch({
              type: 'NODE_CLICK',
              node: node
            })
          }}
          graph={this.props.graph}>
          <EdgeShapes default="dotted"/>
          <Dagre rankDir="LR" />
        </Sigma>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    languages: [],
    graph: ({
      nodes: state.states.map((s, i) => ({
        id: s.title,
        label: s.title,
        size: 3,
      })),
      edges: chain(s => (s.edges || []).map(edge => ({
        id: `${s.title}${edge.title}`,
        source: s.title,
        target: edge.title
      })))(state.states)
    }),
    ...state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default VisibleTodoList;
