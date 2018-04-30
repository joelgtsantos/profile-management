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
    /*
      t {_provider: "google", _profile: {…}, _token: {…}}
        _profile
        :
        {id: "117633623171650767683", name: "Joel Santos", firstName: "Joel", lastName: "Santos", email: "alekspunx@gmail.com", …}
        _provider
        :
        "google"
        _token
        :
        {accessToken: "ya29.GlupBfgK5kEey8tdCicMy2pzyMNjYCFmCclEKBPhBLaM0…MGz_9Td4qyuczKpDo0XqD62kH4AVllRSPRzlgz9-o7_EUdVFx", idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZmM2MjkwN2E0NDYxOD…Qd-9Iexn6e_aKFiY-6B_Odrh3ME6YyPgIQ_-3p3FeHOOyiCLg", scope: "https://www.googleapis.com/auth/userinfo.email htt….googleapis.com/auth/plus.me openid email profile", expiresIn: 3600, firstIssued_at: 1524771790103, …}
        profile
    */
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
              <h2 className='ui green header'>
                
              </h2>
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
