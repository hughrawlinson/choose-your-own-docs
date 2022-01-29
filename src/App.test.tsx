// @ts-nocheck
import { render } from "@testing-library/react";
import App from "./App";
import Page from "./Page";

it("renders without crashing", () => {
  render(<App dynamicDocument={} />);
});

it.skip("displays a title", () => {
  const title = <h1 className="title">An Example Title</h1>;
  const props = {
    title: "An Example Title",
    initialState: "intro",
  };

  const wrapper = render(<App {...props} initialState={{ hash: {} }} />);

  expect(wrapper.contains(title)).toEqual(true);
});

it.skip("sets the correct initial state", () => {
  const props = {
    title: "Another Example title",
    initialState: "get-started",
  };

  const wrapper = render(<App {...props} />);

  expect(wrapper.state("pageState")).toEqual("get-started");
});

it.skip("gets the correct initial page", () => {
  const props = {
    title: "",
    initialState: "page one",
    states: [
      {
        title: "page two",
      },
      {
        title: "page one",
      },
    ],
  };

  const wrapper = render(<App {...props} />);

  expect(wrapper.instance().getCurrentPage()).toEqual(props.states[1]);
});

it.skip("links to the correct states", () => {
  const props = {
    title: "",
    initialState: "Get Going",
    states: [
      {
        title: "Get Going",
        edges: [
          {
            title: "Register As A Platform Developer",
          },
        ],
      },
      {
        title: "Register As A Platform Developer",
      },
    ],
  };

  const wrapper = render(<App {...props} />);

  expect(
    wrapper
      .instance()
      .getCurrentPage()
      .edges.find((e) => e.title === "Register As A Platform Developer")
  ).not.toBeNull();
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

  const wrapper = render(<App {...props} />);

  expect(wrapper.contains(page)).toEqual(true);
});
