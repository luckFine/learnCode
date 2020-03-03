import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class App extends Component {
    render() {
        return <NavLink {...this.props} activeClassName='activeclass'></NavLink>
    }
}