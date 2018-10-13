import React, { Component } from 'react';
import '../components/description.scss';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject("RepoStore")

@observer 
class UserRepoSearch extends Component {
  constructor(props) {
    super(props);
		this.userName = React.createRef();
		
		this.store = this.props.RepoStore;
  }
  selectRepo = event => {
  	event.preventDefault();
  	const user = this.userName.current.value;
    this.store.loadRepos(user);
  }
  componentDidMount() {
		this.store.loadRepos(this.store.userName);
  }
  renderForm = () => {
      return (
		<form name="repoSearch" className="form-inline justify-content-center" onSubmit={(e) => {e.preventDefault();this.store.loadRepos(this.userName.current.value)}}>
		  <div className="form-group mb-2 mr-2">
		    <label htmlFor="userName" className="sr-only">Password</label>
		    <input type="text" className="form-control" id="userName" onChange={() => {}} name="user" ref={this.userName} value={this.store.userName} placeholder="Search Git user name" />
		  </div>
		  <button type="submit" className="btn btn-primary mb-2">Search</button>
		</form>
      );
  }
  renderRepoList() {
  	if (!this.store.repoData.length) {
  		return (<div>Loading...</div>);
  	} else {
  		return this.store.repoData.map((repo,index) => {
  			return (
  				<li className="list-group-item" key={repo.node.id}>
						<Link to={`/issueList/${this.store.userName}/${repo.node.name}`}>
							{repo.node.name}
						</Link>
  				</li>
  			)
  		})
  	}
  }
  render() {
  	return (
			<div>
				<h2 className="my-5 text-center">Search User and Repo</h2>
				User Name: <span className="user-name">{this.store.userName}</span> <br/>
				<div className="card">
					<div className="card-header">
						 {this.renderForm()} 
					</div>
					<ul className="list-group list-group-flush repo-list">{this.renderRepoList()}</ul>
				</div>
			</div>
	    );
  } 
}
export default UserRepoSearch;

