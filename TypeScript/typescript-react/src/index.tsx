import React, { DetailedReactHTMLElement } from 'react'
import ReactDOM from 'react-dom'
interface Props {
    className:string
}

let element:DetailedReactHTMLElement<Props,HTMLHeadingElement> = (
    React.createElement<Props,HTMLHeadingElement>('h1',{className:'title'},'hello')
)
ReactDOM.render(element,document.getElementById('root'))