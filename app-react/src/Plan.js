import React from 'react'
import { browserHistory } from 'react-router'
// import { connect } from 'react-redux'
// import store from 'store'

import Header from "./components/Header"

class Plan extends React.Component {
    constructor(props) {
        super(props)

        this.newPlan = this.newPlan.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.getDrills = this.getDrills.bind(this)
        this.findIndex = this.findIndex.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

        this.state = {
            title: '',
            tags: [],
            tagString: '',
            libraries: [],
            plans: [],
            id: ''
        }

    }

    componentWillMount() {
        this.getInfo()
        this.getDrills()
    }

    getInfo() {
        var token = sessionStorage.getItem('token');
        let id = this.props.params.planId

        if (token === null) {
            alert('You must be signed in to create plans')
            browserHistory.push('/')
        } else {
            fetch('/api/plans?token=' + token)
                .then(function (response) {
                    return response.json();
                })
                .then(response => this.setState({ plans: response.plans }))
                .then(this.findIndex)
        }
    }

    findIndex() {
        var incomingTagArray = new Array()
        for (var i = 0; i < this.state.plans.length; i++) {
            if (this.state.plans[i].id == this.props.params.planId) {
                this.setState({ title: this.state.plans[i].title })
                for (var j = 0; j < this.state.plans[i].tags.length; j++) {
                    incomingTagArray: incomingTagArray.push(this.state.plans[i].tags[j].name)
                    this.setState({ tagString: incomingTagArray.toString() })
                }
            } else {
                console.log("no match state" + this.state.plans[i].id)
                console.log('this is not ' + this.props.params.planId)
            }
        }
    }

    newPlan() {
        var title = this.state.title
        var tags = this.state.tagString.split(',')
        var token = sessionStorage.getItem('token')
        var id = this.props.params.planId
        var drills = this.state.drills

        var newPlanObject = {
            title,
            tags,
            token,
            id
        }
        console.log('id ' + this.props.params.planId)
        if (title === '') {
            alert('You must complete all fields')
        }
        else if (this.props.params.planId == 'undefined') {
            console.log("params = " + this.props.params.planId)
            fetch('/api/plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    token: token,
                    tags: tags
                })
            })

            alert('Your plan has been saved')

            browserHistory.push('/plans')

            console.log(newPlanObject)
        } else {
            console.log("params = " + this.props.params.planId)
            fetch('/api/plans/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    drills: drills,
                    title: title,
                    token: token,
                    tags: tags,
                    id: id
                })
            })

            alert('Your plan has been updated')

            browserHistory.push('/plans')

            console.log(newPlanObject)
        }

    }

    getDrills() {
    var token = sessionStorage.getItem('token');
    let id = this.props.params.planId

      fetch('/api/drills?token=' + token)
        .then(function (response) {
          return response.json();
        })
        .then(response => this.setState({ drills: response.drills }))
  }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.newPlan()
        }
    }



    render() {


        return <div>
            <Header />
            <div className="container">
                <br />
                <a className="waves-effect waves-light btn backButton" onClick={() => browserHistory.push('/plans')}><i className="material-icons left">fast_rewind</i>Back</a>
                <input type="text" className="form-control" placeholder="Enter plan title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                <input type="text" className="form-control" placeholder="Enter tags (1,2,3,...)" value={this.state.tagString} onChange={(e) => this.setState({ tagString: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
            </div>
            <br />

            <a className="btn-floating btn-large waves-effect waves-light red pull-right fab" onClick={
                this.newPlan}><i className="material-icons left">save</i></a>
        </div>

    }
}

export default Plan;
