import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/UserPage.module.css';
import icon from '../image/img-user.png';
import CalendarIcon from '../image/calendar.png';
import SalaryIcon from '../image/salary.png';
import HumanIcon from '../image/human.png';
import CheckInRecord from './CheckInRecord';


interface UserPageProps {
    userInfo: any;
    allUserInfo: any;
}
interface UserPageState {
    time: string;
    tagSelect: number;
    isLogout: boolean;
    checkInRecord: Array<any>;
    checkObj: object;
    funcOver: number;
}

class UserPage extends Component<UserPageProps, UserPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString(),
            tagSelect: 0,
            isLogout: false,
            checkInRecord: [],
            checkObj: {
                check: 'not',
                time: ''
            },
            funcOver: -1
        }
    }

    componentDidMount = () => {
        setInterval(this.ShowTime, 1000);
        this.getCheckInRecord()
    }

    componentWillUnmount = () => {
        this.setState = () => false;
    }

    // componentDidUpdate = () => {
    //     console.warn(this.props.userInfo);

    // }

    ShowTime = () => {
        let date = new Date();
        this.setState({
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString()
        })
    }

    setTagSelect = (index: number) => {
        this.setState({
            tagSelect: index
        })

    }

    getCheckInRecord = () => {
        Axios.get("http://localhost:3002/api/getCheckin").then((data) => {
            this.setState({
                checkInRecord: data.data
            })
        })
    }

    setCheckIn = (isCheckIn: string, time: string) => {
        const { userInfo } = this.props
        let recordExist: boolean = false;
        for (let i = 0; i < this.state.checkInRecord.length; i++) {
            if (this.state.checkInRecord[i]['id'] === userInfo['id']) {
                recordExist = true;
                break;
            }
        }

        let date = new Date();
        let timeStr = date.getHours() + ":";
        let min = date.getMinutes()
        if (min > 10) timeStr += min;
        else timeStr = timeStr + "0" + min;

        if (recordExist) {
            if (isCheckIn === "CHECK_IN") {
                Axios.post('http://localhost:3002/api/updateCheckIn', {
                    id: userInfo['id'],
                    checkin: timeStr
                }).then((data) => { this.getCheckInRecord() })

            } else if (isCheckIn === "CHECK_OUT") {
                Axios.post('http://localhost:3002/api/updateCheckOut', {
                    id: userInfo['id'],
                    checkout: timeStr
                }).then((data) => { this.getCheckInRecord() })
            }
        } else {
            if (isCheckIn === "CHECK_IN") {
                Axios.post('http://localhost:3002/api/checkin', {
                    id: userInfo['id'],
                    account: userInfo['account'],
                    department: userInfo['department'],
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    checkin: timeStr
                }).then((data) => { this.getCheckInRecord() })
            } else if (isCheckIn === "CHECK_OUT") {
                Axios.post('http://localhost:3002/api/checkout', {
                    id: userInfo['id'],
                    account: userInfo['account'],
                    department: userInfo['department'],
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    checkout: timeStr
                }).then((data) => { this.getCheckInRecord() })
            }
        }


        this.setState({
            checkObj: {
                check: isCheckIn,
                time: time
            }
        })
    }

    handleClick = (e: any) => {
        if (e.type === 'mouseover') {
            this.setState({
                isLogout: true
            })
        } else if (e.type === 'mouseout') {
            this.setState({
                isLogout: false
            })
        }
    }

    handleFuncClick = (e: any) => {
        if (e.type === 'mouseover') {
            this.setState({
                funcOver: Number(e.currentTarget.id)
            })
        } else if (e.type === 'mouseout') {
            console.warn(e.type);
            this.setState({
                funcOver: -1
            })
        }
    }

    render() {
        const { userInfo, allUserInfo } = this.props
        const { time, tagSelect, isLogout, checkObj, checkInRecord, funcOver } = this.state
        console.warn(allUserInfo);
        let l = allUserInfo.length > 100 ? allUserInfo.length : 100
        let ary = [];
        for (let i = 0; i < l; i++) {
            ary.push(<tr key={"user_" + i} >
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['id'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['account'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['department'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['mail'] : ""}</td>
            </tr>)
        }

        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={4}>員工資料</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>員工編號</td>
                                <td>姓名</td>
                                <td>部門</td>
                                <td>聯絡信箱</td>
                            </tr>
                        </tbody>
                        <tbody>
                            {ary}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

export default UserPage;