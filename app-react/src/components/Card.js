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
    this.viewDrill = this.viewDrill.bind(this)
    this.setFields = this.setFields.bind(this)

  }

  addToPlan() {
      alert('This drill has been added to your plan')
  }

  viewDrill() {
      browserHistory.push('/drill/' + this.props.id)
  }

    setFields() {
        if (this.props.title !== undefined) {
            var title = this.props.title
            var description = this.props.description
            var duration = this.props.duration
            var drillObject = {
                title: title,
                description: description,
                duration: duration
            }

            browserHistory.push('/drill/' + this.props.id)
            console.log(drillObject)
        }
    }

    // componentWillMount() {
    //     this.props.getItems(this.props.params.itemId)
    // }
    render() {
        return <div className="col-sm-6 col-m-4" >
            <div className="card blue-grey darken-1 small">
                <div className="card-content white-text" onClick={this.setFields}>
                    <div className="card-title">{this.props.title}</div>
                    <p>{this.props.description}</p>
                </div>
                <div className="card-action">
                    <div className="chip">Defense</div>
                    <div className="chip">Zone</div>
                </div>

                 <a className="btn-floating waves-effect waves-light red cardFab" onClick={this.addToPlan}><i className="material-icons">add</i></a>
            </div>

        </div>
    }
}

export default Card