import React, { Component } from 'react';
import Axios from 'axios'
import '../style/App.css';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

interface AppProps {
}
interface AppState {
  isLogin: boolean,
  isSignUp: boolean,
  userInfo: object,
  allUserInfo: object
}
class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
      isSignUp: false,
      userInfo: {},
      allUserInfo: []
    }
  }
  componentDidMount = () => {
    this.getUserInfo();
  }

  setIsLogin = (isLogin: boolean) => {
    this.setState({
      isLogin: isLogin
    })
  }

  setIsSignUp = (flag: boolean) => {
    this.setState({
      isSignUp: flag
    })
  }

  setUserInfo = (info: object) => {
    this.setState({
      userInfo: info
    })
  }


  setAllUserInfo = (info: any) => {
    this.setState({
      allUserInfo: info
    })
  }

  getUserInfo = () => {
    Axios.get("http://localhost:3002/api/get").then((data: any) => {
      this.setState({
        allUserInfo: data.data
      })
    });
  }

  render() {
    const { isLogin, isSignUp, userInfo, allUserInfo } = this.state
    return (
      <div className="App">
        {(!isLogin && !isSignUp) && <LoginPage setIsLogin={this.setIsLogin} setUserInfo={this.setUserInfo} setIsSignUp={this.setIsSignUp} />}
        {(isLogin || isSignUp) && <MainPage isSignUp={isSignUp} setIsLogin={this.setIsLogin} setIsSignUp={this.setIsSignUp} userInfo={userInfo} allUserInfo={allUserInfo} getUserInfo={this.getUserInfo} />}
      </div>
    );
  }
}

export default App;
