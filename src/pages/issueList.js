import React, { Component } from 'react';
//import {bindActionCreators} from "redux";
//import {connect} from "react-redux";
import '../components/list.scss';
//import {ISFMapper,TFMapper,LTMapper} from '../helper/stateActionMapper';
//import * as actions from "../actions/repoAction";
import InputSearchFilter from '../components/inputSearchFilter';
import TopFilter from '../components/topFilter';
import IssueTable from '../components/listTable';
import { observer, inject } from 'mobx-react';

@inject("RepoStore","UserStore")

@observer
export class IssueList extends Component {
	constructor(props) {
		super(props);
		
		this.RepoStore = this.props.RepoStore;
		this.UserStore = this.props.UserStore;
	}
	componentDidMount() {
		this.RepoStore.loadIssues(this.props.match.params.repo,this.props.match.params.user);
	}
	render() {
		if (this.RepoStore.repoData.total_count !== undefined) {
		    return (
				<React.Fragment>
					<h2 className="text-center my-5">Issues List <span className="my-5 text-center">{this.RepoStore.repoData.total_count ? `(${this.RepoStore.repoData.total_count})` : ''} </span></h2>
					User Name: <span className="user-name">{this.RepoStore.userName}</span> <br/>
	      			Repo Name: <span className="repo-name">{this.RepoStore.currentRepo}</span> <br/>
	      			{this.RepoStore.repoData.total_count ? (
				        <div className="card">
							<div className="card-header row mx-0">
								<div className="col-sm-4">
									<InputSearchFilter search={this.UserStore.searchIssues} />
								</div>
								<div className="col-sm-8">
									<TopFilter />
								</div>
							</div>
							<IssueTable />	
						</div>
				      ) : (
				        <div className="my-5 text-center">No data found for this user</div>
				      )}
				</React.Fragment>
		    );
		}
		else {
			return (
				<div className="my-5 text-center">Loading...</div>
			)
		}
	}

  
}