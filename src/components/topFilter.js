import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject("RepoStore","UserStore")

@observer
class TopFilter extends Component {
  constructor(props) {
    super(props);
    this.RepoStore = this.props.RepoStore;
    this.UserStore = this.props.UserStore;
  }
  render() {
    if (this.RepoStore.repoData.open_count) {
      return (
        <div className="topFilter row">
        	<div className="col text-center">
            <button type="button" className={this.UserStore.toggleBy === 'open' ? 'btn btn-secondary':'btn btn-outline-secondary'} onClick={(e) => {this.UserStore.toggleIssues(this.UserStore.toggleBy === 'open' ? '' : 'open')}}>
              <i className="fa fa-exclamation-circle text-danger"></i> {this.RepoStore.repoData.open_count} Open
            </button>
            <button type="button" className={this.UserStore.toggleBy === 'closed' ? 'btn btn-secondary ml-1':'btn btn-outline-secondary ml-1'} onClick={(e) => {this.UserStore.toggleIssues(this.UserStore.toggleBy === 'closed' ? '' : 'closed')}}>
              <i className="fa fa-check text-success"></i> {this.RepoStore.repoData.closed_count} Closed
            </button>
          </div>
          <div className="col text-right">
            <select value={this.UserStore.sortBy} className="form-control" onChange={(e) => {this.UserStore.sortIssues(e.target.value)}}>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Commented</option>
              <option>Least Commented</option>
            </select>
          </div>
        </div>
      );
    } else {
      return ('');
    }
  }
}

/* TopFilter.propTypes = {
  sort: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  issuesCount: PropTypes.shape({
    open_count: PropTypes.number.isRequired,
    closed_count: PropTypes.number.isRequired
  }),
  sortFilter: PropTypes.string.isRequired,
  toggleFilter: PropTypes.string.isRequired
} */

export default TopFilter;