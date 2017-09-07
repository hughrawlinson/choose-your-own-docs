import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Page from './Page';

it('renders without crashing', () => {
  shallow(<App />);
});

it('displays a title', () => {
  const title = <h1 className="title">An Example Title</h1>;
  const props = {
    title: "An Example Title",
    initialState: "intro"
  };

  const wrapper = shallow(<App {...props}/>);

  expect(wrapper.contains(title)).toEqual(true);
});

it('sets the correct initial state', () => {
  const props = {
    title: "Another Example title",
    initialState: "get-started"
  };

  const wrapper = mount(<App {...props}/>);

  expect(wrapper.state('pageState')).toEqual('get-started');
});

it('gets the correct initial page', () => {
  const props = {
    title: "",
    initialState: "page one",
    states: [{
      title: "page two",
    },{
      title: "page one"
    }]
  };

  const wrapper = mount(<App {...props}/>);

  expect(wrapper.instance().getCurrentPage()).toEqual(props.states[1]);
});

it('links to the correct states', () => {
  const props = {
    title: "",
    initialState: "Get Going",
    states: [{
      title: "Get Going",
      edges: [{
        title: "Register As A Platform Developer"
      }]
    }, {
      title: "Register As A Platform Developer"
    }]
  };

  const wrapper = mount(<App {...props}/>);

  expect(wrapper.instance()
                .getCurrentPage()
                .edges
                .find(e => e.title === "Register As A Platform Developer"))
    .not.toBeNull();
});

it('includes a Page component', () => {
  const props = {
    title: "Test app",
    states: [{
      title: "title for you"
    }]
  };

  const page = <Page {...props.states[0]}/>;

  const wrapper = shallow(<App {...props}/>);

  expect(wrapper.contains(page)).toEqual(true);
});
