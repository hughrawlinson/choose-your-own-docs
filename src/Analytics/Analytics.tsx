import { chain } from "ramda";
import { Block, DynamicDocument } from "..";
import "react-sigma-v2/lib/react-sigma-v2.css";
import { SigmaContainer, useSigma } from "react-sigma-v2";
import forceAtlas2Layout from "graphology-layout-forceatlas2";
import React, { useEffect } from "react";

function AnalyticsGraph({ dynamicDocument }: AnalyticsProps) {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const data = prepGraph(dynamicDocument);
  useEffect(() => {
    data.nodes.forEach((node) => {
      const { id, label, size } = node;
      if (!graph.findNode((n) => n === id)) {
        graph.addNode(id, { label, size, color: "#000" });
      }
    });
    data.edges.forEach((edge) => {
      const { id, source, target } = edge;
      graph.addEdge(source, target, { id });
    });
    forceAtlas2Layout.assign(graph, 50);
  }, [data]);
  return null;
}

interface AnalyticsProps {
  dynamicDocument: DynamicDocument;
}

export function Analytics({ dynamicDocument }: AnalyticsProps) {
  return (
    <React.StrictMode>
      <div>
        <a className="btn btn-outline-primary btn-sm" href="#">
          View Narrative Document
        </a>
        <SigmaContainer style={{ height: "500px", width: "500px" }}>
          <AnalyticsGraph dynamicDocument={dynamicDocument} />
        </SigmaContainer>
      </div>
    </React.StrictMode>
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
