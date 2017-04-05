import React from 'react'
import { browserHistory } from 'react-router'
// import { connect } from 'react-redux'
// import store from 'store'

import Header from "./components/Header"

class AddDrill extends React.Component {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this)

        this.state = {
            title: '',
            body: '',
            link: '',
            tags: ''
        }

    }

    onClick(addDrill) {
        // Call parent addTodo method
        addDrill(this.state.title, this.state.body, this.state.link, this.state.tags)

        // Sets state of fields, and triggers render() again
        this.setState({
            title: '',
            body: '',
            link: '',
            tags: ''
        })
    }

    render() {
        // var drills = store.get('drills')

        // if (!drills) {
        //     drills = []
        // }

        // drills.push(this.state)


        return <div>
            <Header/>
            <div className="container">
                <br/>
            <a className="waves-effect waves-light btn backButton" onClick={() => browserHistory.push('/')}><i className="material-icons left">fast_rewind</i>Back</a>
            <input type="text" className="form-control" placeholder="Enter drill title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
            <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <textarea className="form-control" rows="10" id="instructions" value={this.state.body} onChange={(e) => this.setState({ body: e.target.value })}></textarea>
            </div>
            <input type="text" className="form-control" placeholder="Duration (in mins)" value={this.state.link} onChange={(e) => this.setState({ link: e.target.value })} />

            <div className="btn-group" role="group" aria-label="..." >
                <button type="button" className="btn btn-lg">Defense</button>
                <button type="button" className="btn btn-lg">Dribbling</button>
                <button type="button" className="btn btn-lg">Man</button>
                <button type="button" className="btn btn-lg">Offense</button>
                <button type="button" className="btn btn-lg">Passing</button>
                <button type="button" className="btn btn-lg">Rebounding</button>
                <button type="button" className="btn btn-lg">Shooting</button>
                <button type="button" className="btn btn-lg">Zone</button>
            </div>
            </div>
            <br />

            {/*<a className="btn-floating btn-large waves-effect waves-light red pull-right fab" onClick={() => console.log(drillsArray)}>view</a>*/}

            <a className="btn-floating btn-large waves-effect waves-light red pull-right fab" onClick={() =>
                {alert('Your drill has been saved'); browserHistory.push('/') }}><i className="material-icons left">save</i></a>
        </div>

    }
}

export default AddDrill;