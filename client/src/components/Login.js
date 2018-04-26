import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../Client';
import SocialButton from './LoginButton';



class Login extends Component {
  state = {
    loginInProgress: false,
    shouldRedirect: false,
  };

  performLogin = () => {
    this.setState({ loginInProgress: true });
    client.login().then(() => (
      this.setState({ shouldRedirect: true })
    ));
  };

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    
    return pathname || '/profile';
  };

  render() {
    if (this.state.shouldRedirect) {
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
              <h2 className='ui green header'>
                
              </h2>
              {
                this.state.loginInProgress ? (
                  <div className='ui active centered inline loader' />
                ) : (
                  <div
                    className='ui large green submit button'
                    onClick={this.performLogin}
                  >
                    Login
                  </div>
                  <SocialButton
                    provider='facebook'
                    appId='YOUR_APP_ID'
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
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
