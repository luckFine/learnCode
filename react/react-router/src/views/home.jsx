import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MyNavLink from '../component/MyNavLink'
import News from './news'
import Message from './message'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <div>
                    <ul>
                        <li>
                            <MyNavLink to='/home/news'>news</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to='/home/message'>message</MyNavLink>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route path='/home/news' component={News}></Route>
                    <Route path='/home/message' component={Message}></Route>
                    <Redirect to='/home/news' ></Redirect>
                </Switch>
            </div>
        )
    }
}