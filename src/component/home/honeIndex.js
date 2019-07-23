import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, Route } from 'react-router-dom'


// 导入所需的三个页面

import All from '../all/all.js';
import My from '../my/my.js';
import Mine from '../mine/mine.js'

const { Content, Footer, Sider } = Layout;




// import './homeIndex.styl'




class HomeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            collapsed: false,
            imgUrl: ''
        }
    }
    render() {
        return (
            <div className="home-contaienr">
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu theme="dark" defaultSelectedKeys={[window.location.hash.slice(1)]} mode="inline">
                            <img src={this.state.imgUrl} style={{ width: !this.state.collapsed ? 100 : 40, border: "3px solid rgba(255, 255, 255, .3)", borderRadius: '50%', margin: !this.state.collapsed ? "10px 50px" : "10px 20px", transition: "width .17s linear" }} />
                            <p style={{ height: "20px", textAlign: "center", padding: "20px 0", display: !this.state.collapsed ? "block" : "none" }}>{JSON.parse(localStorage.getItem('user')).username}</p>
                            <Menu.Item key="/home/all">
                                <Link to="/home/all">
                                    <Icon type="profile" />
                                    <span>全部动态</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/home/my">
                                <Link to="/home/my">
                                    <Icon type="message" />
                                    <span>我的动态</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/home/mine">
                                <Link to="/home/mine">
                                    <Icon type="user" />
                                    <span>个人中心 </span>
                                </Link>
                            </Menu.Item>
                        </Menu>

                    </Sider>
                    <Layout style={{ display: "flex", height: "100vh" }}>
                        <Content style={{ margin: '10px', height: "100vh" }}>
                            <div style={{ margin: '14 14 0 14', background: '#fff', height: '100%', boxShadow: "2px 2px 2px 2px #ccc", borderRadius: "10px" }}>
                                <Route path="/home/all" component={All}></Route>
                                <Route path="/home/my" component={My}></Route>
                                <Route path="/home/mine" component={Mine}></Route>
                                {/* <img src={girl} /> */}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center', padding: 10 }}>xiaoye Design ©2019/07/22-2019/08/17 Created by 霍小叶</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
    componentDidMount() {
        console.log(window.location.hash.slice(1))
        this.setState({ imgUrl: '/images/girl.jpg' })
    }
    onCollapse = collapsed => {
        this.setState({ collapsed });
    }
}

export default HomeIndex;