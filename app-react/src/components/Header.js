import React, { Component } from 'react';
import { browserHistory } from 'react-router';


class Header extends Component {

  signout() {
    sessionStorage.clear()
    browserHistory.push('/')
  }

    render() {
        return (  <nav>
    <div className="nav-wrapper center orange darken-1">
      <a href="#" className="brand-logo center black-text">{this.props.title}</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a className="black-text" onClick={this.signout}>{sessionStorage.getItem('token') ? "Sign out" : "Sign in"}</a></li>
      </ul>
    </div>
  </nav>
        )
    }
}

export default Header;
