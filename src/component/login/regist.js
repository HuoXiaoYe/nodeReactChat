import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'
// import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="支持中文和英文用户名"
                            ref="username"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码由6为字母或者数字组成"
                            ref="password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.handleLogin} style={{ width: "100%" }} size="large" className="login-form-button">立即注册</Button>
                    </Form.Item>

                    <Form.Item>
                        <a style={{ float: "right", fontSize: "10px" }} className="regist-link" href="/#/login">前去登录</a>
                    </Form.Item>
                </div>
            </div>
        );
    }


    handleLogin = () => { // 处理点击登陆事件函数
        let username = this.refs.username.state.value;
        let password = this.refs.password.state.value;
        if (username && password) {
            let data = { username, password }
            axios.post('http://127.0.0.1:4000/login', data)
                .then(function (response) {
                    // -2 没有该用户 -1 密码错误 1 登录成功
                    console.log(response.data);
                })
        }

    }
}

export default Login;