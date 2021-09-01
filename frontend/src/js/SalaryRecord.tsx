import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/AllCheckInRecord.module.css';
import deleteIcon from '../image/trash.png';
import managementIcon from '../image/gear.png';


interface SalaryRecordProps {
    userInfo: any;
    allUserInfo: any;
    checkInRecord: any;
}
interface SalaryRecordState {
    workTimeObj: any;
}

class SalaryRecord extends Component<SalaryRecordProps, SalaryRecordState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            workTimeObj: {}
        }
    }

    componentDidMount = () => {
        let tmp: any = {}
        for (let i = 0; i < this.props.allUserInfo.length; i++) {
            tmp[this.props.allUserInfo[i]['id']] = { id: this.props.allUserInfo[i]['id'] }
        }
        for (let j = 0; j < this.props.checkInRecord.length; j++) {
            let id = this.props.checkInRecord[j]['id']
            if (tmp[id]) {
                let month = this.props.checkInRecord[j]['month']
                let record = this.props.checkInRecord[j]
                if (tmp[id][month]) {
                    console.log("YES")
                    let spl = record['checkin'].split(':')
                    let outSpl = record['checkout'].split(':')
                    let dateIn = new Date(record['year'], record['month'] - 1, record['day'], spl[0], spl[1]);
                    let dateOut = new Date(record['year'], record['month'] - 1, record['day'], outSpl[0], outSpl[1]);
                    let hour = Math.round(((dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60)) * 10) / 10;
                    tmp[id][month]['time'] += hour;
                } else {
                    tmp[id][month] = { time: 0 }
                    let spl = record['checkin'].split(':')
                    let outSpl = record['checkout'].split(':')
                    let dateIn = new Date(record['year'], record['month'] - 1, record['day'], spl[0], spl[1]);
                    let dateOut = new Date(record['year'], record['month'] - 1, record['day'], outSpl[0], outSpl[1]);
                    let hour = Math.floor(((dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60)) * 10) / 10;
                    tmp[id][month]['time'] += hour;
                }
            }

        }
        this.setState({
            workTimeObj: tmp
        })

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

    getSalaryFromId = (id: string) => {
        for (let i = 0; i < this.props.allUserInfo.length; i++) {
            if (this.props.allUserInfo[i]['id'] === id) {
                return this.props.allUserInfo[i]['salary'];
            }
        }
    }


    render() {
        const { userInfo, checkInRecord } = this.props
        const { workTimeObj } = this.state
        let index = 0
        let l = workTimeObj.length > 100 ? workTimeObj.length : 100
        let ary = [];
        for (let i = 0; i < l; i++) {
            if (workTimeObj[i]) {
                Object.keys(workTimeObj[i]).map((key, j) => {
                    if (userInfo['auth'] === "admin") {
                        if (key !== "id") {
                            ary.push(<tr key={"user_" + workTimeObj[i]['id'] + "_" + key} id={"user_" + workTimeObj[i]['id'] + "_" + key} >
                                <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? workTimeObj[i]['id'] : ""}</td>
                                <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? key : ""}</td>
                                <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? workTimeObj[i][key]['time'] : ""}</td>
                                <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? this.getSalaryFromId(workTimeObj[i]['id']) : ""}</td>
                                <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? this.getSalaryFromId(workTimeObj[i]['id']) * workTimeObj[i][key]['time'] : ""}</td>
                            </tr >)
                            index++;
                        }
                    } else {
                        if (workTimeObj[i]['id'] === userInfo['id']) {
                            if (key !== "id") {
                                ary.push(<tr key={"user_" + workTimeObj[i]['id'] + "_" + key} id={"user_" + workTimeObj[i]['id'] + "_" + key} >
                                    <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? workTimeObj[i]['id'] : ""}</td>
                                    <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? key : ""}</td>
                                    <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? workTimeObj[i][key]['time'] : ""}</td>
                                    <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? this.getSalaryFromId(workTimeObj[i]['id']) : ""}</td>
                                    <td style={{ background: index % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{workTimeObj[i] ? this.getSalaryFromId(workTimeObj[i]['id']) * workTimeObj[i][key]['time'] : ""}</td>
                                </tr >)
                                index++;
                            }
                        }
                    }
                })
            } else {
                ary.push(<tr key={"user_" + i} >
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                    <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{""}</td>
                </tr >)
            }
        }

        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={5}>薪資報表</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>員工編號</td>
                                <td>月份</td>
                                <td>工作時數</td>
                                <td>時薪</td>
                                <td>總薪資</td>
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

export default SalaryRecord;