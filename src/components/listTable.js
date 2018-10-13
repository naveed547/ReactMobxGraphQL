import React, { Component } from 'react';
import Pagination from './pagination';
import Issue from './issue';
//import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject("RepoStore","UserStore")

@observer
class IssueTable extends Component {
	constructor(props) {
    super(props);
    this.RepoStore = this.props.RepoStore;
    this.UserStore = this.props.UserStore;
  }
  render() {
  	if (this.RepoStore.repoData.items.length) {
			let getPageData = this.UserStore.getFilteredIssue;
	    return ( 
	    	<React.Fragment>
	    		<ul className="list-group list-group-flush">
					{getPageData.filterIssues.map((issue) => (<Issue key={issue.node.number} {...issue.node}></Issue>))}
				</ul>
				<Pagination activePage={this.UserStore.goToPageNo} 
				 	 	numPage={getPageData.numPages}
				 	 	onClick={(index) => this.UserStore.goToPage(index)}>
				</Pagination>
			</React.Fragment>
	    );
	}else {
		return (
			<div>Loading...</div>
		)
	}
  }
}


/* IssueTable.propTypes = {
  go: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  numPage: PropTypes.array.isRequired,
  goToFilter: PropTypes.number.isRequired
} */



export default IssueTable;