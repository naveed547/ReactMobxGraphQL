import React, { Component } from 'react';
import { Router} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.scss';

import {Provider} from "mobx-react";
import RepoStore from "./store/repo";
import UserStore from "./store/user";

import Routes from './router';

import { createBrowserHistory } from 'history';

const history=createBrowserHistory();
const store = {RepoStore,UserStore};

class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <div className="container">
          <h1 className="text-center">GitHub Issue API</h1>
          <Router history={history}>
            <Routes />
          </Router>
        </div>
      </Provider>
    );
  }
}
export default App;
