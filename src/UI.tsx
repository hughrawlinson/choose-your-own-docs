import React from "react";
import "./UI.css";
import Page from "./Page.tsx";
import { useReducer } from "react";
import { DynamicDocument } from ".";

const reducer = (state, action) => {
  switch (action.type) {
    case "HOME":
      return {
        ...state,
        currentState: state.initialState || state.states?.[0]?.title,
        history: [state.initialState || state.states?.[0]?.title],
        language: state.languages?.[0],
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        history: [...state.history, action.to],
        currentState: action.to,
      };
    case "SET_LANGUAGE":
      return {
        ...state,
        language: state.dynamicDocument.languages.find(
          (language) => language.name === action.to
        ),
      };
    default:
      return state;
  }
};

interface UIProps {
  dynamicDocument: DynamicDocument;
}

export function UI({ dynamicDocument }: UIProps) {
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
    return state.states?.find((e) => e.title === this.props.currentState);
  }

  return (
    <div>
      <style>
        {`code.language-${state.language?.name} {
            display: block;
          }
          `}
      </style>
      {state.language && (
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="languageSelect">Language</label>
            <select
              id="languageSelect"
              className="form-control"
              value={state.language.name}
              onChange={(e) => {
                dispatch({
                  type: "SET_LANGUAGE",
                  to: e.target.value,
                });
              }}
            >
              {dynamicDocument.languages.map((language) => (
                <option key={language.name} value={language.name}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      )}
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        onClick={() => {
          dispatch({ type: "HOME" });
        }}
      >
        home
      </button>
      <a className="btn btn-outline-primary btn-sm" href="#display=analytics">
        Graph Analytics
      </a>
      <h1 className="title">{state.title}</h1>
      {state.history.map((pageTitle) => {
        const page = dynamicDocument.states.find((e) => e.title === pageTitle);
        return (
          <Page
            {...page}
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
  );
}
