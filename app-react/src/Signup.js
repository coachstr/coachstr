import React, { Component } from 'react';
import { browserHistory } from 'react-router'


class Signup extends Component {

    constructor(props) {
        super(props)

        this.signup = this.signup.bind(this)

        this.state= {
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
        }  else if (!email.includes('@') || (email.slice(email.length - 4, email.length - 3) !== '.')) {
            alert('You must enter a valid email address')
        } else if (password !== confirmPassword) {
            alert('Your passwords must match')
        } else {
            browserHistory.push('/drills')
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
                    <div className="card-image">
                        <img src="https://unsplash.it/200" id="signinImage" />
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <form action="#">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" id="name"  value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                                    <label className="mdl-textfield__label" htmlFor="name">Name</label>
                                </div>
                            </form>
                            <form action="#">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" id="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                                    <label className="mdl-textfield__label" htmlFor="email">Email</label>
                                </div>
                            </form>
                            <form action="#">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="password" id="password"  value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                                    <label className="mdl-textfield__label" htmlFor="password">Password</label>
                                </div>
                            </form>
                            <form action="#">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="password" id="confirmPassword"  value={this.state.confirmPassword} onChange={(e) => this.setState({confirmPassword: e.target.value})}/>
                                    <label className="mdl-textfield__label" htmlFor="confirmPassword">Confirm Password</label>
                                </div>
                            </form>
                        </div>
                        <div className="card-action">
                            <div className="waves-effect waves-light btn-large" onClick={this.signup}>Sign Up</div>
                            <br/><br/>
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
