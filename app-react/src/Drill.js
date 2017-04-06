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

        this.state = {
            title: '',
            description: '',
            duration: '',
            tags: []
        }

    }

    componentWillMount() {
        console.log(this.props.setFields)
    }

    // onClick(addDrill) {
    //     // Call parent addTodo method
    //     addDrill(this.state.title, this.state.body, this.state.link, this.state.tags)

    //     // Sets state of fields, and triggers render() again
    //     this.setState({
    //         title: '',
    //         body: '',
    //         link: '',
    //     })
    // }

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
        var newDrillObject = {
            title: this.state.title,
            description: this.state.description,
            duration: this.state.duration,
            tags: this.state.tags
        }

        console.log(newDrillObject)
        return newDrillObject

        alert('Your drill has been saved')

        browserHistory.push('/drills')
    }

    render() {


        return <div>
            <Header/>
            <div className="container">
                <br/>
            <a className="waves-effect waves-light btn backButton" onClick={() => browserHistory.push('/')}><i className="material-icons left">fast_rewind</i>Back</a>
            <input type="text" className="form-control" placeholder="Enter drill title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
            <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <textarea className="form-control" rows="10" id="instructions" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}></textarea>
            </div>
            <input type="text" className="form-control" placeholder="Duration (in mins)" value={this.state.duration} onChange={(e) => this.setState({ duration: e.target.value })} />

            <div className="btn-group" role="group" aria-label="..." >
                <button type="button" className="btn btn-lg active" onClick={() => this.addTag('Defense')} >Defense</button>
                <button type="button" className="btn btn-lg active" onClick={() => this.addTag('Dribbling')}>Dribbling</button>
                <button type="button" className="btn btn-lg" onClick={() => this.addTag('Man')}>Man</button>
                <button type="button" className="btn btn-lg" onClick={() => this.addTag('Offense')}>Offense</button>
                <button type="button" className="btn btn-lg" onClick={() => this.addTag('Passing')}>Passing</button>
                <button type="button" className="btn btn-lg" onClick={() => this.addTag('Rebounding')}>Rebounding</button>
                <button type="button" className="btn btn-lg" onClick={() => this.addTag('Shooting')}>Shooting</button>
                <button type="button" className="btn btn-lg" onClick={() => this.addTag('Zone')}>Zone</button>
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