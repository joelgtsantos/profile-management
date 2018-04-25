import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import TopBar from './TopBar';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Profile from './Profile';

import '../style/App.css';


const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Switch>
        <PrivateRoute path='/profile' component={Profile} />
        <Route path='/login' component={Login} />
        <Route exact path='/' render={() => (
          <Redirect
            to='/profile'
          />
        )} />
      </Switch>
    </div>
  </div>
);

export default App;
