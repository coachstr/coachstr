import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Row, Input } from 'react-materialize'


class Signin extends Component {

    constructor(props) {
        super(props)

        this.signin = this.signin.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

        this.state = {
            email: '',
            password: ''
        }
    }

    signin() {
        var email = this.state.email
        var password = this.state.password

        if (email === '' || password === '') {
            alert('You must enter your email and password')
        } else {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

                .then(function (response) {
                    return response.json()
                })

                .then(function (response) {

                    if (response.errors) {
                        alert(response.errors.error)
                        browserHistory.push('/signup')
                    } else {
                        if (response.user.token) {
                            sessionStorage.setItem('token', response.user.token)
                            browserHistory.push('/plans')
                        } else {
                            alert('There was an error signing in')
                            console.log('Signin : ' + response.user)
                        }
                    }
                })
        }

    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.signin()
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
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src="../img/logo.png" alt="Logo" id="signinImage" />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <Row>
                                    <Input s={12} label="Email" type="text" id="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                                    <Input s={12} label="Password" type="password" id="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e)} />
                                </Row>
                            </div>
                            <div className="card-action">
                                <div className="waves-effect waves-light btn-large" onClick={this.signin}>Sign In</div>
                                <br /><br />
                                <div className="waves-effect waves-light " onClick={() => browserHistory.push('/signup')}>Sign Up</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;
