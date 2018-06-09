import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../Client';
import SocialButton from './LoginButton';

class Login extends Component {

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    
    return pathname || '/profile';
  };

  handleSocialLogin = (userApi) => {
     this.props.onSubmit(userApi);
  };

  handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  render() {
    if (this.props.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    } else {
      return (
        <div className='ui one column centered grid'>
          <div className='ten wide column'>
            <div
              className='ui raised very padded text container segment'
              style={{ textAlign: 'center' }}
            >
              <h2 className='ui green header'></h2>
              {
                this.props.loginInProgress ? (
                  <div className='ui active centered inline loader' />
                ) : (
                  <SocialButton
                    provider='google'
                    appId='729418284493-2ltv98ddqkjldkhd5lv2d0km7pm04j1q.apps.googleusercontent.com'
                    onLoginSuccess={this.handleSocialLogin}
                    onLoginFailure={this.handleSocialLoginFailure}
                    autoLogin={true}
                  >
                    Login with Facebook
                  </SocialButton>
                )
              }
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;