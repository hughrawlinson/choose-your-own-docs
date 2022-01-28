import React, { Component } from "react";
import { chain } from "ramda";
import { connect } from "react-redux";
import { Sigma, SigmaEnableSVG, EdgeShapes } from "react-sigma";
import Dagre from "react-sigma/lib/Dagre.js";

class App extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.graph);
  }

  render() {
    return (
      <div>
        <a className="btn btn-outline-primary btn-sm" href="#">
          View Narrative Document
        </a>
        <Sigma
          renderer="svg"
          settings={{
            drawEdges: true,
            clone: false,
          }}
          onClickNode={(node) => {
            console.log(node);
            this.props.dispatch({
              type: "NODE_CLICK",
              node: node,
            });
          }}
          graph={this.props.graph}
        >
          <EdgeShapes default="dotted" />
          <Dagre rankDir="LR" />
        </Sigma>
      </div>
    );
  }
}

const serializeName = (name) =>
  name.split(" ").join("_").split(".").join("_").toLowerCase();

const mapStateToProps = (state) => {
  return {
    languages: [],
    graph: {
      nodes: state.states.map((s, i) => ({
        id: serializeName(s.title),
        label: s.title,
        size: 3,
      })),
      edges: chain((s) =>
        (s.edges || []).map((edge) => ({
          id: serializeName(`${s.title.split(" ").join("_")}${edge.title}`),
          source: serializeName(s.title),
          target: serializeName(edge.title),
        }))
      )(state.states),
    },
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(App);

export default VisibleTodoList;
