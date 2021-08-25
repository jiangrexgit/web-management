import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/MainPage.module.css';
import icon from '../image/img-user.png';
import CalendarIcon from '../image/calendar.png';
import SalaryIcon from '../image/salary.png';
import HumanIcon from '../image/human.png';
import CheckInRecord from './CheckInRecord';
import UserPage from './UserPage';
import AllCheckInRecord from './AllCheckInRecord';


interface MainPageProps {
    userInfo: any;
    allUserInfo: any;
    setIsLogin(isLogin: boolean): void;
}
interface MainPageState {
    time: string;
    tagSelect: number;
    funcSelect: string;
    isLogout: boolean;
    checkInRecord: Array<any>;
    checkObj: object;
    funcOver: number;
}

class MainPage extends Component<MainPageProps, MainPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString(),
            tagSelect: 0,
            funcSelect: '',
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

    setTagSelect = (index: number, func?: string) => {
        this.setState({
            tagSelect: index
        })
        if (func) {
            this.setState({
                funcSelect: func
            })
        }
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
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let timeStr = date.getHours() + ":";
        let min = date.getMinutes()
        if (min > 10) timeStr += min;
        else timeStr = timeStr + "0" + min;
        for (let i = 0; i < this.state.checkInRecord.length; i++) {

            if (this.state.checkInRecord[i]['id'] === userInfo['id'] && this.state.checkInRecord[i]['month'] === String(month) && this.state.checkInRecord[i]['day'] === String(day)) {
                recordExist = true;
                break;
            }
        }

        if (recordExist) {
            if (isCheckIn === "CHECK_IN") {
                Axios.post('http://localhost:3002/api/updateCheckIn', {
                    id: userInfo['id'],
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    checkin: timeStr
                }).then((data) => { this.getCheckInRecord() })

            } else if (isCheckIn === "CHECK_OUT") {
                Axios.post('http://localhost:3002/api/updateCheckOut', {
                    id: userInfo['id'],
                    month: date.getMonth() + 1,
                    day: date.getDate(),
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

    handleLogoutClick = (e: any) => {
        this.props.setIsLogin(false);
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
        const { time, tagSelect, funcSelect, isLogout, checkObj, checkInRecord, funcOver } = this.state
        const funcName = [
            { i: 1, name: "人事管理", func: ["帳號管理", "員工資料"], icon: HumanIcon },
            { i: 2, name: "薪資管理", func: ["薪資計算", "加班費計算"], icon: SalaryIcon },
            { i: 3, name: "出勤系統", func: ["排班", "請假單", "請假紀錄", "出勤紀錄"], icon: CalendarIcon }]
        if (userInfo['auth'] === "admin") { funcName[0]['func'].splice(0, 0, "新增員工") }

        return (
            <div className={style.FullPage}>
                <div className={style.TitleBar}>
                    <img src={icon} alt="" className={style.TitleIcon} />
                    <div className={style.TitleText} onMouseOver={this.handleClick} onMouseOut={this.handleClick}>
                        {(userInfo['account'] === "admin" ? "管理者" : userInfo['account'])}
                        <div className={style.TitleLogOut} style={{ opacity: isLogout ? '1' : '0' }} onClick={this.handleLogoutClick}>
                            {"登出"}
                        </div>
                    </div>

                    <div className={style.TimeText}>
                        {time}
                    </div>

                </div>
                <div className={style.BottomCon}>
                    <div className={style.LeftBlock}>
                        <div key={"tag" + 0} className={tagSelect === 0 ? style.LeftCol_Select : style.LeftCol} id={"-1"}
                            onClick={() => { this.setTagSelect(0) }} onMouseOver={this.handleFuncClick} onMouseOut={this.handleFuncClick}>
                            {"主頁"}
                        </div>
                        {
                            funcName.map((key, index) =>
                                <div key={"tag" + index} className={index + 1 === tagSelect ? style.LeftCol_Select : style.LeftCol} id={String(index)} onMouseOver={this.handleFuncClick} onMouseOut={this.handleFuncClick}
                                >
                                    {funcName[index]['name']}
                                </div>
                            )
                        }

                    </div>

                    {tagSelect === 0 && <div className={style.MiddleBlock}>{
                        funcName.map((key, index) =>
                            <div key={"title_tag" + (index + 1)} className={style.funcBlock}
                            >
                                <div className={style.FuncTitle} > {funcName[index]['name']}
                                    <img src={funcName[index]['icon']} alt={funcName[index]['name']} className={style.FuncIcon} /></div>
                                {(funcName[index]['func']).map((key_1, index_1) =>
                                    <div className={style.FuncCol} key={funcName[index]['name'] + (index_1)} onClick={() => { this.setTagSelect(index + 1, key_1) }}>{key_1}</div>
                                )
                                }
                            </div>
                        )
                    }

                    </div>
                    }

                    {tagSelect === 0 && <div className={style.RightBlock}>
                        {<Calendar setCheckIn={this.setCheckIn} />}
                        {<CheckInRecord checkObj={checkObj} checkInRecord={checkInRecord} />}
                    </div>}
                    {funcName.map((key, index) =>
                        <div key={'FuncList' + (index + 1)} className={style.FuncList} id={String(index)}
                            style={{ top: 50 * (index + 1) + "px", display: (funcOver === index && funcOver !== -1) ? 'flex' : 'none' }}
                            onMouseOver={this.handleFuncClick} onMouseOut={this.handleFuncClick} >
                            {(funcName[index]['func']).map((key_2, index_2) =>
                                <div className={style.FuncListCol} key={"List_" + funcName[index]['name'] + (index_2)} onClick={() => { this.setTagSelect(index + 1, key_2) }}>{key_2}</div>
                            )}
                        </div>
                    )}
                    {(tagSelect === 1 && funcSelect === "員工資料") && <UserPage userInfo={userInfo} allUserInfo={allUserInfo} />}
                    {(tagSelect === 3 && funcSelect === "出勤紀錄") && <AllCheckInRecord userInfo={userInfo} allUserInfo={allUserInfo} checkInRecord={checkInRecord} />}
                </div>
            </div>
        );
    }
}

export default MainPage;