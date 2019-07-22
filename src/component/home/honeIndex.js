import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, Route } from 'react-router-dom'

// 导入所需的三个页面

import All from '../all/all.js';
import My from '../my/my.js';
import Mine from '../mine/mine.js'

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
                        <Menu theme="dark" defaultSelectedKeys={[window.location.hash.slice(1)]} mode="inline">
                            <Menu.Item key="/home/all">
                                <Icon type="profile" />
                                <span><Link to="/home/all" style={{ color: "white" }}>全部说说</Link></span>
                            </Menu.Item>
                            <Menu.Item key="/home/my">
                                <Icon type="message" />
                                <span><Link to="/home/my" style={{ color: "white" }}>个人说说</Link></span>
                            </Menu.Item>
                            <Menu.Item key="/home/mine">
                                <Icon type="user" />
                               <span> <Link to="/home/mine" style={{ color: "white" }}> 个人中心 </Link></span>    
                                
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ display: "flex", height: "100vh" }}>
                        <Content style={{ margin: '10px', height: "100vh" }}>
                            <div style={{ margin: '14 14 0 14', background: '#fff', height: '100%', boxShadow: "2px 2px 2px 2px #ccc", borderRadius: "10px" }}>
                                <Route path="/home/all" component={All}></Route>
                                <Route path="/home/my" component={My}></Route>
                                <Route path="/home/mine" component={Mine}></Route>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center', padding: 10 }}>xiaoye Design ©2019 Created by 霍小叶</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
    componentDidMount() {
        console.log(window.location.hash.slice(1))
    }
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

}

export default HomeIndex;