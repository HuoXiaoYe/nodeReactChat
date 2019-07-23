import React, { Component } from 'react';

import {Pagination} from 'antd'

import Artical from './artical.js'

import './all.styl'

class All extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
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
                            [1,2,3,4,5,6].map(item=>{
                                return <Artical />
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
    onChange=(currentPage)=>{ // 切换页数触发该函数 从 1 开始
        console.log(currentPage)
    }
}
 
export default All;