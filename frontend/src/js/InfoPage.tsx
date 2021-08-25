import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/UserPage.module.css';
import deleteIcon from '../image/trash.png';
import managementIcon from '../image/gear.png';


interface UserPageProps {
    userInfo: any;
    allUserInfo: any;
}
interface UserPageState {
    time: string;
    tagSelect: number;
    isLogout: boolean;
    checkInRecord: Array<any>;
    checkObj: object;
    funcOver: number;
}

class UserPage extends Component<UserPageProps, UserPageState> {
    constructor(props: any) {
        super(props);

        let date = new Date();
        this.state = {
            time: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString(),
            tagSelect: 0,
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
    }

    componentWillUnmount = () => {
        this.setState = () => false;
    }


    render() {
        const { userInfo, allUserInfo } = this.props
        const { time, tagSelect, isLogout, checkObj, checkInRecord, funcOver } = this.state
        console.warn(allUserInfo);
        let l = allUserInfo.length > 100 ? allUserInfo.length : 100
        let ary = [];
        for (let i = 0; i < l; i++) {
            ary.push(<tr key={"user_" + i} >
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['id'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['name'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['department'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['mail'] : ""}</td>
                <td style={{
                    background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF",
                    width: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img src={deleteIcon} alt="" className={style.iconBtn} />
                    <img src={managementIcon} alt="" className={style.iconBtn} />
                </td>
            </tr >)
        }

        return (
            <div className={style.FullPage}>
                <div className={style.UserInfo}>
                    <table className={style.UserTable}>
                        <thead>
                            <tr style={{ background: "#97CBFF", height: "30px" }}>
                                <th colSpan={userInfo['auth'] === 'admin' ? 5 : 4}>員工資料</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>員工編號</td>
                                <td>姓名</td>
                                <td>部門</td>
                                <td>聯絡信箱</td>
                                {userInfo['auth'] === 'admin' && <td style={{ width: '100px' }}>功能</td>}
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

export default UserPage;