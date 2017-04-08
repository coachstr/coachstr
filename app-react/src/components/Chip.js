import React from 'react'
import { browserHistory } from 'react-router'

class Chip extends React.Component {

    constructor(props) {
    super(props)

    this.addToPlan = this.addToPlan.bind(this)

  }

  addToPlan() {
      alert('This drill has been added to your plan')
  }

    render() {
        return (
        <div className="chip">{this.props.tag}</div>
        )
    }
}

export default Chip