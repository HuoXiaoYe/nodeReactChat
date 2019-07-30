import React, { Component } from 'react';

import { Input, Form, List, Typography } from 'antd';

import "./my.styl"
import axios from 'axios';


const data = []

class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myList: [],
            loading: true
        }
    }
    render() {
        let {myList,loading} = this.state;
        return (
            <div className="my-container" style={{ padding: 30, width: "60%" }}>
                {/* 头部发表说说页面 */}
                <div className="header">

                    <Form.Item label="发表说说" style={{ fontSize: 24 }}>
                        <Input.TextArea style={{ marginTop: 20 }} id="intr" autosize={{ minRows: 4, maxRows: 6 }} />
                    </Form.Item>

                </div>
                {/* 呈现个人说说页面 */}
                <div className="list">


                    {/* <Spin> */}

                        <List
                        style={{height:400}}
                            loading={loading}
                            header={<div>我的说说</div>}
                            bordered
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    {/* </Spin> */}


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
        axios.get(`http://127.0.0.1:4000/getmylist/${username}`).then((response)=>{
            // console.log(response.data);
            // 更改状态
            this.setState({
                myList: response.data,
                loading: false
            })
        })

    }
}

export default My;