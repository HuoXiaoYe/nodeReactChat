import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
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
                            placeholder="用户名"
                            ref="username"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            ref="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>七天内免登陆</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.handleLogin} style={{ width: "100%" }} size="large" className="login-form-button">登录</Button>
                    </Form.Item>

                    <Form.Item>
                        <a style={{ float: "right", fontSize: "10px" }} className="regist-link" href="/#/regist">前去注册</a>
                    </Form.Item>
                </div>
            </div>
        );
    }


    handleLogin = () => { // 处理点击登陆事件函数
        let username = this.refs.username.state.value;
        let password = this.refs.password.state.value;
        if (username && password) {
            let data = { username, password}
            axios.post('http://127.0.0.1:4000/login', data)
                .then( (response)=> {
                    // -2 没有该用户 -1 密码错误 1 登录成功
                    if(response.data.result === "-2"){
                        return message.error('用户名错误');
                    }
                    if(response.data.result === "-1"){
                        return message.error('密码错误，请重新输入');
                    }
                    if(response.data.result === "1"){
                        data.avatar = response.data.avatar;
                        let datastr = JSON.stringify(data)
                        localStorage.setItem("user" , datastr)
                        message.success(`欢迎${data.username}来到霍小叶的天地`);
                        this.props.history.push("/home/all")
                        return 
                    }
                })
        }

    }
}

export default Login;