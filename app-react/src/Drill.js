import React from 'react'
import { browserHistory } from 'react-router'
import Header from "./components/Header"

class Drill extends React.Component {
    constructor(props) {
        super(props)

        this.addTag = this.addTag.bind(this)
        this.newDrill = this.newDrill.bind(this)
        this.handleTag = this.handleTag.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.findIndex = this.findIndex.bind(this)

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
        this.getInfo()
    }

    getInfo() {
        var token = sessionStorage.getItem('token');
        let id = this.props.params.drillId

        if (token === null) {
            alert('You must be signed in to create drills')
            browserHistory.push('/')
        } else {
            fetch('/api/drills?token=' + token)
                .then(function (response) {
                    return response.json();
                })
                .then(response => this.setState({ drills: response.drills }))
                .then(this.findIndex)
        }
    }

    findIndex() {
        for (var i = 0; i < this.state.drills.length; i++) {
            if (this.state.drills[i].id == this.props.params.drillId) {
                this.setState({ title: this.state.drills[i].title })
                this.setState({ description: this.state.drills[i].description })
                this.setState({ duration: this.state.drills[i].duration })
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

            browserHistory.push('/drills/' + this.props.params.planId)

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

            browserHistory.push('/drills/' + this.props.params.planId)

            console.log(newDrillObject)
        }

    }


    render() {


        return <div>
            <Header title={'Plan ' + this.state.id} />
            <div className="container">
                <br />
                <a className="waves-effect waves-light btn backButton" onClick={() => browserHistory.push('/drills/' + this.props.params.planId)}><i className="material-icons left">fast_rewind</i>Back</a>
                <input type="text" className="form-control" placeholder="Enter drill title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea className="form-control" rows="10" id="instructions" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}></textarea>
                </div>
                <input type="number" className="form-control" placeholder="Duration (in mins)" value={this.state.duration} onChange={(e) => this.setState({ duration: e.target.value })} />

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
                this.newDrill}><i className="material-icons left">save</i></a>
        </div>

    }
}

export default Drill;
