import React, { Component } from 'react';

import { Comment, Avatar, Modal, Button, Input, Form, message } from 'antd';
import moment from 'moment';

import axios from 'axios'

import './artical.styl'


class Artical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            visible: false,
            comments: this.props.data.commments,
            commentValue: ""
        }
    }
    render() {
        let data = this.state.data;
        let comments = this.state.comments
        return (
            <div style={{ padding: '0 100px', lineHeight: '20px' }}>
                <Comment onClick={this.showModal}
                    author={data.name}
                    avatar={
                        <Avatar src={data.avatar} alt="jsx-a11y/alt-text" />
                    }
                    content={
                        <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: "100%" }}>
                            {data.content}
                        </p>
                    }
                    datetime={
                        <span>
                            {moment()
                                .subtract(this.getTime(data.datetime), 'hours')
                                .fromNow()}
                        </span>
                    }
                />



                <Modal
                    ref="ModalContainer"
                    style={{ height: 600 }}
                    title={data.name + ":"}
                    visible={this.state.visible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    okText="朕已阅"
                    cancelText='取消'
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleCancel}>
                            朕已阅
                        </Button>,
                    ]}

                >
                    <p>{data.content}</p>

                    {/* <p>{data._id}</p> */}

                    <div className="main">
                        <p style={{ color: 'rgb(0,33,64)' }}>精彩评论：</p>
                        {
                            comments.map((item, index) => {
                                return (
                                    <Comment
                                        key={index}
                                        author={item.name}
                                        avatar={
                                            <Avatar
                                                src={item.avatar}
                                                alt={item.name}
                                            />
                                        }
                                        content={
                                            <p>
                                                {item.content}
                                            </p>
                                        }
                                    >
                                    </Comment>
                                )
                            })
                        }
                    </div>

                    <Form.Item label="我要评论">
                        <Input.TextArea value={this.state.commentValue} onChange={this.changeValue} ref="content" autosize={{ minRows: 4, maxRows: 6 }} />
                        <Button onClick={this.sendCommit} style={{ marginTop: 15 }}>发表评论</Button>
                    </Form.Item>
                </Modal>
            </div>
        );
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }
    getTime(time) {
        let oldDate = new Date(time).getTime();
        let nowDate = new Date().getTime();
        let dif = nowDate - oldDate; // 毫秒值
        let hours = dif / 1000 / 60 / 60
        return (hours)

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
        return
    }
    hidemodal = () => {
        console.log(222)
        this.setState({
            visible: false,
        });
        return
    }

    handleCancel = e => {
        this.setState({
            visible: false
        })
    }
    changeValue = (e) => {
        this.setState({
            commentValue: e.target.value
        })
    }
    sendCommit = () => {
        console.log(this.state.commentValue)
        let content = this.state.commentValue
        if (!content) { // 评论内容为空
            return message.error('请书写您的评论')
        }
        let userInfo = JSON.parse(localStorage.getItem("user"))
        let data = { // 定义传递给后台的数据 无id
            name: userInfo.username,
            avatar: userInfo.avatar,
            datetime: new Date(),
            content
        }
        // console.log(data)
        axios.post("http://127.0.0.1:4000/updatecomment", {
            id: this.state.data._id,
            ...data
        }).then((response) => {
            if (response.data.result === "1") {
                message.success('评论发表成功')
            }
            // 假数据
            let newComments = this.state.comments
            newComments.push(data)
            this.setState({
                comments : newComments
            })

            // 清空评论框
            this.setState({
                commentValue: ""
            })

        })

        


    }
}

export default Artical;