import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import Header from './components/Header'


class Main extends Component {
  constructor(props) {
    super(props)

    this.addDrill = this.addDrill.bind(this)

  }

  addDrill() {
    alert('Your drill has been added')
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper center orange darken-1">
            <a href="#" className="brand-logo center black-text">Drills</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a className="black-text" onClick={() => browserHistory.push('/signin')}>Sign In</a></li>
            </ul>
          </div>
        </nav>

        <h2 className="text-center">Welcome to React</h2>

        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.addDrill}><i className="material-icons">add</i></a>
        </div>

        <div className="container">
        <div className="leftColumn col-sm-3">
          <h2 className="text-center">Plan</h2>
          </div>

        <div className="rightColumn col-sm-9">
          <h2 className="text-center">Drills</h2>
          
          </div>

          </div>

      </div>
    );
  }
}

export default Main;
