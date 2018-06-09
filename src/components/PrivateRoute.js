import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from '../Client';

const PrivateRoute = ({ component, user, ...rest }) => (
  <Route {...rest} render={(props) => (
      client.isLoggedIn() //&& Object.keys(user).length !== 0 
      ?( 
          React.createElement(component, props) 
          //console.log(user)
        ) 
      :(
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }} />
      )
    )} 
  />
);

export default PrivateRoute;
