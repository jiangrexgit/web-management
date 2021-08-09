import React, { Component } from 'react';
import '../style/App.css';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

interface AppProps {
}
interface AppState {
  isLogin: boolean;
}
class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  setIsLogin = () => [
    this.setState({
      isLogin: !this.state.isLogin
    })
  ]

  render() {
    const { isLogin } = this.state
    return (
      <div className="App">
        {!isLogin && <LoginPage setIsLogin={this.setIsLogin} />}
        {isLogin && <MainPage />}
      </div>
    );
  }
}

export default App;
