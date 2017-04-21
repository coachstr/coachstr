import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import {Row, Input } from 'react-materialize'


class Signup extends Component {

    constructor(props) {
        super(props)

        this.signup = this.signup.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    signup() {
        var name = this.state.name
        var email = this.state.email
        var password = this.state.password
        var confirmPassword = this.state.confirmPassword
        console.log(name, email, password)

        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            alert('You must fill in all fields')
        } else if (!email.includes('@') || (email.slice(email.length - 4, email.length - 3) !== '.')) {
            alert('You must enter a valid email address')
        } else if (password !== confirmPassword) {
            alert('Your passwords must match')
        } else {
            // fetch goes here
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                // Back-end controls the left side, properties, of this object
                // Front-end controls the variables names and values on the right side
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                })
            })
                .then(function (response) {
                    return response.json();
                    console.log(response)
                })
                .then(function (response) {
                    console.log(response)

                    if (response.user) {
                        sessionStorage.setItem('token', response.user.token)
                        browserHistory.push('/plans')
                    }
                    else {
                        alert(response)
                    }
                })
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.signup()
        }
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Coachstr</h1>
                    <p>We're Talking About Practice</p>
                </div>
                <div className="col s6 m6 container signinCard text-center">
                    {/*<h2 className="header signinCard">Sign In</h2>*/}
                    <div className="card horizontal">
                        <div className="card-stacked">
                            <div className="card-content">
                              <Row>
                                <Input s={12} label="Name"  type="text" id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                                <Input s={12} label="Email"  type="text" id="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                                <Input s={12} label="Password"  type="password" id="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                                <Input s={12} label="Confirm Password"  type="password" id="confirmPassword" value={this.state.confirmPassword} onChange={(e) => this.setState({ confirmPassword: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                            </Row>
                            </div>
                            <div className="card-action">
                                <div className="waves-effect waves-light btn-large" onClick={this.signup}>Sign Up</div>
                                <br /><br />
                                <div className="waves-effect waves-light " onClick={() => browserHistory.push('/')}>Sign In</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
