import React from 'react'
import { browserHistory } from 'react-router'

class Card extends React.Component {

    constructor(props) {
    super(props)

    // this.state= {
    //         email: '',
    //         password: ''
    //     }

    this.addToPlan = this.addToPlan.bind(this)

  }

  addToPlan() {
      alert('This drill has been added to your plan')
  }

    // componentWillMount() {
    //     this.props.getItems(this.props.params.itemId)
    // }
    render() {
        return <div className="col-sm-6 col-m-4" onClick={this.addToPlan}>
            <div className="card blue-grey darken-1 small">
                <div className="card-content white-text">
                    <a className="btn-floating waves-effect waves-light red cardFab" onClick={this.addToPlan}><i className="material-icons">add</i></a>
                    <div className="card-title">{this.props.title}</div>
                    <p>{this.props.description}</p>
                </div>
                <div className="card-action">
                    <div className="chip">Defense</div>
                    <div className="chip">Zone</div>
                </div>
            </div>

        </div>
    }
}

export default Card