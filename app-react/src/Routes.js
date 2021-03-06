// Load React
import React from 'react'

// Load React Router
import { Router, Route, browserHistory } from 'react-router'

// Load page view components
// Import your Todos and Completed components here...

import Drills from './Drills'
import Signin from './Signin'
import Signup from './Signup'
import Plans from './Plans'
import Drill from './Drill'
import Plan from './Plan'   

// Configure routes
class Routes extends React.Component {
    render() {
        return <Router history={browserHistory}>
            <Route path="/drills/:planId" component={Drills} />
            <Route path="/" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/plans" component={Plans} />
            <Route path="/plan/:planId" component={Plan} />
            <Route path="/drill/:planId/:drillId" component={Drill} />
        </Router>
    }
}

export default Routes