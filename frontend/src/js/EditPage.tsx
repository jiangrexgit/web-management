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
    auth: string
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
        let password: HTMLInputElement = document.getElementById('password') as HTMLInputElement
        let passwordCheck: HTMLInputElement = document.getElementById('passwordCheck') as HTMLInputElement
        let name: HTMLInputElement = document.getElementById('name') as HTMLInputElement
        let mail: HTMLInputElement = document.getElementById('mail') as HTMLInputElement
        let salary: HTMLInputElement = document.getElementById('salary') as HTMLInputElement
        let auth: HTMLOptionElement = document.getElementById('auth') as HTMLOptionElement

        let nameTxt = "";
        let pwTxt = "";
        let mailTxt = "";
        let salaryTxt = "";
        let authTxt = "";
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

        if (salary) {
            if (salary.value === "") {
                salaryTxt = userInfo['salary'];
            } else {
                salaryTxt = salary.value;
            }
        } else {
            salaryTxt = userInfo['salary'];
        }
        if (auth.value === "權限") {
            authTxt = userInfo['auth'];
        } else {
            authTxt = auth.value;
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
            Axios.post('http://localhost:3002/api/updateUser', {
                id: userInfo['id'],
                password: pwTxt,
                name: nameTxt,
                mail: mailTxt,
                salary: salaryTxt,
                auth: authTxt
            }).then((data) => {
                this.props.getUserInfo();
                this.props.setTagSelect(1, "員工資料");
            })
        }
    }

    render() {
        const { userInfo, allUserInfo, funcSelect, setTagSelect, auth } = this.props
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
                            {<tr>
                                <td>薪資</td>
                                <td>
                                    {
                                        auth === 'admin' ?
                                            <form onSubmit={this.onChange}>
                                                <input className={style.Input} id={"salary"} placeholder={funcSelect == "帳號管理" ? userInfo['salary'] : "Salary"} />
                                            </form> :

                                            userInfo['salary']
                                    }
                                </td>
                            </tr>}
                            {auth === 'admin' && <tr>
                                <td>權限</td>
                                <td>
                                    {
                                        <select id={"auth"}>
                                            <option>權限</option>
                                            <option value="admin">管理</option>
                                            <option value="staff">員工</option>
                                        </select>
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