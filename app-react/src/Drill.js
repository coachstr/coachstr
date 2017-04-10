import React from 'react'
import { browserHistory } from 'react-router'
// import { connect } from 'react-redux'
// import store from 'store'

import Header from "./components/Header"

class AddDrill extends React.Component {
    constructor(props) {
        super(props)

        // this.onClick = this.onClick.bind(this)
        this.addTag = this.addTag.bind(this)
        this.newDrill = this.newDrill.bind(this)
        this.handleTag = this.handleTag.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.findIndex = this.findIndex.bind(this)
        // this.handleDefense = this.handleDefense.bind(this)
        // this.handleDribbling = this.handleDribbling.bind(this)
        // this.handleMan = this.handleMan.bind(this)
        // this.handleOffense = this.handleOffense.bind(this)
        // this.handlePassing = this.handlePassing.bind(this)
        // this.handleRebounding = this.handleRebounding.bind(this)
        // this.handleShooting = this.handleShooting.bind(this)
        // this.handleZone = this.handleZone.bind(this)

        this.state = {
            title: '',
            description: '',
            duration: '',
            tags: [],
            libraries: [],
            plans: [],
            drills: [],
            id: ''
        }

    }

    componentWillMount() {
        // console.log("drill id " + this.props.params.drillId)
        this.getInfo()
    }

    getInfo() {
        var token = sessionStorage.getItem('token');
        let id = this.props.params.drillId
        console.log("drill id 2 " + id)
        fetch('/api/drills?token=' + token)
        .then(function(response) {
        return response.json();
        })
        .then(response => this.setState({ drills: response.drills}))
            // .then(response => console.log("drill response " + response.drills[id].title))
        .then(response => console.log("drill response " + this.state.drills[0].title))
        .then(this.findIndex)

    }

    findIndex() {
        console.log('drill length ' + this.state.drills.length)
        for (var i = 0; i < this.state.drills.length; i++) {
            // alert(i)
            console.log("for loop id " + this.state.drills[i].id)
            if (this.state.drills[i].id == this.props.params.drillId) {
                console.log("matching title " + this.state.drills[i].title)
                this.setState({ title: this.state.drills[i].title})
                this.setState({ description: this.state.drills[i].description})
                this.setState({ duration: this.state.drills[i].duration})
                this.setState({ title: this.state.drills[i].title})
            } else {
                console.log("no match state" + this.state.drills[i].id)
                console.log('this is not ' + this.props.params.drillId)
            }

        }
    }

    handleTag(tag) {
        this.addTag(tag)
        document.getElementById(`${tag}`).setAttribute("disabled", "disabled")
    }
    
    addTag(tag) {
        if (this.state.tags.length === 0) {
        // this.state.tags = []
        this.setState.tags = this.state.tags.push(tag)
        console.log("no tags " + this.state.tags)

        } else {
            this.setState.tags = this.state.tags.push(tag)
            console.log("tags " + this.state.tags)
        }
    }

    newDrill() {
        var title = this.state.title
        var description = this.state.description
        var duration = this.state.duration
        var tags = this.state.tags
        var token = sessionStorage.getItem('token')
        var plans = this.state.plans
        var libraries = this.state.libraries
        var id = this.props.params.drillId
        
        var newDrillObject = {
            title,
            description,
            duration,
            tags,
            token,
            plans,
            libraries
        }
        if (title === '' || description === '' || duration === '') {
            alert('You must complete all fields')
        }
        else if (this.props.params.drillId == 'undefined') { 
            console.log("params = " + this.props.params.drillId)
            fetch('/api/drills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    duration: duration,
                    token: token,
                    tags: tags,
                    plans: plans,
                    libraries: libraries
                })
            })

        alert('Your drill has been saved')

        browserHistory.push('/drills')

        console.log(newDrillObject)
    } else {
        console.log("drill params defined")
        fetch('/api/drills/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    duration: duration,
                    token: token,
                    tags: tags,
                    plans: plans,
                    libraries: libraries,
                    id: id
                })
            })

        alert('Your drill has been updated')

        browserHistory.push('/drills')

        console.log(newDrillObject)
    }

}
       

    render() {


        return <div>
            <Header/>
            <div className="container">
                <br/>
            <a className="waves-effect waves-light btn backButton" onClick={() => browserHistory.push('/drills')}><i className="material-icons left">fast_rewind</i>Back</a>
            <input type="text" className="form-control" placeholder="Enter drill title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
            <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <textarea className="form-control" rows="10" id="instructions" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}></textarea>
            </div>
            <input type="text" className="form-control" placeholder="Duration (in mins)" value={this.state.duration} onChange={(e) => this.setState({ duration: e.target.value })} />

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

            {/*<a className="btn-floating btn-large waves-effect waves-light red pull-right fab" onClick={() => console.log(drillsArray)}>view</a>*/}

            <a className="btn-floating btn-large waves-effect waves-light red pull-right fab" onClick={
                this.newDrill}><i className="material-icons left">save</i></a>
        </div>

    }
}

export default AddDrill;