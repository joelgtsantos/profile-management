import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { reducer }  from '../redux-components/redux-reducer';
import { login, saveProfile }  from '../redux-components/redux-actions';
import TopBar from './TopBar';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Profile from './Profile';

import '../style/App.css';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const RdxLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
const RdxProfile = connect(mapStateToPropsProfile, mapDispatchToPropsProfile)(Profile);   

const App = () => (
  <Provider store={store}>
    <div className='ui grid'>
      <TopBar />
      <div className='spacer row' />
      <div className='row'>
        <Switch>
          <PrivateRoute path='/profile' component={RdxProfile} />
          <Route path='/login' component={RdxLogin} />
          <Route exact path='/' render={() => (
            <Redirect
              to='/profile'
            />
          )} />
        </Switch>
      </div>
    </div>
  </Provider>
);



function mapStateToProps(state){
  return {
    profile: state.profile,
    loginInProgress: state.loginInProgress,
    shouldRedirect: state.shouldRedirect,
  };
}

function mapDispatchToProps(dispatch){
  return {
    onSubmit: (user) => {
      dispatch(login(user));
    }
  };
}

function mapStateToPropsProfile(state){
  return {
    isLoading: state.isLoading,
    user: state.user,
    saveStatus: state.saveStatus
  };
}


function mapDispatchToPropsProfile(dispatch){
  return {
    onSubmit: (user) => {
      dispatch(saveProfile(user));
    }
  };
}


export default App;
