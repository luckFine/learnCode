import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import About from '../views/about'
import Home from '../views/home'
import MyNavLink from './MyNavLink'

export default class App extends Component {
    render() {
        return (
            <div>
                <h2>你好你好</h2>
                <ul>
                    <li>
                        <MyNavLink to='/about'>About</MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to='/home'>Home</MyNavLink>
                    </li>
                </ul> 
                <Switch>
                    <Route path='/about' component={About}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Redirect to='/about'></Redirect>
                </Switch>
            </div>
        )
    }
}