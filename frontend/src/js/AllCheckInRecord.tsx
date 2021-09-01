import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/AllCheckInRecord.module.css';
import deleteIcon from '../image/trash.png';
import managementIcon from '../image/gear.png';


interface AllCheckInRecordProps {
    userInfo: any;
    allUserInfo: any;
    checkInRecord: any;
}
interface AllCheckInRecordState {
    time: string;
    tagSelect: number;
    isLogout: boolean;
    checkObj: object;
    funcOver: number;
}

class AllCheckInRecord extends Component<AllCheckInRecordProps, AllCheckInRecordState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString(),
            tagSelect: 0,
            isLogout: false,
            checkObj: {
                check: 'not',
                time: ''
            },
            funcOver: -1
        }
    }

    componentDidMount = () => {
        for (let i = 0; i < this.props.allUserInfo.length; i++) {

        }
    }

    componentWillUnmount = () => {
        this.setState = () => false;
    }

    getNameFromId = (id: string) => {
        for (let i = 0; i < this.props.allUserInfo.length; i++) {
            if (this.props.allUserInfo[i]['id'] === id) {
                return this.props.allUserInfo[i]['name'];
            }
        }
    }


    render() {
        const { userInfo, checkInRecord } = this.props
        const { time, tagSelect, isLogout, checkObj, funcOver } = this.state
        let l = checkInRecord.length > 100 ? checkInRecord.length : 100
        let ary = [];
        for (let i = 0; i < l; i++) {
            if (userInfo['auth'] === "admin") {
                ary.push(<tr key={"user_" + i} >
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['id'] : ""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? this.getNameFromId(checkInRecord[i]['id']) : ""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['year'] : ""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['month'] : ""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['day'] : ""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['checkin'] : ""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['checkout'] : ""}</td>
                    {/* <td style={{
                background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF",
                width: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img src={deleteIcon} alt="" className={style.iconBtn} />
                <img src={managementIcon} alt="" className={style.iconBtn} />
            </td> */}
                </tr >)
            } else {
                if (checkInRecord[i]) {
                    if (checkInRecord[i]['id'] === userInfo['id']) {
                        ary.push(<tr key={"user_" + i} >
                            <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['id'] : ""}</td>
                            <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? this.getNameFromId(checkInRecord[i]['id']) : ""}</td>
                            <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['year'] : ""}</td>
                            <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['month'] : ""}</td>
                            <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['day'] : ""}</td>
                            <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['checkin'] : ""}</td>
                            <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{checkInRecord[i] ? checkInRecord[i]['checkout'] : ""}</td>
                            {/* <td style={{
                            background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF",
                            width: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src={deleteIcon} alt="" className={style.iconBtn} />
                            <img src={managementIcon} alt="" className={style.iconBtn} />
                        </td> */}
                        </tr >)

                    }
                } else {
                    ary.push(<tr key={"user_" + i} >
                        <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                        <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                        <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                        <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                        <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                        <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                        <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                        {/* <td style={{
                        background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF",
                        width: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={deleteIcon} alt="" className={style.iconBtn} />
                        <img src={managementIcon} alt="" className={style.iconBtn} />
                    </td> */}
                    </tr >)

                }
            }

        }

        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={7}>出勤紀錄</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>員工編號</td>
                                <td>姓名</td>
                                <td>年</td>
                                <td>月</td>
                                <td>日</td>
                                <td>簽到</td>
                                <td>簽退</td>
                                {/* {userInfo['auth'] === 'admin' && <td style={{ width: '100px' }}>功能</td>} */}
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

export default AllCheckInRecord;