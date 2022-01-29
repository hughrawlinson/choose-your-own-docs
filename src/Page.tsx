import Markdown from "react-markdown";
import { Edge } from ".";

interface PageProps {
  title?: string;
  setCurrentPage?: (l: string) => void;
  content?: string;
  edges?: Edge[];
}

function Page({ title, setCurrentPage, edges, content }: PageProps) {
  return (
    <div className="card">
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

Page.defaultProps = {
  title: "UNDEFINED STATE",
  content: "_this page has no content_",
  edges: [],
};

export default Page;
