import Markdown from "react-markdown";
import { Edge } from "..";

interface PageProps {
  title?: string;
  setCurrentPage?: (l: string) => void;
  content?: string;
  edges?: Edge[];
}

const defaultProps: PageProps = {
  title: "UNDEFINED STATE",
  content: "_this page has no content_",
  edges: [],
};

export function Page({
  title,
  setCurrentPage,
  edges,
  content,
}: PageProps = defaultProps) {
  return (
    <div className="card" style={{ margin: "18px 0" }}>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <Markdown className="card-text">{content || ""}</Markdown>
        {(edges ?? []).map((e) => (
          <a
            tabIndex={0}
            className="card-link"
            onClick={() => (setCurrentPage || ((_) => null))(e.title)}
            key={e.title}
          >
            {e.title}
          </a>
        ))}
      </div>
    </div>
  );
}
