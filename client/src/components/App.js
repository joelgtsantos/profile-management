import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { reducer }  from '../redux-components/redux-reducer';
import { login }  from '../redux-components/redux-actions';
import TopBar from './TopBar';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Profile from './Profile';

import '../style/App.css';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const ReduxLogin = connect(mapStateToProps, mapDispatchToProps)(Login);      

const App = () => (
  <Provider store={store}>
    <div className='ui grid'>
      <TopBar />
      <div className='spacer row' />
      <div className='row'>
        <Switch>
          <PrivateRoute path='/profile' component={Profile} />
          <Route path='/login' component={ReduxLogin} />
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
    isLoading: state.isLoading,
    fields: state.person,
    user: state.user,
    saveStatus: state.saveStatus,
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


export default App;
