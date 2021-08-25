import React, { Component, createRef } from 'react';
import Axios from 'axios'
import style from '../style/LoginPage.module.css';
import icon from '../image/human-resources.png';
import enterIcon from '../image/enter.png';
import userIcon from '../image/user.png';
import passwordIcon from '../image/password.png';

interface LoginPageProps {
    setIsLogin(isLogin: boolean): void;
    setUserInfo(info: object): void
    setAllUserInfo(info: any): void
}
interface LoginPageState {
    time: string,
    accountText: string,
    passwordText: string,
    isWarning: boolean
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
    private accountInput: any;
    private passwordInput: any;
    constructor(props: any) {
        super(props);
        this.accountInput = createRef();
        this.passwordInput = createRef();

        let date = new Date();
        this.state = {
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString(),
            accountText: '',
            passwordText: '',
            isWarning: false
        }
    }

    componentDidMount = () => {
        setInterval(this.showTime, 1000);
    }

    componentWillUnmount = () => {
        this.setState = () => false;
    }

    getId = (e: any) => {
        e.preventDefault();

        Axios.get("http://localhost:3002/api/get").then((data:any) => {
            this.checkAccount(data.data)
            this.props.setAllUserInfo(data.data)
        });
    }

    onTextChange = (e: any) => {
        if (e.currentTarget.id === "Account") {
            this.setState({
                accountText: e.currentTarget.value
            })
        } else {
            this.setState({
                passwordText: e.currentTarget.value
            })
        }
    }

    checkAccount = (data: Array<any>) => {

        this.setState({
            accountText: 'admin',
            passwordText: 'admin',
        })
        const { accountText, passwordText } = this.state;
        const { setIsLogin, setUserInfo } = this.props;
        console.log(accountText, passwordText)

        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            if (accountText === data[i]['account'] && passwordText === data[i]['password']) {
                setIsLogin(true);
                setUserInfo(data[i]);
            } else {
                // if (accountText === "" || passwordText === "") {
                //     this.setState({
                //         isWarning: true
                //     })
                //     if (this.accountInput.current) this.accountInput.current.value = '';
                //     if (this.passwordInput.current) this.passwordInput.current.value = '';
                // }

            }
        }
    }

    handleWarningClick = () => {
        this.setState({
            isWarning: false
        })
    }

    showTime = () => {
        let date = new Date();
        this.setState({
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString()
        })
    }
    render() {
        const { time, isWarning } = this.state;
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
                            <form onSubmit={this.getId}>
                                <input className={style.Input} id={"Account"} placeholder="Account" onChange={this.onTextChange} ref={this.accountInput} />
                            </form>
                        </div>
                        <div className={style.PasswordCon}>
                            <img src={passwordIcon} alt="" className={style.UserIcon} />
                            <form onSubmit={this.getId}>
                                <input className={style.Input} type={"password"} id={"Password"} placeholder="Password" onChange={this.onTextChange} ref={this.passwordInput} />
                            </form>
                        </div>
                    </div>
                    <img src={enterIcon} alt="" className={style.LoginIcon} onClick={this.getId} />

                </div>
                <div className={style.warningBG} style={{ display: isWarning ? "flex" : "none" }}>
                    <div className={style.warningCon}>
                        <div className={style.warningIcon}></div>
                        <div className={style.warningText}>{"帳號或密碼輸入錯誤，請再試一次"}</div>
                        <div className={style.warningCancel} onClick={this.handleWarningClick}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;