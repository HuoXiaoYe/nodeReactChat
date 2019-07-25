import React, { Component } from 'react';
import { Button } from 'antd';
import './mine.styl'

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="mine-container">
               <div className="header">
                    <div>
                       <p>我的信息</p>
                       <p>你可以在这里查看并编辑自己的个人信息</p>
                    </div>

                   <Button type="primary">修改个人信息</Button>
               </div>
               <ul className="main">
                    <li className="item">
                        <ul>
                            <li>
                                用户名:&nbsp;&nbsp;&nbsp;&nbsp;XXX
                            </li>
                            <li>
                                学号:&nbsp;&nbsp;&nbsp;&nbsp;177111111
                            </li>
                            <li>
                                性别:&nbsp;&nbsp;&nbsp;&nbsp;男
                            </li>
                        </ul>
                    </li>
                    <li className="item">
                        <ul>
                            <li>
                                专业:&nbsp;&nbsp;&nbsp;&nbsp;兽医学
                            </li>
                            <li>
                                学院:&nbsp;&nbsp;&nbsp;&nbsp;兽医学院
                            </li>
                            <li>
                                团支部:&nbsp;&nbsp;&nbsp;&nbsp;1708团支部
                            </li>
                        </ul>
                    </li>
                    <li className="item">
                        <ul>
                            <li>
                                电话:&nbsp;&nbsp;&nbsp;&nbsp;188888888
                            </li>
                            <li>
                                邮箱:&nbsp;&nbsp;&nbsp;&nbsp;888888@163.com
                            </li>
                            <li>
                                团支部:&nbsp;&nbsp;&nbsp;&nbsp;1708团支部
                            </li>
                        </ul>
                    </li>
               </ul>
               <div className="intro">
                    <p>个人介绍：</p>
                    <p>这几天心里颇不宁静。今晚在院子里坐着乘凉，忽然想起日日走过的荷塘，在这满月的光里，总该另有一番样子吧。月亮渐渐地升高了，墙外马路上孩子们的欢笑，已经听不见了；妻在屋里拍着闰儿⑴，迷迷糊糊地哼着眠歌。我悄悄地披了大衫，带上门出去。</p>
               </div>
               
            </div>
         );
    }
}
 
export default Mine;