import React, { Component } from 'react';
import style from '../style/LoginPage.module.css';
import icon from '../image/human-resources.png';
import enterIcon from '../image/enter.png';
import userIcon from '../image/user.png';
import passwordIcon from '../image/password.png';

interface LoginPageProps {
    setIsLogin(): void
}
interface LoginPageState {
    time: string;
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString()
        }
        setInterval(this.ShowTime, 1000);
    }

    ShowTime = () => {
        let date = new Date();
        this.setState({
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString()
        })
    }
    render() {
        const { time } = this.state;
        const { setIsLogin } = this.props
        return (
            <div className={style.FullPage}>
                <div className={style.TitleBar}>
                    <img src={icon} alt="" className={style.TitleIcon} />
                    <div className={style.TitleText}>
                        考勤小幫手
                    </div>

                    <div className={style.TimeText}>
                        {time}
                    </div>

                </div>

                <div className={style.LoginCon}>
                    <div className={style.TextCon}>
                        <div className={style.UserCon}>
                            <img src={userIcon} alt="" className={style.UserIcon} />
                            <input className={style.Input} placeholder="Account" />
                        </div>
                        <div className={style.PasswordCon}>
                            <img src={passwordIcon} alt="" className={style.UserIcon} />
                            <input className={style.Input} type={"password"} placeholder="Password" />
                        </div>
                    </div>
                    <img src={enterIcon} alt="" className={style.LoginIcon} onClick={() => { setIsLogin() }} />

                </div>
            </div>
        );
    }
}

export default LoginPage;