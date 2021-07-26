import React, { Component } from 'react';
import style from '../style/LoginPage.module.css';
import icon from '../image/human-resources.png';
import enterIcon from '../image/enter.png';
import userIcon from '../image/user.png';
import passwordIcon from '../image/password.png';

interface LoginPageProps {
}

class LoginPage extends Component<LoginPageProps> {
    render() {
        return (
            <div className={style.FullPage}>
                <div className={style.TitleBar}>
                    <img src={icon} alt="" className={style.TitleIcon} />
                    <div className={style.TitleText}>
                        考勤小幫手
                    </div>

                </div>

                <div className={style.LoginCon}>
                    <div className={style.TextCon}>
                        <div className={style.UserCon}>
                            <img src={userIcon} alt="" className={style.UserIcon} />
                            <input className={style.Input} placeholder="Account"/>
                        </div>
                        <div className={style.PasswordCon}>
                            <img src={passwordIcon} alt="" className={style.UserIcon} />
                            <input className={style.Input} placeholder="Password"/>
                        </div>
                    </div>
                    <img src={enterIcon} alt="" className={style.LoginIcon} />

                </div>
            </div>
        );
    }
}

export default LoginPage;