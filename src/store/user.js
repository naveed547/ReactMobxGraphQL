import { observable, computed, action, decorate} from 'mobx';
import {pageDefaults,getTimeStamp} from '../helper/helper';
import RepoStore from './repo';
//configure({enforceActions: true});
class user {
  sortBy='Oldest';
  filterBy=[];
  searchBy='';
  toggleBy='open';
  goToPageNo= pageDefaults.pageNumber;
  searchIssues = (filter) => {
    this.searchBy = filter;
  }
  
  filterIssues = (filter) => {
    this.filterBy.push(filter);
  }
  
  sortIssues = (filter) => {
    this.sortBy = filter;
  }
  
  toggleIssues = (filter) => {
    this.toggleBy = filter;
  }
  
  goToPage = (id) => {
    this.goToPageNo = id;
  }

  get getFilteredIssue () {
    let issueCopy = RepoStore.repoData.items.slice(); 
    let startIndex = (pageDefaults.perPage*(this.goToPageNo - 1));
    let _this = this;
    if(_this.toggleBy) {
      issueCopy = issueCopy.filter(issue => {
        return issue.node.state.toLowerCase().trim() === _this.toggleBy
      })
    }

    if(_this.searchBy) {
      issueCopy = issueCopy.filter(issue => {
        return issue.node.title.toLowerCase().trim().indexOf(_this.searchBy.trim()) !== -1
      })
    }

    if(_this.sortBy) {
      const sortBy = _this.sortBy.toLowerCase();
      switch(sortBy) {
        case 'oldest':
          issueCopy = issueCopy.sort(function(a, b){
            return getTimeStamp(a.node.updated_at) - getTimeStamp(b.node.updated_at);
          });
          break;
         case 'newest':
          issueCopy = issueCopy.sort(function(a, b){
            return getTimeStamp(b.node.updated_at) - getTimeStamp(a.node.updated_at);
          });
          //issueCopy = issueCopy.reverse();
          break;
        case 'least commented':
          issueCopy = issueCopy.sort(function(a, b){
            return a.node.comments.total_count - b.node.comments.total_count;
          });
          break;
        case 'most commented':
          issueCopy = issueCopy.sort(function(a, b){
            return b.node.comments.total_count - a.node.comments.total_count;
          });
          //issueCopy = issueCopy.reverse();
          break;
        default:
          console.log("new option added");
      }
    }
    return {
      numPages: new Array(Math.ceil(issueCopy.length/pageDefaults.perPage)).fill(1),
      filterIssues: issueCopy.slice(startIndex, (startIndex+pageDefaults.perPage))
    };
  }
}
decorate(user, {
  searchIssues: action,
  filterIssues: action,
  sortIssues: action,
  toggleIssues: action,
  goToPage: action,
  sortBy:observable,
  filterBy:observable,
  searchBy:observable,
  toggleBy:observable,
  goToPageNo:observable,
  getFilteredIssue: computed
});

const UserStore = new user();
export default UserStore;