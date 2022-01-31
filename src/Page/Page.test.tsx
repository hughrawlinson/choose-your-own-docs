import { render } from "@testing-library/react";
import { Page } from ".";
import Markdown from "react-markdown";

it("renders without crashing", () => {
  render(<Page />);
});

it.skip("displays a title", () => {
  const title = <h2>An Example Page Title</h2>;
  const props = {
    title: "An Example Page Title",
  };

  const wrapper = render(<Page {...props} />);

  // expect(wrapper.contains(title)).toEqual(true);
});

it.skip("displays edges in li", () => {
  const edge = (
    <li key="link one">
      <a>link one</a>
    </li>
  );
  const props = {
    title: "example title",
    edges: [
      {
        title: "link one",
      },
    ],
  };

  const wrapper = render(<Page {...props} />);

  // expect(wrapper.contains(edge)).toEqual(true);
});

it.skip("renders content into markdown plugin", () => {
  const markdown = <Markdown># Content</Markdown>;
  const props = {
    title: "Markdown test title",
    content: "# Content",
  };

  const wrapper = render(<Page {...props} />);

  // expect(wrapper.contains(markdown)).toEqual(true);
});
