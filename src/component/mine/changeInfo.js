import React, { Component } from 'react';

import { Input, Upload, Icon, message, Button, Form } from 'antd';

import "./changeInfo.styl"


import Axios from 'axios';



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}






class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            loading: false,
        }
    }
    render() {
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="changeInfo-container" style={{ padding: "80px 100px", width: '80%' }}>
                {/* 返回按钮 */}
                <Button style={{marginBottom:10}} onClick={this.goBack}>
                    <Icon type="left" />
                    返回
                </Button>
                <Form.Item label="修改头像">

                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                        ref="avatar"
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                {/* 
                    
                    
                    学号:    未设置
                    性别:    未设置
                    专业:    未设置
                    学院:    未设置
                    团支部:    未设置
                    电话:    未设置
                    邮箱:    未设置
                username,studentId,gender,major,college,branch,telPhone,email,intr
                    
                    
                    */}
                <ul className="main">
                    <li>
                        <Form.Item label="学号">
                            <Input ref="studentId" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="专业">
                            <Input ref="major" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="学院">
                            <Input ref="college" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="团支部">
                            <Input ref="branch" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="手机号">
                            <Input ref="telPhone" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="邮箱">
                            <Input ref="email" />
                        </Form.Item>
                    </li>

                </ul>
                <div>
                    <Form.Item label="个性签名">
                        <Input.TextArea id="intr" autosize={{ minRows: 4, maxRows: 6 }} />
                    </Form.Item>
                </div>
                <Button type="primary" style={{float:'right'}} onClick={this.handelUpdate}>确认修改</Button>
            </div >
        )
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                })
            );
        }
    }
    handelUpdate = () => {
        let data = {};
        // console.log(Object.keys(data).length);
        if (this.state.imageUrl) {
            data.avatar = this.state.imageUrl
        }
        if (this.refs.studentId.state.value) {
            data.studentId = this.refs.studentId.state.value;
        }
        if (this.refs.major.state.value) {
            data.major = this.refs.major.state.value;
        }
        if (this.refs.college.state.value) {
            data.college = this.refs.college.state.value;
        }
        if (this.refs.college.state.value) {
            data.college = this.refs.college.state.value;
        }
        if (this.refs.branch.state.value) {
            data.branch = this.refs.branch.state.value;
        }
        if (this.refs.telPhone.state.value) {
            data.telPhone = this.refs.telPhone.state.value;
        }
        if (this.refs.email.state.value) {
            data.email = this.refs.email.state.value;
        }
        if (document.getElementById("intr").value) {
            data.intr = document.getElementById("intr").value
        }
        if (this.state.imageUrl) {
            data.avatar = this.state.imageUrl
        }

        if (Object.keys(data).length === 0) {
            console.log(111)
            return
        }
        // 用户修改了信息，可以向后台提交信息
        data.username = JSON.parse(localStorage.getItem("user")).username


        // let data = {
        //     avatar: this.state.imageUrl,
        //     username: JSON.parse(localStorage.getItem("user")).username
        // }
        // console.log(data)
        Axios.post("http://127.0.0.1:4000/update", data)
            .then((result) => {
                // 如果返回了头像的路径 改变localStorage中的值
                if (result.data.avatar) {
                    let userInfo = JSON.parse(localStorage.getItem("user"))
                    userInfo.avatar = result.data.avatar
                    localStorage.setItem("user", JSON.stringify(userInfo))
                    // 修改头像
                    let imgObj = document.getElementById("imgBox");
                    imgObj.src = `${userInfo.avatar}`
                }
                // 返回到 个人信息页面
                this.props.history.push("/home/mine")
            })
    }
    goBack=()=>{ // 点击返回按钮，回到上一级
        this.props.history.goBack()

    }
}

export default ChangeInfo;