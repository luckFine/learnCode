import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './component/app'

render((
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
),document.getElementById('root'))