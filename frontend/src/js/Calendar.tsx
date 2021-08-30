import React, { Component } from 'react';
import style from '../style/Calendar.module.css';
import icon from '../image/img-user.png';
import enterIcon from '../image/enter.png';
import userIcon from '../image/user.png';
import passwordIcon from '../image/password.png';

interface CalendarProps {
    setCheckIn(c: string, t: string): void
}
interface CalendarState {
    year: any;
    month: any;
    day: any
}

class Calendar extends Component<CalendarProps, CalendarState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            year: this.formatDate(date, 'yyyy'),
            month: parseInt(this.formatDate(date, 'MM')),
            day: parseInt(this.formatDate(date, 'dd'))
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
        } else {
            this.setState({
                month: this.state.month - 1
            })

        }

    }

    handleRightClick = () => {
        if (this.state.month + 1 > 12) {

            this.setState({
                year: this.state.year + 1,
                month: 1
            })
        } else {
            this.setState({
                month: this.state.month + 1
            })
        }
    }

    handleClick = (e: any) => {
        let date = new Date();
        let timeStr = date.getHours() + ":";
        let min = date.getMinutes()
        if (min > 10) timeStr += min
        else timeStr = timeStr + "0" + min;

        this.props.setCheckIn(e.currentTarget.id, timeStr)

    }

    render() {
        const { month, year, day } = this.state
        const funcName = [
            { i: 0, name: "主頁" },
            { i: 1, name: "人事管理", func: ["帳號管理", "員工資料"] },
            { i: 2, name: "薪資管理", func: ["薪資計算", "加班費計算"] },
            { i: 3, name: "出勤系統", func: ["排班", "請假單", "加班單", "出差", "出勤紀錄"] }]
        var arry1 = [], arry2 = [];
        var getDays = this.getMonthDays(),
            FirstDayWeek = this.getFirstDayWeek()
        for (var i = 0; i < FirstDayWeek; i++) {
            arry1[i] = i;
        }
        for (var i = 0; i < getDays; i++) {
            arry2[i] = (i + 1);
        }

        var node1 = arry1.map(function (item) { return <li key={"calCol" + item}></li> })
        var node2 = arry2.map(function (item) { return (day == item) ? <li key={"calRow" + item} style={{ backgroundColor: "#eee" }}>{item}</li> : <li key={"calRow" + item}>{item}</li> })
        return (
            <div className={style.CalendarBorder}>
                <div className={style.HeaderBorder}>
                    <p>{year + "年"}</p>
                    <p>{month + "月"}</p>
                    <p className={style.TriangleLeft} onClick={this.handleLeftClick}> </p>
                    <p className={style.TriangleRight} onClick={this.handleRightClick}> </p>
                </div>
                <div>
                    <div className={style.Weekdat}>
                        <ul>
                            <li>SUN</li>
                            <li>MON</li>
                            <li>TUE</li>
                            <li>WED</li>
                            <li>THU</li>
                            <li>FRI</li>
                            <li>SAT</li>
                        </ul>
                    </div>
                    <div className={style.CalendarDay}>
                        <ul>{node1}{node2}</ul>
                    </div>
                </div>
                <div className={style.CheckInCon}>
                    <button className={style.CheckBtn} id="CHECK_IN" onClick={this.handleClick}>簽到</button>
                    <button className={style.CheckBtn} id="CHECK_OUT" onClick={this.handleClick}>簽退</button>
                </div>
            </div>
        );
    }
}

export default Calendar;