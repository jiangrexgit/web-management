import React, { Component, createRef, useEffect } from 'react';
import Axios from 'axios'
import Calendar from './Calendar'
import style from '../style/UserPage.module.css';
import deleteIcon from '../image/trash.png';
import managementIcon from '../image/gear.png';


interface UserPageProps {
    userInfo: any;
    allUserInfo: any;
    getUserInfo(): void
    setEditUserInfo(id: any): void
    setTagSelect(tag: number, func?: string, id?: any): void
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

    deleteUser = (id: string) => {
        Axios.post(`http://localhost:3002/api/delete/${id}`).then((data) => {
            this.props.getUserInfo()
        })
    }

    formateDate(date: any): string {
        let temp = new Date(date);
        return temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate()
    }


    render() {
        const { userInfo, allUserInfo, setEditUserInfo, setTagSelect } = this.props
        const { time, tagSelect, isLogout, checkObj, checkInRecord, funcOver } = this.state
        console.warn(allUserInfo);
        let l = allUserInfo.length > 100 ? allUserInfo.length : 100
        let ary = [];
        for (let i = 0; i < l; i++) {
            ary.push(<tr key={"user_" + i} >
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['id'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['name'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? allUserInfo[i]['mail'] : ""}</td>
                <td style={{ background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF" }}>{allUserInfo[i] ? this.formateDate(allUserInfo[i]['startworking']) : ""}</td>
                {<td style={{
                    background: i % 2 === 0 ? "#f2f2f2" : "#FFFFFF",
                    width: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {allUserInfo[i] && <img src={deleteIcon} alt="" className={style.iconBtn} onClick={() => { this.deleteUser(allUserInfo[i]['id']) }} />}
                    {allUserInfo[i] && <img src={managementIcon} alt="" className={style.iconBtn} onClick={() => { setTagSelect(1, "帳號管理", allUserInfo[i]['id']) }} />}
                </td>}
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
                                <td>聯絡信箱</td>
                                <td>到職日</td>
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