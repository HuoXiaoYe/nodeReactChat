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
                        <Tooltip
                            title={moment()
                                .subtract(10, 'days')
                                .format('YYYY-MM-DD HH:mm:ss')}
                        >
                            <span>
                                {moment()
                                    .subtract(10, 'days')
                                    .fromNow()}
                            </span>
                        </Tooltip>
                    }
                />
            </div>
        );
    }
    // componentWillUpdate(){
    //     this.setState({
    //         data:this.props.data
    //     })
    // }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
            data : nextProps.data
        })
    }
}

export default Artical;