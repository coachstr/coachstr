import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import Header from './components/Header'
import Card from './components/Card'


class Plans extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plans: []
    }

    this.addPlan = this.addPlan.bind(this)
    this.getPlans = this.getPlans.bind(this)

  }

  addPlan() {
    alert('Your plan has been added')
  }

  componentWillMount() {
    this.getPlans()
  }

  getPlans() {
    var token = sessionStorage.getItem('token');

    fetch('/api/plans?token=' + token)
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(console.log('log'))
      .then(response => this.setState({ plans: response.plans }))
  }

  render() {
      let plans = this.state.plans.map((plan, key) => {
      console.log(plan) 
      return <Card key={key} id={plan.id} title={plan.title}/>
        })

    return (
      <div>
        <Header title='Plans' />

        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.addPlan}><i className="material-icons">add</i></a>
        </div>

        <div className="container">

          <h2 className="text-center">Drills</h2>
        </div>

      </div>
    );
  }
}

export default Plans;
