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
import InfoPage from './InfoPage'
import EditPage from './EditPage';
import VacationRecord from './VacationRecord';
import DayOffPage from './DayOffPage';
import RosterPage from './RosterPage';
import SalaryTestPage from './SalaryTestPage';
import SalaryRecord from './SalaryRecord';


interface MainPageProps {
    isSignUp: boolean
    userInfo: any;
    allUserInfo: any;
    setIsLogin(isLogin: boolean): void;
    setIsSignUp(flag: boolean): void
    getUserInfo(): void
}
interface MainPageState {
    time: string;
    tagSelect: number;
    funcSelect: string;
    isLogout: boolean;
    checkInRecord: Array<any>;
    vacationRecord: Array<any>;
    rosterRecord: Array<any>;
    rosterInAMonth: any;
    checkObj: object;
    funcOver: number;
    editUserInfo: any;
    rosterYear: number;
    rosterMonth: number
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
            vacationRecord: [],
            rosterRecord: [],
            checkObj: {
                check: 'not',
                time: ''
            },
            funcOver: -1,
            editUserInfo: {},
            rosterMonth: date.getMonth() + 1,
            rosterYear: date.getFullYear(),
            rosterInAMonth: {}
        }
    }

    componentDidMount = () => {
        setInterval(this.ShowTime, 1000);
        this.getCheckInRecord();
        this.getVacationRecord();
        this.getRosterRecord();
    }

    componentWillUnmount = () => {
        this.setState = () => false;
    }

    ShowTime = () => {
        let date = new Date();
        this.setState({
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString()
        })
    }

    setTagSelect = (index: number, func?: string, id?: any) => {
        this.setState({
            tagSelect: index
        })
        if (func) {
            this.setState({
                funcSelect: func
            })
            if (func === "帳號管理") {
                if (id) {
                    this.setEditUserInfo(id)
                } else {
                    this.setEditUserInfo(this.props.userInfo['id'])
                }
            }
        }
    }

    getCheckInRecord = () => {
        Axios.get("http://localhost:3002/api/getCheckin").then((data) => {
            this.setState({
                checkInRecord: data.data
            })
        })
    }

    getVacationRecord = () => {
        Axios.get("http://localhost:3002/api/getVacation").then((data) => {
            this.setState({
                vacationRecord: data.data
            })
        })
    }

    getRosterRecord = () => {
        const { rosterMonth, rosterYear } = this.state
        Axios.get("http://localhost:3002/api/getRoster").then((data) => {

            let tmp: any = {};
            for (let i = 0; i < data.data.length; i++) {
                let tmpObj = data.data[i];

                if (tmpObj['year'] === Number(rosterYear) && tmpObj['month'] === Number(rosterMonth)) {
                    let daySpl = tmpObj['day'].split(',')
                    let dayObj: any = {};
                    let nightSpl = tmpObj['night'].split(',')
                    let nightObj: any = {};
                    for (let j = 0; j < daySpl.length; j++) {
                        dayObj[daySpl[j]] = 'on'
                    }
                    for (let k = 0; k < nightSpl.length; k++) {
                        nightObj[nightSpl[k]] = 'on'

                    }
                    let obj = { day: dayObj, night: nightObj }
                    tmp[tmpObj['id']] = obj;
                }
            }
            this.setState({
                rosterRecord: data.data,
                rosterInAMonth: tmp
            })
        })
    }

    setRosterTime = (year: any, month: any) => {
        const { rosterRecord } = this.state
        this.setState({
            rosterYear: year,
            rosterMonth: month
        })

        let tmp: any = {};
        for (let i = 0; i < rosterRecord.length; i++) {
            let tmpObj = rosterRecord[i];

            if (tmpObj['year'] === Number(year) && tmpObj['month'] === Number(month)) {
                let daySpl = tmpObj['day'].split(',')
                let dayObj: any = {};
                let nightSpl = tmpObj['night'].split(',')
                let nightObj: any = {};
                for (let j = 0; j < daySpl.length; j++) {
                    dayObj[daySpl[j]] = 'on'
                }
                for (let k = 0; k < nightSpl.length; k++) {
                    nightObj[nightSpl[k]] = 'on'

                }
                let obj = { day: dayObj, night: nightObj }
                tmp[tmpObj['id']] = obj;
            }
        }
        this.setState({
            rosterInAMonth: tmp
        })
    }

    setEditUserInfo = (id: any) => {
        const { allUserInfo } = this.props;
        for (let i = 0; i < allUserInfo.length; i++) {
            if (allUserInfo[i]['id'] === id) {
                this.setState({
                    editUserInfo: allUserInfo[i]
                })
            }
        }
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
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    checkin: timeStr
                }).then((data) => { this.getCheckInRecord() })
            } else if (isCheckIn === "CHECK_OUT") {
                Axios.post('http://localhost:3002/api/checkout', {
                    id: userInfo['id'],
                    account: userInfo['account'],
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
        const { isSignUp } = this.props
        if (!isSignUp) {
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
    }

    handleLogoutClick = (e: any) => {
        this.props.setIsLogin(false);
    }

    handleFuncClick = (e: any) => {
        const { isSignUp } = this.props
        if (!isSignUp) {
            if (e.type === 'mouseover') {
                this.setState({
                    funcOver: Number(e.currentTarget.id)
                })
            } else if (e.type === 'mouseout') {
                this.setState({
                    funcOver: -1
                })
            }
        }
    }

    render() {
        const { isSignUp, userInfo, allUserInfo, getUserInfo, setIsSignUp } = this.props
        const { time, tagSelect, funcSelect, isLogout, checkObj, checkInRecord, funcOver, editUserInfo, vacationRecord, rosterRecord, rosterInAMonth, rosterYear, rosterMonth } = this.state
        const funcName = [
            { i: 1, name: "人事管理", func: ["帳號管理", "員工資料"], icon: HumanIcon },
            { i: 2, name: "薪資管理", func: ["薪資試算", "薪資報表"], icon: SalaryIcon },
            { i: 3, name: "出勤系統", func: ["排班", "請假單", "請假紀錄", "出勤紀錄"], icon: CalendarIcon }]

        return (
            <div className={style.FullPage}>
                <div className={style.TitleBar}>
                    <img src={icon} alt="" className={style.TitleIcon} />
                    <div className={style.TitleText} onMouseOver={this.handleClick} onMouseOut={this.handleClick}>
                        {(isSignUp ? "註冊會員" : userInfo['name'])}
                        <div className={style.TitleLogOut} style={{ opacity: isLogout ? '1' : '0' }} onClick={this.handleLogoutClick}>
                            {"登出"}
                        </div>
                    </div>

                    <div className={style.TimeText}>
                        {time}
                    </div>

                </div>
                <div className={style.BottomCon}>
                    {!isSignUp && <div className={style.LeftBlock}>
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

                    </div>}

                    {(!isSignUp && tagSelect === 0) && <div className={style.MiddleBlock}>{
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

                    {(!isSignUp && tagSelect === 0) && <div className={style.RightBlock}>
                        {<Calendar setCheckIn={this.setCheckIn} />}
                        {<CheckInRecord checkObj={checkObj} checkInRecord={checkInRecord} userInfo={userInfo} />}
                    </div>}
                    {(tagSelect === 1 && funcSelect === "員工資料") && <UserPage userInfo={userInfo} allUserInfo={allUserInfo} getUserInfo={getUserInfo} setEditUserInfo={this.setEditUserInfo} setTagSelect={this.setTagSelect} />}
                    {(tagSelect === 2 && funcSelect === "薪資試算") && <SalaryTestPage userInfo={userInfo} allUserInfo={allUserInfo} rosterRecord={rosterRecord} />}
                    {(tagSelect === 2 && funcSelect === "薪資報表") && <SalaryRecord userInfo={userInfo} allUserInfo={allUserInfo} checkInRecord={checkInRecord} />}
                    {(tagSelect === 3 && funcSelect === "排班") && <RosterPage allUserInfo={allUserInfo} userInfo={userInfo} rosterAll={rosterRecord} rosterRecord={rosterInAMonth} getRosterRecord={this.getRosterRecord} setRosterTime={this.setRosterTime} setTagSelect={this.setTagSelect} rosterYear={rosterYear} rosterMonth={rosterMonth} />}
                    {(tagSelect === 3 && funcSelect === "出勤紀錄") && <AllCheckInRecord userInfo={userInfo} allUserInfo={allUserInfo} checkInRecord={checkInRecord} />}
                    {(tagSelect === 3 && funcSelect === "請假單") && <DayOffPage funcSelect={funcSelect} userInfo={userInfo} allUserInfo={allUserInfo} getUserInfo={getUserInfo} getVacationRecord={this.getVacationRecord} setTagSelect={this.setTagSelect} />}
                    {(tagSelect === 3 && funcSelect === "請假紀錄") && <VacationRecord userInfo={userInfo} allUserInfo={allUserInfo} vacationRecord={vacationRecord} />}
                    {(tagSelect === 1 && funcSelect === "帳號管理") && <EditPage funcSelect={funcSelect} userInfo={editUserInfo} allUserInfo={allUserInfo} getUserInfo={getUserInfo} setTagSelect={this.setTagSelect} auth={userInfo['auth']}></EditPage>}
                    {(isSignUp) && <InfoPage isSignUp={isSignUp} allUserInfo={allUserInfo} setIsSignUp={setIsSignUp} getUserInfo={getUserInfo}></InfoPage>}
                    {funcName.map((key, index) =>
                        <div key={'FuncList' + (index + 1)} className={style.FuncList} id={String(index)}
                            style={{ top: 50 * (index + 1) + "px", display: (funcOver === index && funcOver !== -1) ? 'flex' : 'none' }}
                            onMouseOver={this.handleFuncClick} onMouseOut={this.handleFuncClick} >
                            {(funcName[index]['func']).map((key_2, index_2) =>
                                <div className={style.FuncListCol} key={"List_" + funcName[index]['name'] + (index_2)} onClick={() => { this.setTagSelect(index + 1, key_2) }}>{key_2}</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MainPage;