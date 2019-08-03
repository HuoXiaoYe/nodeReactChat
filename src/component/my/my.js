import React, { Component } from 'react';

import {
    Input, Form, List, Button, message, Avatar, Spin,
    Comment, Modal
} from 'antd';

import InfiniteScroll from 'react-infinite-scroller';

import "./my.styl"
import axios from 'axios';



class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myList: [],
            loading: true,
            dataLoading: false,
            hasMore: true,
            comments: [],
            visible: false,
            lookData: {}, // 当前要查看那条说说
            commentValue : "",

        }
    }
    render() {
        let { myList, loading } = this.state;
        let data = this.state.lookData;
        let comments = this.state.comments
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
                    <div className="demo-infinite-container">
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.dataLoading && this.state.hasMore}
                            useWindow={false}
                        >
                            <List
                                dataSource={myList}
                                renderItem={(item, index) => (
                                    <List.Item key={item.id} style={{ cursor: "pointer" }} onClick={this.handleClick.bind(this, index)}>
                                        <List.Item.Meta avatar={<Avatar src={item.avatar} />} />
                                        <div>{item.content}</div>
                                    </List.Item>
                                )}
                            >
                                {this.state.dataLoading && this.state.hasMore && (
                                    <div className="demo-loading-container">
                                        <Spin />
                                    </div>
                                )}
                            </List>
                        </InfiniteScroll>
                    </div>
                </div>

                {/* 评论框 */}
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



    // 对自己的说说 进行评论
    changeValue = (e) => {
        this.setState({
            commentValue: e.target.value
        })
    }
    // 对自己的说说 进行评论
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
            id: this.state.lookData._id,
            ...data
        }).then((response) => {
            if (response.data.result === "1") {
                message.success('评论发表成功')
            }
            // 假数据
            let newComments = this.state.comments
            newComments.push(data)
            this.setState({
                comments: newComments
            })

            // 清空评论框
            this.setState({
                commentValue: ""
            })

        })




    }


    // 点击说说 查看评论
    handleClick = (index) => {
        console.log(index);
        this.setState({
            visible: true,
            comments: this.state.myListAll[index].commments,
            lookData: this.state.myListAll[index]
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
    // 处理加载更多
    handleInfiniteOnLoad = () => {
        this.setState({
            dataLoading: true,
        });
        let timer = setTimeout(() => {
            let { myList, myListCount, myListAll } = this.state;
            if (myList.length >= myListCount) {
                message.warning('已经到底了！！！');
                this.setState({
                    hasMore: false,
                    dataLoading: false,
                });
                return;
            }

            let endIndex = myList.length <= myListAll.length - 5 ? myList.length + 5 : myListAll.length

            myList = myList.concat(myListAll.slice(myList.length, endIndex))
            this.setState({
                myList,
                dataLoading: false

            })
            clearTimeout(timer)
        }, 2000)
    };

    componentDidMount() {
        this.getMyList()
    }
    getMyList = () => { // 得到自己的动态
        let username = JSON.parse(localStorage.getItem("user")).username;
        axios.get(`http://127.0.0.1:4000/getmylist/${username}`).then((response) => {
            console.log(response.data);
            // 更改状态
            this.setState({
                myListAll: response.data,
                myList: response.data.slice(0, 5),
                loading: false,
                myListCount: response.data.length
            })

            console.log(response.data)
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
            if (response.data.result === "1") {
                message.success("说说发表成功");

                let allList = this.state.myList;
                allList.unshift(data);

                this.setState({
                    myList: allList
                })
                document.getElementById("content").value = "";
            }
        })
    }
}

export default My;