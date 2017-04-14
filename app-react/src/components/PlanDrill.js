import React from 'react'
import { browserHistory } from 'react-router'

class PlanDrill extends React.Component {

    constructor(props) {
    super(props)

  }
  
    render() {
        return <li>{this.props.drill}</li>
    }
}

export default PlanDrill