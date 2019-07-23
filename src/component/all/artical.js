import React, { Component } from 'react';

import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';


class Artical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            dislikes: 0,
            action: null,
        }
    }
    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };
    render() {
        const { likes, dislikes, action } = this.state;
        return (
           <div style={{padding:'0 100px',lineHeight:'20px'}}>
                <Comment
                author={<a>作者名称</a>}
                avatar={
                    <Avatar src="/girl.jpg" />
                }
                content={
                    <p style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',width:"100%"}}>
                        荷塘的四面，远远近近，高高低低都是树，而杨柳最多。这些树将一片荷塘重重围住；只在小路一旁，漏着几段空隙，像是特为月光留下的。树色一例是阴阴的，乍看像一团烟雾；但杨柳的丰姿⑽，便在烟雾里也辨得出。树梢上隐隐约约的是一带远山，只有些大意罢了。树缝里也漏着一两点路灯光，没精打采的，是渴睡人的眼。这时候最热闹的，要数树上的蝉声与水里的蛙声；但热闹是它们的，我什么也没有。
                        荷塘的四面，远远近近，高高低低都是树，而杨柳最多。这些树将一片荷塘重重围住；只在小路一旁，漏着几段空隙，像是特为月光留下的。树色一例是阴阴的，乍看像一团烟雾；但杨柳的丰姿⑽，便在烟雾里也辨得出。树梢上隐隐约约的是一带远山，只有些大意罢了。树缝里也漏着一两点路灯光，没精打采的，是渴睡人的眼。这时候最热闹的，要数树上的蝉声与水里的蛙声；但热闹是它们的，我什么也没有。
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
}

export default Artical;