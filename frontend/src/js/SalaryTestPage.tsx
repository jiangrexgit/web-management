import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import style from '../style/InfoPage.module.css';


interface SalaryTestPageProps {
    userInfo: any;
    allUserInfo: any;
    rosterRecord: any;
}
interface SalaryTestPageState {
    warn: string;
    workTime: number;
}

class SalaryTestPage extends Component<SalaryTestPageProps, SalaryTestPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            warn: '',
            workTime: 0
        }
    }

    componentDidMount = () => {
        const { userInfo, allUserInfo, rosterRecord } = this.props
        const { warn, workTime } = this.state
        let tmpTime = 0;
        let date = new Date();
        let daySpl = [];
        let nightSpl = [];
        for (let i = 0; i < rosterRecord.length; i++) {
            if (rosterRecord[i]['id'] === userInfo['id'] && rosterRecord[i]['month'] === (date.getMonth() + 1)) {
                daySpl = rosterRecord[i]['day'].split(',')
                nightSpl = rosterRecord[i]['night'].split(',')
            }
        }

        for (let j = 0; j < daySpl.length; j++) {
            if (daySpl[j] !== "") {
                tmpTime += 10;
            }
        }

        for (let k = 0; k < nightSpl.length; k++) {
            if (nightSpl[k] !== "") {
                tmpTime += 10;
            }
        }
        this.setState({
            workTime: tmpTime
        })
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

    render() {
        const { userInfo, allUserInfo } = this.props
        const { warn, workTime } = this.state
        let date = new Date(userInfo['startworking'])
        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={2}>{"薪資試算"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {<tr>
                                <td>預計工時</td>
                                <td>
                                    {workTime}
                                </td>
                            </tr>}
                            <tr>
                                <td>薪資</td>
                                <td>
                                    {
                                        userInfo['salary']
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>預計薪資</td>
                                <td>
                                    {
                                        workTime * userInfo['salary']
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

export default SalaryTestPage;