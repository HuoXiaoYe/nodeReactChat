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
                            placeholder="Username"
                            ref="username"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            ref="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>七天内免登陆</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.handleLogin} style={{width:"100%"}} size="large" className="login-form-button">Log in </Button>
                    </Form.Item>

                    <Form.Item>
                        <a style={{float:"right",fontSize:"10px"}} className="regist-link" href="/regist">前去注册</a>
                    </Form.Item>
                </div>
            </div>
        );
    }


    handleLogin=()=>{ // 处理点击登陆事件函数
        let username = this.refs.username.state.value;
        let password = this.refs.password.state.value;
        let data = {username,password}
        axios.post('http://127.0.0.1:4000/login',data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default Login;