import { connect } from 'react-redux'
import * as actions from "../actions/userAction";
import InputSearchFilter from '../components/inputSearchFilter';
import TopFilter from '../components/topFilter';
import IssueTable from '../components/listTable';
import {pageDefaults,getTimeStamp} from './helper';

class stateActionMapper {
  
  mapDispatchToPropISF (dispatch) {
    return {
      search: (text) => {
        dispatch(actions.searchIssues(text))
      }
    }
  }

  mapDispatchToPropTF (dispatch) {
    return {
      sort: (text) => {
        dispatch(actions.sortIssues(text))
      },
      toggle: (text) => {
        dispatch(actions.toggleIssues(text))
      }
    }
  }

  mapStateToPropsTF (state) {
    //console.log(state);
    return {
        issuesCount: {
          open_count: state.reposReducer.repoData.open_count,
          closed_count: state.reposReducer.repoData.closed_count
        },
        sortFilter: state.userReducer.sortBy,
        toggleFilter: state.userReducer.toggleBy
    }
  }

  mapDispatchToPropLT (dispatch) {
    return {
      go: (pageNo) => {
        dispatch(actions.goToPage(pageNo))
      }
    }
  }

  mapStateToPropsLT = (state) => {
    let filteredIssues = this.getFilteredIssue(state.reposReducer.repoData.items,state.userReducer);
    let startIndex = (pageDefaults.perPage*(state.userReducer.goToPage - 1));
    return {
        numPage: this.getNoOfPages(filteredIssues),
        issues: filteredIssues.slice(startIndex, (startIndex+pageDefaults.perPage)),
        goToFilter: state.userReducer.goToPage
    }
  }

  getNoOfPages (issues) {
    return new Array(Math.ceil(issues.length/pageDefaults.perPage)).fill(1);
  }

  getFilteredIssue (issues,filters) {
    let issueCopy = issues.slice(); 

    if(filters.toggleBy) {
      issueCopy = issueCopy.filter(issue => {
        return issue.state === filters.toggleBy
      })
    }

    if(filters.searchBy) {
      issueCopy = issueCopy.filter(issue => {
        return issue.title.toLowerCase().trim().indexOf(filters.searchBy.trim()) !== -1
      })
    }

    if(filters.sortBy) {
      const sortBy = filters.sortBy.toLowerCase();
      switch(sortBy) {
        case 'oldest':
          issueCopy = issueCopy.sort(function(a, b){
            return getTimeStamp(a.updated_at) - getTimeStamp(b.updated_at);
          });
          break;
         case 'newest':
          issueCopy = issueCopy.sort(function(a, b){
            return getTimeStamp(b.updated_at) - getTimeStamp(a.updated_at);
          });
          //issueCopy = issueCopy.reverse();
          break;
        case 'least commented':
          issueCopy = issueCopy.sort(function(a, b){
            return a.comments - b.comments;
          });
          break;
        case 'most commented':
          issueCopy = issueCopy.sort(function(a, b){
            return b.comments - a.comments;
          });
          //issueCopy = issueCopy.reverse();
          break;
        default:
          console.log("new option added");
      }
    }

    return issueCopy;
  }

}

const stateActionMap = new stateActionMapper();

export const ISFMapper = connect(null,stateActionMap.mapDispatchToPropISF)(InputSearchFilter);
export const TFMapper = connect(stateActionMap.mapStateToPropsTF,stateActionMap.mapDispatchToPropTF)(TopFilter);
export const LTMapper = connect(stateActionMap.mapStateToPropsLT,stateActionMap.mapDispatchToPropLT)(IssueTable);
