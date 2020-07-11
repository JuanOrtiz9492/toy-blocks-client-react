import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes, { Nodes } from "./Nodes";
import Node from "../components/Node";

describe("<Nodes />", () => {
  const actions = {
    checkNodeStatuses: jest.fn(),
    checkNodeBlocksList: jest.fn()
  };

  const nodes = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: false,
        blocks:[
          {
            "id": "1",
            "attributes": {
                "data": "By reason of these things",
            }
        },
        {
            "id": "2",
            "attributes": {
                "data": "then the whaling voyage was welcome",
            }
        }
        ]
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: false,
        blocks:[]
      }
    ]
  };

  it("should contain <Node />", () => {
    const wrapper = shallow(
      <Nodes
        actions={actions}
        nodes={nodes}
      />
    );

    expect(wrapper.find(Node).length).toEqual(2);
  });
  it("test api calls", ()=>{
    shallow(
      <Nodes
        actions={actions}
        nodes={nodes}
      />
    );
    expect(actions.checkNodeStatuses).toHaveBeenCalledWith(nodes.list)
    expect(actions.checkNodeBlocksList).toHaveBeenCalledWith(nodes.list)
  })
  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({nodes});
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
