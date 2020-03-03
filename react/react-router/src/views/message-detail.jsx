import React, { Component } from 'react'

const allMessage = [
    { id: '1', title: 'message001', content: '七里香' },
    { id: '2', title: 'message002', content: '听妈妈的话' },
    { id: '3', title: 'message003', content: '稻香' }
]

export default class News extends Component {
    render() {
        const { id } = this.props.match.params
        // 返回第一个结果为true的
        const message = allMessage.find((m) => m.id === id)
        return (
            <ul>
                <li>ID:{message.id}</li>
                <li>TITLE: {message.title}</li>
                <li>CONTENT: {message.content}</li>
            </ul>
        )
    }
}