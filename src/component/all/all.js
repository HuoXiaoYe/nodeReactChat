import React, { Component } from 'react';

import {Pagination} from 'antd'

import Artical from './artical.js'

import axios from 'axios'

import './all.styl'

class All extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pageSize : 6,
            articalList : []
         }
    }
    render() { 
        let {articalList} = this.state;
        return ( 
            <div className="all-container">
                <div className="header">
                    <div className="info">
                        <p>与君共勉：</p>
                        <p style={{textIndent:'2em'}}>有志者，事竟成，破釜沉舟，百二秦关终属楚。</p>
                        <p style={{textIndent:'2em'}}>苦心人，天不负，卧薪尝胆，三千越甲可吞吴。</p>
                        <p style={{float:"right",position:'relative',left:'50px'}}>By:霍小叶</p>
                    </div>
                </div>
                <div className="main" style={{paddingTop:'30px'}}>
                    <div className="all-artical">
                        {
                            articalList.map((item,index)=>{
                                return <Artical data={item} key={index} />
                            })
                        }
                    </div>
                    <div className="pagination" style={{marginBottom:'20px','position':'relative','left':'100px'}}>
                        <Pagination total={50} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
         );
    }
    componentWillMount(){
        this.getArtical(0)
    }
    onChange=(currentPage)=>{ // 切换页数触发该函数 从 1 开始
        // console.log(currentPage)
        this.getArtical(currentPage - 1)
    }
    getArtical=(page)=>{
        console.log(page)
        axios.get(`http://127.0.0.1:4000/getartical?pageSize=${this.state.pageSize}&page=${page}`).then((result)=>{
            // console.log(result.data)
            this.setState({
                articalList : result.data
            },function(){
                // console.log(this.state.articalList)
            })
        })
    }
}
 
export default All;