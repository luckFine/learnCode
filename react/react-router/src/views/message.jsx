import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import MessageDetail from './message-detail'
import MyNavLink from '../component/MyNavLink'

export default class Message extends Component {

    state = {
        messages: [
            { id: 1, title: 'message001' },
            { id: 2, title: 'message002' },
            { id: 3, title: 'message003' }
        ]
    }
    componentDidMount() {
        // 模拟发送ajax请求异步获取数据
        setTimeout(() => {
            const messages = [
                { id: 1, title: 'message001' },
                { id: 2, title: 'message002' },
                { id: 3, title: 'message003' }
            ]
            this.setState(messages)
        },1000)
    }
    showDetail(id) {
        this.props.history.push(`/home/message/messagedetail/${id}`)
    }
    showDetail2(id) {
        this.props.history.replace(`/home/message/messagedetail/${id}`)
    }
    back() {
        this.props.history.goBcak()
    }
    forward() {
        this.props.history.goForward()
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.messages.map((item, index) => (
                            <li key={index}>
                                <MyNavLink to={`/home/message/messagedetail/${item.id}`}>{item.title}</MyNavLink>
                                <button onClick={() => this.showDetail2(item.id)}>push()查看</button>
                                <button onClick={() => this.showDetail(item.id)}>查看</button>
                            </li>
                        ))
                    }
                </ul>  
                <Route path={`/home/message/messagedetail/:id`} component={MessageDetail}></Route>
            </div>
        )
    }
}