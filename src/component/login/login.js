import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'
import FormItem from 'antd/lib/form/FormItem';

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
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>七天内免登陆</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width:"100%"}} size="large" className="login-form-button">Log in </Button>
                    </Form.Item>

                    <Form.Item>
                        <a style={{float:"right",fontSize:"10px"}} className="regist-link" href="/regist">前去注册</a>
                    </Form.Item>
                </div>
            </div>
        );
    }
}

export default Login;