import { observable,action, decorate} from 'mobx';
import client,{GET_REPOS,GET_ALLISSUES,GET_SINGLEISSUE} from './queries';

class repo {
	userName= 'twbs';
	currentRepo= 'bootstrap';
	repoData= [];
    loadIsuuesSuccess(issues,repoName) {
        let mapData = Object.assign({},issues['closedIssues'].issues,issues['openIssues'].issues);
        mapData['total_count'] = mapData['closed_count']+mapData['open_count'];
        mapData['items'].push(...issues['closedIssues'].issues.items);
        this.repoData = mapData;
        console.log(issues);
        this.currentRepo = repoName;
    }

    loadIsuueSuccess(issues) {
        this.repoData = issues.issue;
    }

    loadRepoSuccess(repoDetails) {
        this.repoData = repoDetails.repos;
        this.userName = repoDetails.userName;
    }

    setUserName(userName) {
        this.userName = userName;
    }

    loadIssues(repoName,userName) {
        var _this = this;
        /* let arr =[];
        arr.push(client.query({
            query: GET_ALLISSUES,
            variables: {
                username: userName,
                reponame: repoName
            },
        }));
        arr.push(client.query({
            query: GET_OPENISSUES,
            variables: {
                username: userName,
                reponame: repoName
            },
        }));
        return axios.all(arr).then(result => {
            _this.loadIsuuesSuccess(result,repoName);
        }); */
        return client.query({
            query: GET_ALLISSUES,
            variables: {
                username: userName,
                reponame: repoName
            },
        }).then(result => {
            _this.loadIsuuesSuccess(result.data,repoName);
        });
    }


    loadIssue(issueNumber,userName,repoName) {
        var _this = this;
        /* return axios
        .get(`https://api.github.com/repos/${userName}/${repoName}/issues/${issueNumber}`)
        .then(issues => {
            _this.loadIsuueSuccess(issues.data);
        })
        .catch(err => {
            throw err;
        }); */
        return client.query({
            query: GET_SINGLEISSUE,
            variables: {
                username: userName,
                reponame: repoName,
                issuenumber: parseInt(issueNumber)
            },
        }).then(result => {
            _this.loadIsuueSuccess(result.data.repository);
        });
    }

    loadRepos(userName) {
        var _this = this;
        return client.query({
            query: GET_REPOS,
            variables: {
                organization: userName,
            },
        }).then(repos => {
            _this.loadRepoSuccess({
                repos:repos.data.repositoryOwner.repositories.edges,
                userName:userName
            });
        })
        .catch(err => {
            throw err;
        });
        /* return axios
        .get(`https://api.github.com/users/${userName}/repos`)
        .then(repos => {
            _this.loadRepoSuccess({
            repos:repos.data,
            userName:repos.data[0].owner.login
            });
        })
        .catch(err => {
            throw err;
        }); */
    }

}
decorate(repo, {
  loadRepos: action,
  loadIssue: action,
  loadIssues: action,
  setUserName: action,
  userName: observable,
  currentRepo: observable,
  repoData: observable
});

const RepoStore = new repo();
export default RepoStore;