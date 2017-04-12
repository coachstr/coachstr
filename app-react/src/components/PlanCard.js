import React from 'react'
import { browserHistory } from 'react-router'

import Chip from './Chip'

class PlanCard extends React.Component {

    constructor(props) {
    super(props)

        this.state= {
            plans: [],
            tags: []
        }

    // this.addToPlan = this.addToPlan.bind(this)
    this.viewPlan = this.viewPlan.bind(this)
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
         .then(response => this.setState({ plans: response.plans}))
    }


  viewPlan() {
      console.log(this.props.id)
      browserHistory.push('/drills/' + this.props.id)
  }

    setFields() {
        if (this.props.title !== undefined) {
            var title = this.props.title
            var drillObject = {
                title: title,
            }

            browserHistory.push('/plan/' + this.props.id)
            console.log(drillObject)
        } else {
            browserHistory.push('/plan/' + this.props.id)
        }
    }

    addToPlan() {
        alert('This drill has been added to your plan')
    }

    render() {
    let tags = this.props.tags.map((tag, key) => {
      return <Chip tag={tag.name}/>
    })

        return <div className="col-sm-6 col-m-4" >
            <div className="card blue-grey darken-1 small">
                <div className="card-content white-text" onClick={this.viewPlan}>
                    <div className="card-title">{this.props.title}<span> ({this.props.duration} mins)</span></div>
                    <p>{this.props.description}</p>
                </div>
                <div className="card-action">
                    {/*{tags}*/}
                </div>

                 {/*<a className="btn-floating waves-effect waves-light red cardFab" onClick={this.addToPlan}><i className="material-icons">add</i></a>*/}
            </div>

        </div>
    }
}

export default PlanCard
