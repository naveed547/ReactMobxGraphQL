


/* IssueTable.propTypes = {
  go: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  numPage: PropTypes.array.isRequired,
  goToFilter: PropTypes.number.isRequired
} */



import React from "react";
//import {mount} from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import IssueTable from "../../components/listTable";
//import initialState from '../../reducers/initialState';
import repoMock from "../data/mock";

describe("IssueTable", () => {
    it('IssueTable component renders correctly', () => {
        const props = {
						go: jest.fn(),
						issues: repoMock.allIssues.items,
						numPage: new Array(Math.ceil(repoMock.allIssues.items.length/10)).fill(1),
						goToFilter: 2
        };
        const rendered = renderer.create(
            <MemoryRouter>
                <IssueTable {...props} />
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
  