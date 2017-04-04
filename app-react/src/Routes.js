// Load React
import React from 'react'

// Load React Router
import { Router, Route, browserHistory } from 'react-router'

// Load page view components
// Import your Todos and Completed components here...

import Main from './Main'
import Signin from './Signin'
import Signup from './Signup'

// Configure routes
class Routes extends React.Component {
    render() {
        return <Router history={browserHistory}>
            <Route path="/" component={Main} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
        </Router>
    }
}

export default Routes