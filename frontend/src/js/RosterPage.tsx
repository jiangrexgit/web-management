import React, { Component } from 'react';
import style from '../style/UserPage.module.css';
import styleCal from '../style/Calendar.module.css';
import Axios from 'axios';
import { userInfo } from 'os';

interface RosterPageProps {
    rosterAll: any
    rosterRecord: any
    userInfo: any
    allUserInfo: any;
    getRosterRecord(): void
    setRosterTime(year: any, month: any): void;
    setTagSelect(tag: number, func?: string): void
    rosterYear: number;
    rosterMonth: number
}
interface RosterPageState {
    year: any;
    month: any;
    day: any;
    rosterLocal: any
}

class RosterPage extends Component<RosterPageProps, RosterPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            year: this.formatDate(date, 'yyyy'),
            month: parseInt(this.formatDate(date, 'MM')),
            day: parseInt(this.formatDate(date, 'dd')),
            rosterLocal: {}
        }
    }

    componentDidMount = () => {
        const { allUserInfo, rosterRecord } = this.props
        const { month, year, day } = this.state

        let tmpRoster = rosterRecord;
        for (let i = 0; i < allUserInfo.length; i++) {
            if (rosterRecord[allUserInfo[i]['id']]) {
                tmpRoster[allUserInfo[i]['id']] = rosterRecord[allUserInfo[i]['id']];
            } else {
                let tmp = { id: allUserInfo[i]['id'], day: {}, night: {} };
                tmpRoster[allUserInfo[i]['id']] = tmp;
            }
        }

        this.setState({
            rosterLocal: tmpRoster
        })
    }

    componentWillUnmount = () => {
        this.setState = () => false
    }

    componentDidUpdate = (preProps: any) => {
        const { allUserInfo, rosterRecord, rosterAll, rosterMonth, rosterYear } = this.props
        const { month, year, day } = this.state

        if (preProps.rosterMonth !== rosterMonth) {

            let tmpRoster = rosterRecord;
            for (let i = 0; i < allUserInfo.length; i++) {
                if (rosterRecord[allUserInfo[i]['id']]) {
                    tmpRoster[allUserInfo[i]['id']] = rosterRecord[allUserInfo[i]['id']];
                } else {
                    let tmp = { id: allUserInfo[i]['id'], day: {}, night: {} };
                    tmpRoster[allUserInfo[i]['id']] = tmp;
                }
            }

            this.setState({
                rosterLocal: tmpRoster
            })

        }

        if (preProps.allUserInfo !== allUserInfo) {

            let tmpRoster = rosterRecord;
            for (let i = 0; i < allUserInfo.length; i++) {
                if (rosterRecord[allUserInfo[i]['id']]) {
                    tmpRoster[allUserInfo[i]['id']] = rosterRecord[allUserInfo[i]['id']];
                } else {
                    let tmp = { id: allUserInfo[i]['id'], day: {}, night: {} };
                    tmpRoster[allUserInfo[i]['id']] = tmp;
                }
            }

            this.setState({
                rosterLocal: tmpRoster
            })

        }

    }

    formatDate = (date?: any, fmt?: any, flag?: any) => {
        /**
         * 对Date的扩展，将 Date 转化为指定格式的String
         * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
         * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         * eg:
         * Utils.formatDate(new Date(),'yyyy-MM-dd') ==> 2014-03-02
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm') ==> 2014-03-02 05:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd HH:mm') ==> 2014-03-02 17:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
         * Utils.formatDate(new Date(),'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
         */
        if (!date) return;
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": flag ? date.getHours() : (date.getHours() % 12 == 0 ? 12 : date.getHours() % 12), //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        if (/(E+)/.test(fmt)) {
            //@ts-ignore
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                //@ts-ignore
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    getMonthDays = () => {
        //根据月份获取当前天数
        var year = this.state.year,
            month = this.state.month;
        var temp = new Date(year, month, 0);
        return temp.getDate();
    }
    getFirstDayWeek = () => {
        //根据年月返回当月1号是星期几
        var year = this.state.year,
            month = this.state.month;

        var dt = new Date(year + '/' + month + '/1');//new Date(year,month,1);
        var Weekdays = dt.getDay();

        return Weekdays;
    }

    handleLeftClick = () => {
        if (this.state.month - 1 < 1) {

            this.setState({
                year: this.state.year - 1,
                month: 12
            })
            this.props.setRosterTime(this.state.year - 1, 12);
        } else {
            this.setState({
                month: this.state.month - 1
            })
            this.props.setRosterTime(this.state.year, this.state.month - 1);
        }

    }

    handleRightClick = () => {
        if (this.state.month + 1 > 12) {

            this.setState({
                year: this.state.year + 1,
                month: 1
            })
            this.props.setRosterTime(this.state.year + 1, 1);
        } else {
            this.setState({
                month: this.state.month + 1
            })
            this.props.setRosterTime(this.state.year, this.state.month + 1);
        }
    }

    handelClick = (id: any, index: any, type: any) => {
        const { month, year, day, rosterLocal } = this.state;
        if (this.props.userInfo['auth'] === 'admin') {
            let tmp = rosterLocal;

            if (tmp[id][type][index]) {
                tmp[id][type][index] = 'off';
            } else {
                tmp[id][type][index] = 'on';

            }

            this.setState({
                rosterLocal: tmp
            })
        }
    }

    handleCancel = () => {
        this.props.setTagSelect(0);
        this.props.getRosterRecord();
    }

    handleSave = () => {
        const { rosterRecord, allUserInfo, rosterMonth, rosterYear, rosterAll } = this.props
        const { month, year, day, rosterLocal } = this.state
        let tmp: any = {}
        for (let i = 0; i < rosterAll.length; i++) {
            if (rosterAll[i]['month'] === rosterMonth && rosterAll[i]['year'] === rosterYear) {
                tmp[rosterAll[i]['id']] = true;
            } else {
                tmp[rosterAll[i]['id']] = false;
            }
        }

        for (let i = 0; i < allUserInfo.length; i++) {
            let id = allUserInfo[i]['id'];
            if (tmp[id]) {
                //update
                let dayStr = '';
                let nightStr = '';
                
                Object.keys(rosterRecord[id]['day']).map((key: any, index: any) => {
                    if (rosterRecord[id]['day'][key] === 'on') {
                        dayStr += key
                        dayStr += ","
                    }
                })
                Object.keys(rosterRecord[id]['night']).map((key: any, index: any) => {
                    if (rosterRecord[id]['night'][key] === 'on') {
                        nightStr += key
                        nightStr += ","
                    }
                })

                Axios.post('http://localhost:3002/api/updateRoster', {
                    day: dayStr,
                    night: nightStr,
                    id: id,
                    year: rosterYear,
                    month: rosterMonth
                }).then((data) => { this.props.getRosterRecord() })
            } else {
                //add
                let dayStr = '';
                let nightStr = '';

                Object.keys(rosterRecord[id]['day']).map((key: any, index: any) => {
                    if (rosterRecord[id]['day'][key] === 'on') {
                        dayStr += key
                        dayStr += ","
                    }
                })
                Object.keys(rosterRecord[id]['night']).map((key: any, index: any) => {
                    if (rosterRecord[id]['night'][key] === 'on') {
                        nightStr += key
                        nightStr += ","
                    }
                })
                Axios.post('http://localhost:3002/api/addRoster', {
                    id: id,
                    year: rosterYear,
                    month: rosterMonth,
                    day: dayStr,
                    night: nightStr
                }).then((data) => { this.props.getRosterRecord() })
            }
        }
    }

    render() {
        const { allUserInfo, rosterRecord, userInfo } = this.props
        const { month, year, day, rosterLocal } = this.state

        let getDays = this.getMonthDays()

        let arry1: number[] = [];
        for (let i = 0; i < getDays; i++) {
            arry1[i] = i + 1;
        }

        let node1 = arry1.map((item) =>
            <td className={style.DateCol} key={"item_" + item}>{item}</td>
        )
        let node2 = allUserInfo.map((item: any) =>
            <tr key={"day_" + item['id']}>
                <td className={style.NameCol}>{item['name']}</td>
                {arry1.map((item_1) =>
                    <td className={style.DateCol} style={{ background: (rosterLocal[item['id']] && rosterLocal[item['id']]['day'][item_1] === 'on') ? '#BBFFBB' : "#FFFFFF" }} key={"day_" + item['id'] + item_1} onClick={() => { this.handelClick(item['id'], item_1, "day") }}>{ }</td>

                )}
            </tr>
        )
        let node3 = allUserInfo.map((item: any) =>
            <tr key={"night_" + item['id']} >
                <td className={style.NameCol}>{item['name']}</td>
                {arry1.map((item_1) =>
                    <td className={style.DateCol} style={{ background: (rosterLocal[item['id']] && rosterLocal[item['id']]['night'][item_1] === 'on') ? '#BBFFBB' : "#FFFFFF" }} key={"night_" + item['id'] + item_1} onClick={() => { this.handelClick(item['id'], item_1, "night") }}>{ }</td>

                )}
            </tr>
        )


        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px", position: 'relative' }}>
                                <th colSpan={getDays + 1}>排班
                                    {userInfo['auth'] === 'admin' && <div className={style.BtnCon} >
                                        <div className={style.commitBtn} onClick={this.handleSave}>儲存</div>
                                        <div className={style.cancelBtn} onClick={this.handleCancel}>取消</div>
                                    </div>}
                                </th>
                            </tr>
                            <tr style={{ background: "#97CBFF", height: "30px", position: 'relative' }}>
                                <th colSpan={getDays + 1}>
                                    <div className={style.TriangleLeft} onClick={this.handleLeftClick}></div>
                                    {year + "年 / " + (month) + "月"}
                                    <div className={style.TriangleRight} onClick={this.handleRightClick}></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ background: "#FFF4C1", height: "30px" }}>
                                <th colSpan={getDays + 1}>{'早班(08:00-16:00)'}</th>
                            </tr>
                            <tr>
                                <td className={style.NameCol}>姓名</td>
                                {node1}
                            </tr>
                            {node2}
                        </tbody>
                        <tbody>
                            <tr style={{ background: "#FFF4C1", height: "30px" }}>
                                <th colSpan={getDays + 1}>{'晚班(16:00-22:00)'}</th>
                            </tr>
                            <tr>
                                <td className={style.NameCol}>姓名</td>
                                {node1}
                            </tr>
                            {node3}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

export default RosterPage;