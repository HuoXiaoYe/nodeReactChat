import React, { Component } from 'react';

import { Input, Form, List, Typography } from 'antd';

const { TextArea } = Input;


const data = []

class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myList: []
        }
    }
    render() {
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
                    <List
                        header={<div>我的说说</div>}
                        bordered
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                            </List.Item>
                        )}
                    />


                </div>

            </div>
        );
    }
}

export default My;