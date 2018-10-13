import React from "react";
//import {mount} from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TopFilter from "../../components/topFilter";
//import initialState from '../../reducers/initialState';
//import repoMock from "../data/mock";

describe("TopFilter", () => {
    it('TopFilter component renders correctly', () => {
        const props = {
            sort: jest.fn(),
            toggle: jest.fn(),
            issuesCount: {
              open_count: 1000,
              closed_count: 500
            },
            sortFilter: 'Oldest',
            toggleFilter: 'open'
        };
        const rendered = renderer.create(
            <MemoryRouter>
                <TopFilter {...props} />
            </MemoryRouter>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
    /* it("displays the userRepoSearch component when it has fetched users", () => {
        const props = {
            loadRepos: jest.fn(),
            repoDetails: {
                ...initialState.repoDetails,
                repoData:   repoMock.userRepos
            }
        };

        const container = mount(
            <MemoryRouter>
                <UserRepoSearch {...props} />
            </MemoryRouter>
        );
        expect(container.find('.user-name').text()).toEqual(props.repoDetails.userName);
        expect(container.find('.repo-list li').length).toEqual(props.repoDetails.repoData.length);
    });
  
    it("does not display the userRepoSearch when ther are no users", () => {
        const props = {
            loadRepos: jest.fn(),
            repoDetails: {
                userName: ' ',
		        currentRepo: ' ',
                repoData:   []
            }
        };
    
        const container = mount(
            <MemoryRouter>
                <UserRepoSearch {...props} />
            </MemoryRouter>
        );
        expect(container.find('.user-name').text()).toEqual(' ');
        expect(container.find('.repo-list li').length).toEqual(0);
    }); */
  });
  