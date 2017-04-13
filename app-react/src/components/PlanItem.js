import React from 'react'
import { browserHistory } from 'react-router'

class PlanItem extends React.Component {

    constructor(props) {
    super(props)

    // this.state= {
    //         email: '',
    //         password: ''
    //     }

    this.viewDrill = this.viewDrill.bind(this)
    this.deleteDrill = this.deleteDrill.bind(this)

  }

  viewDrill() {
      alert('View this drill')
      browserHistory.push('/drill')
  }

  deleteDrill() {
      alert('This drill has been removed')
  }

    // componentWillMount() {
    //     this.props.getItems(this.props.params.itemId)
    // }
    render() {
        return <li className="collection-item"><span>{this.props.title}</span><span className="pull-right">
            <i className="material-icons deletePlanItem" onClick={this.deleteDrill}>delete</i>
            </span></li>
    }
}

export default PlanItem