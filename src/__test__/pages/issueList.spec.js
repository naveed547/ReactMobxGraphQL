import React from "react";
import {mount} from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import {IssueList} from "../../pages/IssueList";
import initialState from '../../reducers/initialState';
import repoMock from "../data/mock";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";

describe("IssueList", () => {
    let mapData = Object.assign({},repoMock.allIssues);
        mapData['open_count'] = repoMock.openIssues.total_count;
        mapData['closed_count'] = mapData.total_count - mapData.open_count;
    const mockStore = configureMockStore();
    const store = mockStore({reposReducer: {
        userName: 'twbs',
        currentRepo: 'bootstrap',
        repoData:   mapData
    },
    userReducer: {
        ...initialState.filter
    }}); 
    it('IssueList component renders correctly', () => {
        /* let mapData = Object.assign({},repoMock.allIssues);
        mapData['open_count'] = repoMock.openIssues.total_count;
        mapData['closed_count'] = mapData.total_count - mapData.open_count; */
        const props = {
            loadIssues: jest.fn(),
            repoDetails: {
                ...initialState.repoDetails,
                repoData:   mapData,
            },
            count: mapData.total_count,
            match:{
                params:{
                    repo: repoMock.repoName,
                    user: repoMock.userName
                }
            }
        };
        const rendered = renderer.create(
            <Provider store={store}>
            <MemoryRouter>
                <IssueList {...props} />
            </MemoryRouter>
            </Provider>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
    it("displays the IssueList component when it has fetched users", () => {
        /* let mapData = Object.assign({},repoMock.allIssues);
        mapData['open_count'] = repoMock.openIssues.total_count;
        mapData['closed_count'] = mapData.total_count - mapData.open_count; */
        const props = {
            loadIssues: jest.fn(),
            repoDetails: {
                ...initialState.repoDetails,
                repoData:   mapData,
            },
            count: mapData.total_count,
            match:{
                params:{
                    repo: repoMock.repoName,
                    user: repoMock.userName
                }
            }
        };
        const container = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <IssueList {...props} />
                </MemoryRouter>
            </Provider>
        );
        expect(container.find('.user-name').text()).toEqual(props.repoDetails.userName);
        expect(container.find('.repo-name').text()).toEqual(props.repoDetails.currentRepo);
    });
  
    it("does not display the IssueList when ther are no users", () => {
       /*  let mapData = Object.assign({},repoMock.allIssues);
        mapData['open_count'] = repoMock.openIssues.total_count;
        mapData['closed_count'] = mapData.total_count - mapData.open_count; */
        const props = {
            loadIssues: jest.fn(),
            repoDetails: {
                userName: ' ',
                repoData:   [],
                repoName: ' '
            },
            count: 0,
            match:{
                params:{
                    repo: repoMock.repoName,
                    user: repoMock.userName
                }
            }
        };
        
        const container = mount(
            <Provider store={store}>
                <MemoryRouter>
                   <IssueList {...props} />   
                </MemoryRouter>
            </Provider>
        );
        expect(container.find('.user-name').text()).toEqual(' ');
        expect(container.find('.repo-name').text()).toEqual('');
    });
  });
  