import React, { Component } from 'react';
import Calendar from './Calendar'
import style from '../style/MainPage.module.css';
import icon from '../image/img-user.png';
import CalendarIcon from '../image/calendar.png';
import SalaryIcon from '../image/salary.png';
import HumanIcon from '../image/human.png';
import CheckInRecord from './CheckInRecord';

interface MainPageProps {
}
interface MainPageState {
    time: string;
    tagSelect: number;
}

class MainPage extends Component<MainPageProps, MainPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString(),
            tagSelect: 0
        }
        setInterval(this.ShowTime, 1000);
    }

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
    render() {
        const { time, tagSelect } = this.state
        const funcName = [
            { i: 1, name: "人事管理", func: ["帳號管理", "員工資料"], icon: HumanIcon },
            { i: 2, name: "薪資管理", func: ["薪資計算", "加班費計算"], icon: SalaryIcon },
            { i: 3, name: "出勤系統", func: ["排班", "請假單", "加班單", "出差", "出勤紀錄"], icon: CalendarIcon }]
        return (
            <div className={style.FullPage}>
                <div className={style.TitleBar}>
                    <img src={icon} alt="" className={style.TitleIcon} />
                    <div className={style.TitleText}>
                        {"管理者"}
                    </div>

                    <div className={style.TimeText}>
                        {time}
                    </div>

                </div>
                <div className={style.BottomCon}>
                    <div className={style.LeftBlock}>
                        <div key={"tag" + 0} className={tagSelect === 0 ? style.LeftCol_Select : style.LeftCol}
                            onClick={() => { this.setTagSelect(0) }}>
                            {"主頁"}
                        </div>
                        {
                            funcName.map((key, index) =>
                                <div key={"tag" + index} className={index + 1 === tagSelect ? style.LeftCol_Select : style.LeftCol}
                                    onClick={() => { this.setTagSelect(index + 1) }}>
                                    {funcName[index]['name']}
                                </div>
                            )
                        }

                    </div>
                    <div className={style.MiddleBlock}>{
                        funcName.map((key, index) =>
                            <div key={"title_tag" + (index + 1)} className={style.funcBlock}
                            >
                                <div className={style.FuncTitle} onClick={() => { this.setTagSelect(index + 1) }}> {funcName[index]['name']}
                                    <img src={funcName[index]['icon']} alt={funcName[index]['name']} className={style.FuncIcon} /></div>
                                {(funcName[index]['func']).map((key_1, index_1) =>
                                    <div className={style.FuncCol}>{key_1}</div>
                                )
                                }
                            </div>
                        )
                    }

                    </div>

                    <div className={style.RightBlock}>
                        {<Calendar />}
                        {<CheckInRecord />}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;