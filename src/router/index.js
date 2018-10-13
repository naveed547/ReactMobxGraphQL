import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
 
import {IssueDescription} from '../pages/issueDescription';
import {IssueList} from '../pages/issueList';
import UserRepoSearch from '../pages/userRepoSearch';

class Routes extends Component {
    render() {
     
        return (
           // <BrowserRouter>
                 <div className="container">
                    <Switch>
                        <Route exact strict path="/" component={UserRepoSearch} />
                        <Route path="/issueList/:user/:repo"   component={IssueList} />
                        <Route path="/issue/:user/:repo/:issueId"   component={IssueDescription} />
                        <Route component={render => (<div>no data </div>)} />
                    </Switch>
                </div>     
            //</BrowserRouter>
        )
    }
};

export default Routes;