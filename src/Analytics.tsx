import { chain } from "ramda";
// @ts-ignore
import { Sigma, EdgeShapes } from "react-sigma";
// @ts-ignore
import Dagre from "react-sigma/lib/Dagre.js";
import { Block, DynamicDocument } from ".";

interface AnalyticsProps {
  dynamicDocument: DynamicDocument;
}

export function Analytics({ dynamicDocument }: AnalyticsProps) {
  const graph = prepGraph(dynamicDocument);

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
        graph={graph}
      >
        <EdgeShapes default="dotted" />
        <Dagre rankDir="LR" />
      </Sigma>
    </div>
  );
}

function prepGraph(dynamicDocument: DynamicDocument) {
  return {
    nodes: dynamicDocument.states.map((s, i) => ({
      id: serializeName(s.title),
      label: s.title,
      size: 3,
    })),
    edges: chain((s: Block) =>
      (s.edges || []).map((edge) => ({
        id: serializeName(`${s.title.split(" ").join("_")}${edge.title}`),
        source: serializeName(s.title),
        target: serializeName(edge.title),
      }))
    )(dynamicDocument.states),
  };
}

const serializeName = (name: string) =>
  name.split(" ").join("_").split(".").join("_").toLowerCase();
