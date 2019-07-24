import React, { Component } from 'react';

import { Pagination,Spin } from 'antd'

import Artical from './artical.js'

import axios from 'axios'

import './all.styl'

class All extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 6,
            articalList: [],
            allCount: 2,
            showLoading : false
        }
    }
    render() {
        let { articalList } = this.state;
        return (
            <div className="all-container">
                <div className="header">
                    <div className="info">
                        <p>与君共勉：</p>
                        <p style={{ textIndent: '2em' }}>有志者，事竟成，破釜沉舟，百二秦关终属楚。</p>
                        <p style={{ textIndent: '2em' }}>苦心人，天不负，卧薪尝胆，三千越甲可吞吴。</p>
                        <p style={{ float: "right", position: 'relative', left: '50px' }}>By:霍小叶</p>
                    </div>
                </div>
                <div className="main" style={{ paddingTop: '30px', height:"relative" }}>
                    <Spin spinning={this.state.showLoading}>
                        <div className="all-artical" style={{height: 444}}>
                            {
                                articalList.map((item, index) => {
                                    return <Artical data={item} key={index} />
                                })
                            }
                        </div>
                    </Spin>
                    <div className="pagination" style={{'position': 'fixed', 'bottom': '65px',  'left': '340px' }}>
                        <Pagination total={this.state.allCount} defaultPageSize={6} onChange={this.onChange} />
                    </div>
                </div>
            </div>
        );
    }
    componentWillMount() {
        this.getArtical(0)
        this.getCount('artical')
    }
    onChange = (currentPage) => { // 切换页数触发该函数 从 1 开始
        this.getArtical(currentPage - 1)
    }
    getArtical = (page) => { //通过页码获取所有文章
        this.setState({showLoading : true})
        axios.get(`http://127.0.0.1:4000/getartical?pageSize=${this.state.pageSize}&page=${page}`).then((result) => {
            this.setState({
                articalList: result.data,
                showLoading: false
            })
        })
    }
    getCount = (collection) => { // 获取个数
        axios.get(`http://127.0.0.1:4000/getallcount/${collection}`).then((response) => {
            
            this.setState({ 
                allCount: parseInt(response.data)
            })
        })
    }
}

export default All;