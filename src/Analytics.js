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
      <Sigma
        renderer="svg"
        settings={{
          drawEdges: true,
          clone: false
        }}
        graph={this.props.graph}>
        <EdgeShapes default="dotted"/>
        <Dagre rankDir="LR" />
      </Sigma>
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
