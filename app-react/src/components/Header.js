import React, { Component } from 'react';
import { browserHistory } from 'react-router';


class Header extends Component {


    render() {
        return (<nav className="nav-extended">
            <div className="nav-wrapper">
                <a href="#!" className="brand-logo">Logo</a>
                <ul className="right hide-on-med-and-down">
                    <li><a>A link</a></li>
                    <li><a>A second link</a></li>
                    <li><a>A third link</a></li>
                </ul>
            </div>
            <div className="nav-content">
                <span className="nav-title">Title</span>
                <a className="btn-floating btn-large halfway-fab waves-effect waves-light teal">
                    <i className="material-icons">add</i>
                </a>
            </div>
        </nav>
        )
    }
}

export default Header;
