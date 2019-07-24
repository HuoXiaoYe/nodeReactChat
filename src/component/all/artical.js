import React, { Component } from 'react';

import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';


class Artical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data
        }
    }
    render() {
        let data = this.state.data;
        return (
            <div style={{ padding: '0 100px', lineHeight: '20px' }}>
                <Comment
                    author={<a>{data.name}</a>}
                    avatar={
                        <Avatar src={data.avatar} alt="jsx-a11y/alt-text" />
                    }
                    content={
                        <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: "100%" }}>
                            {data.content}
                    </p>
                    }
                    datetime={
                            <span>
                                {moment()
                                    .subtract(this.getTime(data.datetime) , 'hours')
                                    .fromNow()}
                            </span>
                    }
                />
            </div>
        );
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data : nextProps.data
        })
    }
    getTime(time){
        let oldDate = new Date(time).getTime();
        let nowDate = new Date().getTime();
        let dif = nowDate - oldDate; // 毫秒值
        let hours =  dif / 1000 / 60/ 60 
        return(hours)

    }
}

export default Artical;