import React, { Component } from 'react'


export default class News extends Component {

    state = {
        newArr: [
            'new001',
            'new002',
            'new003'
        ]
    }

    render() {
        return (
            <ul>
                {
                    this.state.newArr.map((item, index) => <li key={index}>{item}</li>)
                }
            </ul>
        )
    }
}