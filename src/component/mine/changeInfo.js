import React, { Component } from 'react';

import { Input, Upload, Icon, message, Button } from 'antd';
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
            <div className="changeInfo-container" style={{ padding: "100px 100px", width: '30%' }}>
                    <ul>
                        <li className="avatar">
                            修改头像
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
            avatar:this.state.imageUrl,
            username : JSON.parse(localStorage.getItem("user")).username
        }
        console.log(data)
        Axios.post("http://127.0.0.1:4000/update",data)
        .then((result)=>{
            // console.log(result)
            // 改变localStorage中的值
            let userInfo = JSON.parse(localStorage.getItem("user"))
            userInfo.avatar = result.data.avatar
            localStorage.setItem("user",JSON.stringify(userInfo))
            // 修改 头像
            let imgObj = document.getElementById("imgBox");
            imgObj.src = `${userInfo.avatar}`
        })
    }
}

export default ChangeInfo;