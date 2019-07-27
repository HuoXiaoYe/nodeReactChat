import React, { Component } from 'react';
import { Button, Spin } from 'antd';
import './mine.styl'
import axios from 'axios';

import { Link } from 'react-router-dom'

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            loading: true
        }
    }
    render() {
        let { username, studentId, major, college, branch, telPhone, email, intr } = this.state.userInfo;
        return (
            <div className="mine-container" style={{paddingTop:150}}>
                <div className="header">
                    <div>
                        <p>我的信息</p>
                        <p>你可以在这里查看并编辑自己的个人信息</p>
                    </div>

                    <Link to="/home/changeinfo">
                        <Button type="primary">修改个人信息</Button>
                    </Link>
                </div>

                <Spin spinning={this.state.loading}>

                    <ul className="main" style={{visibility: this.state.loading ? "hidden" : "visible"}}>
                        <li className="item">
                            <ul>
                                <li>
                                    用户名:&nbsp;&nbsp;&nbsp;&nbsp;{username || '未设置'}
                                </li>
                                <li>
                                    学号:&nbsp;&nbsp;&nbsp;&nbsp;{studentId || '未设置'}
                                </li>
                                <li>
                                    邮箱:&nbsp;&nbsp;&nbsp;&nbsp;{email || '未设置'}
                                </li>
                                {/* <li>
                                性别:&nbsp;&nbsp;&nbsp;&nbsp;{gender || '未设置'}
                            </li> */}
                            </ul>
                        </li>
                        <li className="item">
                            <ul>
                                <li>
                                    专业:&nbsp;&nbsp;&nbsp;&nbsp;{major || '未设置'}
                                </li>
                                <li>
                                    学院:&nbsp;&nbsp;&nbsp;&nbsp;{college || '未设置'}
                                </li>
                                <li>
                                    团支部:&nbsp;&nbsp;&nbsp;&nbsp;{branch || '未设置'}
                                </li>
                            </ul>
                        </li>
                        <li className="item">
                            <ul>
                                <li>
                                    电话:&nbsp;&nbsp;&nbsp;&nbsp;{telPhone || '未设置'}
                                </li>
                                <li>
                                    邮箱:&nbsp;&nbsp;&nbsp;&nbsp;{email || '未设置'}
                                </li>
                                <li>
                                    团支部:&nbsp;&nbsp;&nbsp;&nbsp;{branch || '未设置'}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="intro" style={{visibility: this.state.loading ? "hidden" : "visible"}}>
                        <p>个性签名：</p>
                        <p>{intr || '这几天心里颇不宁静。今晚在院子里坐着乘凉，忽然想起日日走过的荷塘，在这满月的光里，总该另有一番样子吧。月亮渐渐地升高了，墙外马路上孩子们的欢笑，已经听不见了；妻在屋里拍着闰儿⑴，迷迷糊糊地哼着眠歌。我悄悄地披了大衫，带上门出去。'}</p>
                    </div>
                </Spin>


            </div>
        );
    }

    componentWillMount() {
        this.getUserInfo()
    }
    getUserInfo = () => { // 获取个人信息页面
        let username = JSON.parse(localStorage.getItem("user")).username;
        axios.get(`http://127.0.0.1:4000/userinfo/${username}`).then((result) => {
            this.setState({
                userInfo: result.data[0],
                loading : false
            })
        })
    }
}

export default Mine;