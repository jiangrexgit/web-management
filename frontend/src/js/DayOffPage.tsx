import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import style from '../style/InfoPage.module.css';
import { userInfo } from 'os';


interface DayOffPageProps {
    userInfo: any;
    allUserInfo: any;
    funcSelect: string
    getUserInfo(): void
    getVacationRecord(): void
    setTagSelect(tag: number, func?: string): void
}
interface DayOffPageState {
    warn: string;
}

class DayOffPage extends Component<DayOffPageProps, DayOffPageState> {
    private horusAry: string[] = []
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            warn: ''
        }
        for (let i = 0; i < 24; i++) {
            this.horusAry[i] = i < 10 ? "0" + i : String(i);
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
        let startDate: HTMLInputElement = document.getElementById('startDate') as HTMLInputElement
        let startHour: HTMLOptionElement = document.getElementById('startHour') as HTMLOptionElement
        let startMin: HTMLOptionElement = document.getElementById('startMin') as HTMLOptionElement
        let endDate: HTMLInputElement = document.getElementById('endDate') as HTMLInputElement
        let endHour: HTMLOptionElement = document.getElementById('endHour') as HTMLOptionElement
        let endMin: HTMLOptionElement = document.getElementById('endMin') as HTMLOptionElement

        if (startDate.value === "" || startHour.value === "" || startMin.value === "" || endDate.value === "" || endHour.value === "" || endMin.value === "") {

            this.setState({
                warn: "資料輸入錯誤"
            })
        } else {

            let dateStart = new Date(startDate.value);
            let dateEnd = new Date(endDate.value);
            if (dateEnd.getTime() < dateStart.getTime()) {
                this.setState({
                    warn: "資料輸入錯誤"
                })

            } else {
                let startSpl = startDate.value.split('-')
                let startTime = new Date(Date.UTC(Number(startSpl[0]), Number(startSpl[1]) - 1, Number(startSpl[2]), Number(startHour.value), Number(startMin.value)))
                let endSpl = endDate.value.split('-')
                let endTime = new Date(Date.UTC(Number(endSpl[0]), Number(endSpl[1]) - 1, Number(endSpl[2]), Number(endHour.value), Number(endMin.value)))
                Axios.post('http://localhost:3002/api/addVacation', {
                    id: userInfo['id'],
                    name: userInfo['name'],
                    start: startTime,
                    end: endTime
                }).then((data) => {
                    this.props.getVacationRecord();
                    this.props.setTagSelect(3, "請假紀錄");
                })

            }
        }
    }

    render() {
        const { userInfo, allUserInfo, funcSelect, setTagSelect } = this.props
        const { warn } = this.state
        const hoursAry = [];
        let date = new Date(userInfo['startworking'])
        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={2}>{"請假單"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {<tr>
                                <td>員工編號</td>
                                <td>
                                    {userInfo['id']}
                                </td>
                            </tr>}
                            <tr>
                                <td>姓名</td>
                                <td>
                                    {
                                        userInfo['name']
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>開始時間</td>
                                <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <input type="date" id="startDate" />
                                    <select name="" id="startHour">
                                        {(this.horusAry).map((key, index) =>
                                            <option key={"startHour" + key} value={key}>{key}</option>

                                        )
                                        }
                                    </select>
                                    <select name="" id="startMin">
                                        <option value={"00"}>{"00"}</option>
                                        <option value={"30"}>{"30"}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>結束時間</td>
                                <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <input type="date" id="endDate" />
                                    <select name="" id="endHour">
                                        {(this.horusAry).map((key, index) =>
                                            <option key={"endHour" + key} value={key}>{key}</option>

                                        )
                                        }
                                    </select>
                                    <select name="" id="endMin">
                                        <option value={"00"}>{"00"}</option>
                                        <option value={"30"}>{"30"}</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={style.WarningText}>{warn}</div>
                    <div className={style.BtnCon}>
                        <div className={style.commitBtn} onClick={this.submitUser}><div className={style.checkIcon}></div></div>
                        <div className={style.cancelBtn} onClick={() => { setTagSelect(0) }}><div className={style.cancelIcon}></div></div>
                    </div>
                </div>
            </div >
        );
    }
}

export default DayOffPage;