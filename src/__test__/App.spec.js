import React from "react";
import {mount} from "enzyme";
//import { MemoryRouter } from 'react-router-dom';
//import renderer from 'react-test-renderer';
//import initialState from '../reducers/initialState';
//import repoMock from "./data/mock";
//import {Provider} from "react-redux";
//import configureMockStore from "redux-mock-store";
//import { createMemoryHistory } from 'history'
import App from '../App';
//import thunk from 'redux-thunk';
//import { connectRouter} from 'connected-react-router';

/* it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
}); */


describe("App", () => {
    /* let mapData = Object.assign({},repoMock.allIssues);
        mapData['open_count'] = repoMock.openIssues.total_count;
        mapData['closed_count'] = mapData.total_count - mapData.open_count; */
    //const mockStore = configureMockStore([thunk]);
    //const store = mockStore(initialState); 
    it('App component renders correctly', () => {
        /* const props = {
          history.cre
        } */
        const rendered = mount(
            <App />
        );
        expect(rendered.children().length).not.toBeLessThan(1);
        //expect(rendered.toJSON()).toMatchSnapshot();
    });
    
  });
  
