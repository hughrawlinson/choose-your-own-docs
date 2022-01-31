import { render } from "@testing-library/react";
import { App } from "./App";
import { Page } from "../Page";
import { DynamicDocument } from "..";

const ExampleDynamicDocument: DynamicDocument = {
  title: "An Example Title",
  initialState: "intro",
  languages: [],
  states: [],
};

it("renders without crashing", () => {
  render(<App dynamicDocument={ExampleDynamicDocument} />);
});

it.skip("displays a title", () => {
  const title = <h1 className="title">An Example Title</h1>;
  const wrapper = render(<App dynamicDocument={ExampleDynamicDocument} />);

  expect(wrapper.getByText("An Example Title")).toEqual(true);
});

it.skip("sets the correct initial state", () => {
  const wrapper = render(<App dynamicDocument={ExampleDynamicDocument} />);

  // expect(wrapper.state("pageState")).toEqual("get-started");
});

it.skip("gets the correct initial page", () => {
  const exampleDocument: DynamicDocument = {
    title: "",
    initialState: "page one",
    states: [
      {
        title: "page two",
        content: "",
        edges: [],
      },
      {
        title: "page one",
        content: "",
        edges: [],
      },
    ],
  };

  const wrapper = render(<App dynamicDocument={exampleDocument} />);

  // expect(wrapper.instance().getCurrentPage()).toEqual(props.states[1]);
});

it.skip("links to the correct states", () => {
  const props: DynamicDocument = {
    title: "",
    initialState: "Get Going",
    states: [
      {
        title: "Get Going",
        content: "",
        edges: [
          {
            title: "Register As A Platform Developer",
          },
        ],
      },
      {
        title: "Register As A Platform Developer",
        content: "",
        edges: [],
      },
    ],
  };

  const wrapper = render(<App dynamicDocument={props} />);

  // expect(
  //   wrapper
  //     .instance()
  //     .getCurrentPage()
  //     .edges.find((e) => e.title === "Register As A Platform Developer")
  // ).not.toBeNull();
});

it.skip("includes a Page component", () => {
  const props = {
    title: "Test app",
    states: [
      {
        title: "title for you",
      },
    ],
  };

  const page = <Page {...props.states[0]} />;

  const wrapper = render(<App dynamicDocument={ExampleDynamicDocument} />);

  // expect(wrapper.getByText(page)).toEqual(true);
});
