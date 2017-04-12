import React from 'react'
import { browserHistory } from 'react-router'
// import { connect } from 'react-redux'
// import store from 'store'

import Header from "./components/Header"

class Plan extends React.Component {
    constructor(props) {
        super(props)

        this.addTag = this.addTag.bind(this)
        this.newPlan = this.newPlan.bind(this)
        this.handleTag = this.handleTag.bind(this)
        this.getInfo = this.getInfo.bind(this)
        // this.findIndex = this.findIndex.bind(this)

        this.state = {
            title: '',
            tags: [],
            libraries: [],
            plans: [],
            id: ''
        }

    }

    componentWillMount() {
        this.getInfo()
    }

    getInfo() {
        var token = sessionStorage.getItem('token');
        let id = this.props.params.drillId
        fetch('/api/drills?token=' + token)
        .then(function(response) {
        return response.json();
        })
        .then(response => this.setState({ plans: response.plans}))
        .then(this.findIndex)
    }

    // findIndex() {
    //     for (var i = 0; i < this.state.drills.length; i++) {
    //         if (this.state.drills[i].id == this.props.params.drillId) {
    //             this.setState({ title: this.state.drills[i].title})
    //             this.setState({ description: this.state.drills[i].description})
    //             this.setState({ duration: this.state.drills[i].duration})
    //         } else {
    //             console.log("no match state" + this.state.drills[i].id)
    //             console.log('this is not ' + this.props.params.drillId)
    //         }
    //     }
    // }

    handleTag(tag) {
        this.addTag(tag)
        document.getElementById(`${tag}`).setAttribute("disabled", "disabled")
    }

    addTag(tag) {
        if (this.state.tags.length === 0) {
        this.setState.tags = this.state.tags.push(tag)
        console.log("no tags " + this.state.tags)

        } else {
            this.setState.tags = this.state.tags.push(tag)
            console.log("tags " + this.state.tags)
        }
    }

    newPlan() {
        var title = this.state.title
        var tags = this.state.tags
        var token = sessionStorage.getItem('token')
        var id = this.props.params.planId

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
                    tags: tags,
                    id: id
                })
            })

        alert('Your plan has been saved')

        browserHistory.push('/plans')

        console.log(newPlanObject)
    } else {
        console.log("plans params defined")
        fetch('/api/plans/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    token: token,
                    tags: tags,
                    id: id
                })
            })

        alert('Your plan has been updated')

        // browserHistory.push('/plans')

        console.log(newPlanObject)
    }

}


    render() {


        return <div>
            <Header/>
            <div className="container">
                <br/>
            <a className="waves-effect waves-light btn backButton" onClick={() => browserHistory.push('/plans')}><i className="material-icons left">fast_rewind</i>Back</a>
            <input type="text" className="form-control" placeholder="Enter plan title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />

            <div className="btn-group" role="group" aria-label="..." >
                <button type="button" className="btn btn-lg" id="Defense" onClick={() => this.handleTag('Defense')} >Defense</button>
                <button type="button" className="btn btn-lg" id="Dribbling" onClick={() => this.handleTag('Dribbling')}>Dribbling</button>
                <button type="button" className="btn btn-lg" id="Man" onClick={() => this.handleTag('Man')}>Man</button>
                <button type="button" className="btn btn-lg" id="Offense" onClick={() => this.handleTag('Offense')}>Offense</button>
                <button type="button" className="btn btn-lg" id="Passing" onClick={() => this.handleTag('Passing')}>Passing</button>
                <button type="button" className="btn btn-lg" id="Rebounding" onClick={() => this.handleTag('Rebounding')}>Rebounding</button>
                <button type="button" className="btn btn-lg" id="Shooting" onClick={() => this.handleTag('Shooting')}>Shooting</button>
                <button type="button" className="btn btn-lg" id="Zone" onClick={() => this.handleTag('Zone')}>Zone</button>
            </div>
            </div>
            <br />

            <a className="btn-floating btn-large waves-effect waves-light red pull-right fab" onClick={
                this.newPlan}><i className="material-icons left">save</i></a>
        </div>

    }
}

export default Plan;
