import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Page from './Page';
import Markdown from 'react-markdown';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<Page />);
});

it('displays a title', () => {
  const title = <h2>An Example Page Title</h2>;
  const props = {
    title: "An Example Page Title",
  };

  const wrapper = shallow(<Page {...props}/>);

  expect(wrapper.contains(title)).toEqual(true);
});

it('displays edges in li', () => {
  const edge = <li key="link one"><a>link one</a></li>;
  const props = {
    title: "example title",
    edges: [{
      title: "link one"
    }]
  };

  const wrapper = mount(<Page {...props}/>);

  expect(wrapper.contains(edge)).toEqual(true);
});

it('renders content into markdown plugin', () => {
  const markdown = <Markdown source="# Content"/>;
  const props = {
    title: "Markdown test title",
    content: "# Content"
  };

  const wrapper = mount(<Page {...props}/>);

  expect(wrapper.contains(markdown)).toEqual(true);
});
