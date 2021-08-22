import React, { Component } from 'react';
import style from '../style/CheckInRecord.module.css';
import icon from '../image/img-user.png';
import enterIcon from '../image/enter.png';
import userIcon from '../image/user.png';
import passwordIcon from '../image/password.png';

interface CheckInRecordProps {
    checkObj: any
    checkInRecord: any
}
interface CheckInRecordState {
    year: any;
    month: any;
    day: any
}

class CheckInRecord extends Component<CheckInRecordProps, CheckInRecordState> {
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


    render() {
        const { checkObj, checkInRecord } = this.props
        const { month, year, day } = this.state
        var arry1 = []
        for (var i = 6; i >= 0; i--) {
            let dayBefore = new Date().getTime() - 24 * 60 * 60 * i * 1000;
            arry1[i] = (new Date(dayBefore).getMonth() + 1) + '/' + new Date(dayBefore).getDate();
        }

        var node1 = arry1.map(function (item) {
            if (checkInRecord[0]) {
                return <div className={style.TextCol} key={"CheckIn_" + item}>
                    <div className={style.DateText}>{item}</div>
                    <div className={style.RecordText}>{item === checkInRecord[0]['month'] + "/" + checkInRecord[0]['day'] ? checkInRecord[0]['checkin'] : ""}</div>
                    <div className={style.RecordText}>{item === checkInRecord[0]['month'] + "/" + checkInRecord[0]['day'] ? checkInRecord[0]['checkout'] : ""}</div>
                </div>
            }
        })
        return (
            <div className={style.CheckInRecordBorder}>
                <div className={style.HeaderBorder}>
                    打卡紀錄
                </div>
                <div className={style.TextCon}>
                    <div className={style.TitleCol} style={{}}>
                        <div className={style.TitleText} style={{}}>{"簽到"}</div>
                        <div className={style.TitleText} style={{}}>{"簽退"}</div>
                    </div>
                    {node1}
                </div>
            </div>
        );
    }
}

export default CheckInRecord;