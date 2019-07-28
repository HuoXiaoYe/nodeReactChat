import React, { Component } from 'react';

import { Comment, Avatar, Modal, Button, Input, Form } from 'antd';
import moment from 'moment';

import './artical.styl'


class Artical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            visible: false,
        }
    }
    render() {
        let data = this.state.data;
        return (
            <div style={{ padding: '0 100px', lineHeight: '20px' }} >
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
                    style={{ height: 600}}
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
                            data.commments.map((item, index) => {
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
                        <Input.TextArea id="intr" autosize={{ minRows: 4, maxRows: 6 }} />
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
    };
}

export default Artical;