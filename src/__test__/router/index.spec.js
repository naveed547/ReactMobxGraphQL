import React from 'react';

import { mount } from 'enzyme';

//import IssueDescriptionContainer from '../../pages/issueDescription';
//import IssueListContainer from '../../pages/issueList';
//import UserRepoSearchContainer from '../../pages/userRepoSearch';
import Routes from '../../router';
import { MemoryRouter, Route } from 'react-router-dom';
//import renderer from 'react-test-renderer';
import initialState from '../../reducers/initialState';
import repoMock from "../data/mock";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';

const middlewares = [thunk];

describe("App", () => {
  let mapData = Object.assign({},repoMock.allIssues);
        mapData['open_count'] = repoMock.openIssues.total_count;
        mapData['closed_count'] = mapData.total_count - mapData.open_count;
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({reposReducer: {
      ...initialState.repoDetails,
      repoData:   mapData
  }}); 
  test('valid path should render component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Route component={props => <Routes {...props} />} path="/" />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("UserRepoSearch")).toHaveLength(1);
  });
  
  test('invalid path should render "no data"', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <Route component={props => <Routes {...props} />} path="/random" />
      </MemoryRouter>
    );
    expect(wrapper.find("Switch component").text().trim()).toEqual("no data");
    expect(wrapper.find("UserRepoSearch")).toHaveLength(0);
  });
});