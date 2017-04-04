import React, { Component } from 'react';
import { browserHistory } from 'react-router'


class Signup extends Component {

    constructor(props) {
        super(props)

        // this.signin = this.signin.bind(this)

        this.state= {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    render() {
        return (
            <div>Sign Up</div>
        )
    }
}

export default Signup;
