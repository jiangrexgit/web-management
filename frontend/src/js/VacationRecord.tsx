import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/AllCheckInRecord.module.css';
import deleteIcon from '../image/trash.png';
import managementIcon from '../image/gear.png';


interface VacationRecordProps {
    userInfo: any;
    allUserInfo: any;
    vacationRecord: any;
}
interface VacationRecordState {
    time: string;
    tagSelect: number;
    isLogout: boolean;
    checkObj: object;
    funcOver: number;
}

class VacationRecord extends Component<VacationRecordProps, VacationRecordState> {
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

    formateDate(date: any): string {
        let temp = new Date(date);
        return temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate() + " " + (temp.getHours() < 10 ? "0" + temp.getHours() : temp.getHours()) + ":" + (temp.getMinutes() < 10 ? "0" + temp.getMinutes() : +temp.getMinutes());
    }


    render() {
        const { userInfo, vacationRecord } = this.props
        const { time, tagSelect, isLogout, checkObj, funcOver } = this.state
        console.warn(vacationRecord);
        let l = vacationRecord.length > 100 ? vacationRecord.length : 100
        let ary = [];
        for (let i = 0; i < l; i++) {
            ary.push(<tr key={"user_" + i} >
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{vacationRecord[i] ? vacationRecord[i]['id'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{vacationRecord[i] ? this.getNameFromId(vacationRecord[i]['id']) : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{vacationRecord[i] ? this.formateDate(vacationRecord[i]['start']) : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{vacationRecord[i] ? this.formateDate(vacationRecord[i]['end']) : ""}</td>
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

        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={4}>請假紀錄</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>員工編號</td>
                                <td>姓名</td>
                                <td>開始時間</td>
                                <td>結束時間</td>
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

export default VacationRecord;