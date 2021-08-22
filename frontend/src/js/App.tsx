import React, { Component } from 'react';
import '../style/App.css';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

interface AppProps {
}
interface AppState {
  isLogin: boolean,
  userInfo: object,
  allUserInfo: object
}
class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: {},
      allUserInfo: []
    }
  }

  setIsLogin = (isLogin: boolean) => {
    this.setState({
      isLogin: isLogin
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

  render() {
    const { isLogin, userInfo ,allUserInfo} = this.state
    return (
      <div className="App">
        {!isLogin && <LoginPage setIsLogin={this.setIsLogin} setUserInfo={this.setUserInfo} setAllUserInfo={this.setAllUserInfo} />}
        {isLogin && <MainPage setIsLogin={this.setIsLogin} userInfo={userInfo} allUserInfo={allUserInfo} />}
      </div>
    );
  }
}

export default App;
