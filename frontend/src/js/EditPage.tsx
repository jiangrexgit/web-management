import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import style from '../style/InfoPage.module.css';
import { userInfo } from 'os';


interface EditPageProps {
    userInfo: any;
    allUserInfo: any;
    funcSelect: string
    getUserInfo(): void
    setTagSelect(tag: number, func?: string): void
}
interface EditPageState {
    warn: string;
}

class EditPage extends Component<EditPageProps, EditPageState> {
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
        const { allUserInfo, userInfo } = this.props
        let account: HTMLInputElement = document.getElementById('account') as HTMLInputElement
        let password: HTMLInputElement = document.getElementById('password') as HTMLInputElement
        let passwordCheck: HTMLInputElement = document.getElementById('passwordCheck') as HTMLInputElement
        let name: HTMLInputElement = document.getElementById('name') as HTMLInputElement
        let mail: HTMLInputElement = document.getElementById('mail') as HTMLInputElement
        let gender: HTMLOptionElement = document.getElementById('gender') as HTMLOptionElement

        let nameTxt = "";
        let pwTxt = "";
        let mailTxt = "";
        if (name.value === "") {
            nameTxt = userInfo['name'];
        } else {
            nameTxt = name.value;
        }
        if (password.value === "") {
            pwTxt = userInfo['password'];
        } else {
            pwTxt = password.value;
        }
        if (mail.value === "") {
            mailTxt = userInfo['mail'];
        } else {
            mailTxt = mail.value;
        }

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

        if (password.value === passwordCheck.value) {
            console.warn(pwTxt, nameTxt, mailTxt, password.value, name.value, mail.value, userInfo['password'], userInfo['name'], userInfo['mail']);
            Axios.post('http://localhost:3002/api/updateUser', {
                id: userInfo['id'],
                password: pwTxt,
                name: nameTxt,
                mail: mailTxt
            }).then((data) => {
                this.props.getUserInfo();
                this.props.setTagSelect(1, "員工資料");
            })
        }
    }

    render() {
        const { userInfo, allUserInfo, funcSelect, setTagSelect } = this.props
        const { warn } = this.state
        let date = new Date(userInfo['startworking'])
        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={2}>{"編輯資料"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funcSelect == "帳號管理" && <tr>
                                <td>員工編號</td>
                                <td>
                                    {userInfo['id']}
                                </td>
                            </tr>}
                            <tr>
                                <td>帳號</td>
                                <td>
                                    {
                                        userInfo['account']
                                    }
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
                                        <input className={style.Input} id={"name"} placeholder={funcSelect == "帳號管理" ? userInfo['name'] : "Name"} />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>信箱</td>
                                <td>
                                    <form onSubmit={this.onChange}>
                                        <input className={style.Input} id={"mail"} placeholder={funcSelect == "帳號管理" ? userInfo['mail'] : "Email"} />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>性別</td>
                                <td>
                                    {
                                        userInfo['gender']
                                    }
                                </td>
                            </tr>
                            {<tr>
                                <td>到職日</td>
                                <td>
                                    {

                                        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                    }
                                </td>
                            </tr>}
                        </tbody>
                    </table>
                    <div className={style.WarningText}>{warn}</div>
                    <div className={style.BtnCon}>
                        <div className={style.commitBtn} onClick={this.submitUser}><div className={style.checkIcon}></div></div>
                        <div className={style.cancelBtn} onClick={() => { setTagSelect(1, "員工資料") }}><div className={style.cancelIcon}></div></div>
                    </div>
                </div>
            </div >
        );
    }
}

export default EditPage;