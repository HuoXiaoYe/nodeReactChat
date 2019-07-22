import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// import './homeIndex.styl'




class HomeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            collapsed: false
        }
    }
    render() {
        return (
            <div className="home-contaienr">
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Icon type="profile" />
                                <span>全部说说</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="message" />
                                <span>我的说说</span>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Icon type="user" />
                                <span>个人中心</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ margin: '0 16px' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
    componentDidMount() {
        console.log(this.state.user)
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    
}

export default HomeIndex;