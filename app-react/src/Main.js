import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import Header from './components/Header'
  

class Main extends Component {
  render() {
    return (
      <div>
      <Header/> 
          <h2>Welcome to React</h2>
          </div>
    );
  }
}

export default Main;
