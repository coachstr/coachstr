import React from 'react'
import { browserHistory } from 'react-router'

import Chip from './Chip'

class Card extends React.Component {

    constructor(props) {
    super(props)

        this.state= {
            drills: [],
            tags: []
        }

    this.addToPlan = this.addToPlan.bind(this)
    this.viewDrill = this.viewDrill.bind(this)
    this.getTags = this.getTags.bind(this)

  }

componentWillMount() {
        this.getTags()
    }

    getTags() {
    var token = sessionStorage.getItem('token');

     fetch('/api/drills?token=' + token)
        .then(function(response) {
        return response.json();
        })
         .then(response => this.setState({ drills: response.drills}))
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
        } else {
            browserHistory.push('/drill/' + this.props.id)
        }
    }

    addToPlan() {
        alert('This drill has been added to your plan')
    }

    render() {

    let drills = this.state.drills.map((drill, key) => {
        if (drill.id === this.props.id) {
      return <Chip tag={drill.tags[0].name}/>
        }
    })

        return <div className="col-sm-6 col-m-4" >
            <div className="card blue-grey darken-1 small">
                <div className="card-content white-text" onClick={this.viewDrill}>
                    <div className="card-title">{this.props.title}<span> ({this.props.duration} mins)</span></div>
                    <p>{this.props.description}</p>
                </div>
                <div className="card-action">
                    {drills}
                </div>

                 <a className="btn-floating waves-effect waves-light red cardFab" onClick={this.addToPlan}><i className="material-icons">add</i></a>
            </div>

        </div>
    }
}

export default Card