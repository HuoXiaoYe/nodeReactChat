import React, { Component } from 'react';

import { Input, Form, List, Typography, Button, message } from 'antd';

import "./my.styl"
import axios from 'axios';



class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myList: [],
            loading: true
        }
    }
    render() {
        let { myList, loading } = this.state;
        return (
            <div className="my-container" style={{ margin: 30, width: "60%" }}>
                {/* 头部发表说说页面 */}
                <div className="header" style={{ marginBottom: 80 }}>

                    <Form.Item label="发表说说" style={{ fontSize: 24 }}>
                        <Input.TextArea style={{ marginTop: 20 }} id="content" autosize={{ minRows: 4, maxRows: 6 }} />
                    </Form.Item>

                    <Button style={{ float: "right" }} type="primary" onClick={this.sendShuoShuo}>发表说说</Button>


                </div>
                {/* 呈现个人说说页面 */}
                <div className="list">
                    <List
                        style={{ height: 400 }}
                        loading={loading}
                        header={<div>我的说说</div>}
                        bordered
                        dataSource={myList}
                        renderItem={item => (
                            <List.Item style={{height:"36px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>

            </div>
        );
    }
    componentDidMount() {
        this.getMyList()
    }
    getMyList = () => { // 得到自己的动态
        let username = JSON.parse(localStorage.getItem("user")).username;
        // console.log(username)
        axios.get(`http://127.0.0.1:4000/getmylist/${username}`).then((response) => {
            console.log(response.data);
            // 更改状态
            this.setState({
                myList: response.data,
                loading: false
            })
        })

    }
    sendShuoShuo = () => { // 点击按钮发送说说
        let content = document.getElementById("content").value;
        if (!content) { // 判断内容是否为空
            return message.error("发表的说说不可以为空")
        }
        let userInfo = JSON.parse(localStorage.getItem("user"));

        let data = {
            name: userInfo.username,
            avatar: userInfo.avatar,
            datetime: new Date(),
            content,
            commments: [],
            agree: 0
        }
        // console.log(data)


        axios.post("http://127.0.0.1:4000/additem", data).then((response) => {
            // console.log(response)
            if(response.data.result === "1"){
                message.success("说说发表成功");

                let allList = this.state.myList;
                allList.unshift(data);

                this.setState({
                    myList : allList
                })
                document.getElementById("content").value = "";
            }
        })
    }
}

export default My;