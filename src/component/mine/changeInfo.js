import React, { Component } from 'react';

import { Input, Upload, Icon, message, Button,Form } from 'antd';

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
            <div className="changeInfo-container" style={{ padding: "100px 100px", width: '80%' }}>
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
                            <Input  name="studentId"/>   
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="性别">
                            <Input name="gender"/>   
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="专业">
                            <Input name="major"/>   
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="学院">
                            <Input name="college"/>   
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="团支部">
                            <Input name="branch"/>   
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="手机号">
                            <Input name="telPhone"/>   
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item label="邮箱">
                            <Input name="email"/>   
                        </Form.Item>
                    </li> 

                </ul>
                <Button type="primary" onClick={this.handelUpdate}>确认修改</Button>
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
        let data = {
            avatar: this.state.imageUrl,
            username: JSON.parse(localStorage.getItem("user")).username
        }
        console.log(data)
        Axios.post("http://127.0.0.1:4000/update", data)
            .then((result) => {
                // console.log(result)
                // 改变localStorage中的值
                let userInfo = JSON.parse(localStorage.getItem("user"))
                userInfo.avatar = result.data.avatar
                localStorage.setItem("user", JSON.stringify(userInfo))
                // 修改 头像

                console.log(userInfo.avatar)
                let imgObj = document.getElementById("imgBox");
                imgObj.src = `${userInfo.avatar}`
                // 返回到 个人信息页面
                this.props.history.push("/home/mine")
            })
    }
}

export default ChangeInfo;