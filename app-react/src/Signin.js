import React, { Component } from 'react';
import { browserHistory } from 'react-router'


class Signin extends Component {

    constructor(props) {
        super(props)

        // this.signin = this.signin.bind(this)

        this.state= {
            email: '',
            password: ''
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
                                    <input className="mdl-textfield__input" type="text" id="email"  value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                                    <label className="mdl-textfield__label" htmlFor="email">Email</label>
                                </div>
                            </form>
                            <form action="#">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" id="password" />
                                    <label className="mdl-textfield__label" htmlFor="password">Password</label>
                                </div>
                            </form>
                        </div>
                        <div className="card-action">
                            <div className="waves-effect waves-light btn-large" onClick={() => browserHistory.push('/')}>Sign In</div>
                            <br/><br/>  
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
