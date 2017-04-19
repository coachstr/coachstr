import React from 'react'
import { browserHistory } from 'react-router'
import Header from "./components/Header"

class Drill extends React.Component {
    constructor(props) {
        super(props)

        this.newDrill = this.newDrill.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.findIndex = this.findIndex.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

        this.state = {
            title: '',
            description: '',
            duration: '',
            tags: [],
            tagString: '',
            incomingTagArray: [],
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
        console.log(this.props.params.planId)
        var incomingTagArray = new Array()
        for (var i = 0; i < this.state.drills.length; i++) {
            if (this.state.drills[i].id == this.props.params.drillId) {
                this.setState({ title: this.state.drills[i].title })
                this.setState({ description: this.state.drills[i].description })
                this.setState({ duration: this.state.drills[i].duration })
                for (var j = 0; j < this.state.drills[i].tags.length; j++) {
                    incomingTagArray: incomingTagArray.push(this.state.drills[i].tags[j].name)
                    this.setState({ tagString: incomingTagArray.toString() })
                }
            } else {
                console.log("no match state" + this.state.drills[i].id)
                console.log('this is not ' + this.props.params.drillId)
            }
        }
    }

    newDrill() {
        var title = this.state.title
        var description = this.state.description
        var duration = this.state.duration
        var tags = this.state.tagString.split(',')
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

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.newDrill()
        }
    }


    render() {


        return <div>
            <Header title={this.state.title} />

            <div className="container">
                <br />
                <a className="waves-effect waves-light btn backButton" onClick={() => browserHistory.push('/drills/' + this.props.params.planId)}><i className="material-icons left">fast_rewind</i>Back</a>
                <input type="text" className="form-control" placeholder="Enter drill title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea className="form-control" rows="10" id="instructions" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)}></textarea>
                </div>
                <input type="number" className="form-control" placeholder="Duration (in mins)" value={this.state.duration} onChange={(e) => this.setState({ duration: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />

                <input type="text" className="form-control" placeholder="Enter tags (1,2,3,...)" value={this.state.tagString} onChange={(e) => this.setState({ tagString: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
            </div>
            <br />

            <a className="btn-floating btn-large waves-effect waves-light red pull-right fab" onClick={
                this.newDrill}><i className="material-icons left">save</i></a>
        </div>

    }
}

export default Drill;
