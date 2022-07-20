import "./UI.css";
import { Page } from "../Page";
import { useReducer } from "react";
import { DynamicDocument, Language } from "..";

interface ReducerState {
  dynamicDocument: DynamicDocument;
  currentBlock: string;
  history: string[];
  language?: Language;
}

interface HomeAction {
  type: "HOME";
}

interface SetCurrentPageAction {
  type: "SET_CURRENT_PAGE";
  to: string;
}

interface SetLanguageAction {
  type: "SET_LANGUAGE";
  to: string;
}

type Action = HomeAction | SetCurrentPageAction | SetLanguageAction;

const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case "HOME":
      return {
        ...state,
        currentBlock:
          state.dynamicDocument.initialState ||
          state.dynamicDocument.states?.[0]?.title,
        history: [
          state.dynamicDocument.initialState ||
            state.dynamicDocument.states?.[0]?.title,
        ],
        language: state.dynamicDocument.languages?.[0],
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        history: [...state.history, action.to],
        currentBlock: action.to,
      };
    case "SET_LANGUAGE":
      return {
        ...state,
        language:
          state.dynamicDocument.languages?.find(
            (language) => language.name === action.to
          ) || state.language,
      };
    default:
      return state;
  }
};

interface UIProps extends React.HTMLProps<HTMLDivElement> {
  dynamicDocument: DynamicDocument;
}

export function UI(props: UIProps) {
  const { dynamicDocument } = props;
  const [state, dispatch] = useReducer(reducer, {
    dynamicDocument,
    currentBlock:
      dynamicDocument.initialState || dynamicDocument.states?.[0]?.title,
    history: [
      dynamicDocument.initialState || dynamicDocument.states?.[0]?.title,
    ],
    language: dynamicDocument.languages?.[0],
  });

  function getCurrentPage() {
    return dynamicDocument.states?.find((e) => e.title === state.currentBlock);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Choose your own docs</a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: "HOME" });
                }}
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#display=analytics">
                Graph Analytics
              </a>
            </li>
          </ul>

          {state.language && (
            <form>
              <div className="input-group">
                <span className="input-group-text">Programming Language</span>
                <select
                  id="languageSelect"
                  className="form-control"
                  aria-label="Computer Language"
                  value={state.language.name}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_LANGUAGE",
                      to: e.target.value,
                    });
                  }}
                >
                  {dynamicDocument.languages?.map((language) => (
                    <option key={language.name} value={language.name}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          )}
        </div>
      </nav>
      <div
        className="container-md"
        key={props.key}
        style={{ padding: "9px 0" }}
      >
        <style>
          {`code.language-${state.language?.name} {
            display: block;
          }
          `}
        </style>
        <h1 className="title">{state.dynamicDocument.title}</h1>
        {state.history.map((pageTitle, i) => {
          const page = state.dynamicDocument.states.find(
            (e) => e.title === pageTitle
          );
          if (typeof page === "undefined") {
            return <h2 key={i}>Linked to an invalid page</h2>;
          }
          return (
            <Page
              {...page}
              key={page.title}
              setCurrentPage={(link) =>
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  to: link,
                })
              }
            />
          );
        })}
      </div>
      <footer className="container">Here's the page footer</footer>
    </div>
  );
}
