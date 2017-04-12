import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import Header from './components/Header'
import PlanCard from './components/PlanCard'


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
    browserHistory.push('/plan/' + undefined)
  }

  componentWillMount() {
    this.getPlans()
  }

  getPlans() {
    var token = sessionStorage.getItem('token');

    fetch('/api/plans?token=' + token)
      .then(function (response) {
        return response.json();
      })
      .then(response => this.setState({ plans: response.plans }))
  }

  render() {
    console.log('plans ' + this.state.plans)

      let plans = this.state.plans.map((plan, key) => {
      console.log(plan) 
      return <PlanCard key={key} id={plan.id} title={plan.title} tags={plan.tags}/>
        })

    return (
      <div>
        <Header title='Plans' />

        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.addPlan}><i className="material-icons">add</i></a>
        </div>

        <div className="container">

          <h2 className="text-center">Plans</h2>
          {plans}
        </div>

      </div>
    );
  }
}

export default Plans;
