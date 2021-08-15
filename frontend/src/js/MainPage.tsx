import React, { Component } from 'react';
import Calendar from './Calendar'
import style from '../style/MainPage.module.css';
import icon from '../image/img-user.png';
import enterIcon from '../image/enter.png';
import userIcon from '../image/user.png';
import passwordIcon from '../image/password.png';
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
            time: date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay() + ' ' + date.toLocaleTimeString(),
            tagSelect: 0
        }
        setInterval(this.ShowTime, 1000);
    }

    ShowTime = () => {
        let date = new Date();
        this.setState({
            time: date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay() + ' ' + date.toLocaleTimeString()
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
            { i: 1, name: "人事管理", func: ["帳號管理", "員工資料"] },
            { i: 2, name: "薪資管理", func: ["薪資計算", "加班費計算"] },
            { i: 3, name: "出勤系統", func: ["排班", "請假單", "加班單", "出差", "出勤紀錄"] }]
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
                                <div key={"tag" + key} className={index + 1 === tagSelect ? style.LeftCol_Select : style.LeftCol}
                                    onClick={() => { this.setTagSelect(index + 1) }}>
                                    {funcName[index]['name']}
                                </div>
                            )
                        }

                    </div>
                    <div className={style.MiddleBlock}>{
                        funcName.map((key, index) =>
                            <div key={"tag" + key} className={style.funcBlock}
                                onClick={() => { this.setTagSelect(index) }}>

                                {(funcName[index]['func'] as []).map((key_1, index_1) => {

                                })
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