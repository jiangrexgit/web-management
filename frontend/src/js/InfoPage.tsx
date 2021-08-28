import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/InfoPage.module.css';
import deleteIcon from '../image/trash.png';
import managementIcon from '../image/gear.png';


interface InfoPageProps {
    isSignUp: boolean
    userInfo: any;
    allUserInfo: any;
    setIsSignUp(flag: boolean): void
    getUserInfo(): void
}
interface InfoPageState {
    warn: string;
}

class InfoPage extends Component<InfoPageProps, InfoPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            warn: ''
        }
    }

    componentDidMount = () => {
    }

    componentWillUnmount = () => {
        this.setState = () => false;
    }

    onPasswordChange = (e: any) => {
        e.preventDefault();
        let password: HTMLInputElement = document.getElementById('password') as HTMLInputElement
        let passwordCheck: HTMLInputElement = document.getElementById('passwordCheck') as HTMLInputElement
        if (password.value !== "" && passwordCheck.value !== "") {
            if (password.value !== passwordCheck.value) {
                this.setState({
                    warn: "兩次密碼輸入不同"
                })
            } else {
                this.setState({
                    warn: ""
                })
            }
        }
    }

    onChange = (e: any) => {
        e.preventDefault();
    }

    submitUser = () => {
        const { allUserInfo } = this.props
        let account: HTMLInputElement = document.getElementById('account') as HTMLInputElement
        let password: HTMLInputElement = document.getElementById('password') as HTMLInputElement
        let passwordCheck: HTMLInputElement = document.getElementById('passwordCheck') as HTMLInputElement
        let name: HTMLInputElement = document.getElementById('name') as HTMLInputElement
        let mail: HTMLInputElement = document.getElementById('mail') as HTMLInputElement
        let gender: HTMLOptionElement = document.getElementById('gender') as HTMLOptionElement

        let str = ""
        if (account.value === "") {
            str += "帳號";
        }
        if (password.value === "") {
            if (str === "") {
                str += "密碼";
            } else {
                str += ", 密碼";
            }
        }
        if (passwordCheck.value === "") {
            if (str === "") {
                str += "確認密碼";
            } else {
                str += ", 確認密碼";

            }
        }
        if (name.value === "") {
            if (str === "") {
                str += "姓名";
            } else {
                str += ", 姓名";
            }
        }
        if (mail.value === "") {
            if (str === "") {
                str += "信箱";
            } else {
                str += ", 信箱";

            }
        }
        if (gender.value === "性別") {
            if (str === "") {
                str += "性別";
            } else {
                str += ", 性別";
            }
        }

        console.warn(allUserInfo.length, gender.value);

        if (str !== "") {
            str += "未輸入"
            this.setState({
                warn: str,
            })
        } else {
            this.setState({
                warn: "",
            })
            console.warn(allUserInfo.length, gender.value);
            let l = allUserInfo.length;
            let str = "";
            if (l < 10000000) {
                if (l < 1000000) {
                    if (l < 100000) {
                        if (l < 10000) {
                            if (l < 1000) {
                                if (l < 100) {
                                    if (l < 10) {
                                        str = "0000000" + l;
                                    } else {
                                        str = "000000" + l;
                                    }
                                } else {
                                    str = "00000" + l;
                                }
                            } else {
                                str = "0000" + l;
                            }
                        } else {
                            str = "000" + l;
                        }
                    } else {
                        str = "00" + l;
                    }
                } else {
                    str = "0" + l;
                }
            } else {
                str = l
            }

            console.warn(str);

            Axios.post('http://localhost:3002/api/adduser', {
                id: str,
                account: account.value,
                password: password.value,
                name: name.value,
                mail: mail.value,
                gender: gender.value
            }).then((data) => { this.props.getUserInfo(); this.props.setIsSignUp(false) })

        }
        for (let i = 0; i < allUserInfo.length; i++) {
            if (account.value === allUserInfo[i]['account']) {
                this.setState({
                    warn: "帳號重複"
                })
            }
        }
    }

    render() {
        const { isSignUp, userInfo, allUserInfo, setIsSignUp } = this.props
        const { warn } = this.state

        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={2}>{isSignUp ? "註冊會員" : "編輯資料"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>帳號</td>
                                <td>
                                    <form onSubmit={this.onChange}>
                                        <input className={style.Input} id={"account"} placeholder="Account" />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>密碼</td>
                                <td>
                                    <form onSubmit={this.onChange}>
                                        <input className={style.Input} type={"password"} id={"password"} placeholder="Password" />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>確認密碼</td>
                                <td>
                                    <form onSubmit={this.onPasswordChange} onBlur={this.onPasswordChange}>
                                        <input className={style.Input} type={"password"} id={"passwordCheck"} placeholder="Password" />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>姓名</td>
                                <td>
                                    <form onSubmit={this.onChange}>
                                        <input className={style.Input} id={"name"} placeholder="Name" />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>信箱</td>
                                <td>
                                    <form onSubmit={this.onChange}>
                                        <input className={style.Input} id={"mail"} placeholder="Email" />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>性別</td>
                                <td>
                                    <select id={"gender"}>
                                        <option>性別</option>
                                        <option value="Male">男</option>
                                        <option value="Feale">女</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={style.WarningText}>{warn}</div>
                    <div className={style.BtnCon}>
                        <div className={style.commitBtn} onClick={this.submitUser}><div className={style.checkIcon}></div></div>
                        <div className={style.cancelBtn} onClick={() => { setIsSignUp(false) }}><div className={style.cancelIcon}></div></div>
                    </div>
                </div>
            </div >
        );
    }
}

export default InfoPage;