import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import {Modal, Button} from 'react-bootstrap'

import Header from './components/Header'
import PlanCard from './components/PlanCard'


class Plans extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plans: [],
      showModal: false
    }

    this.addPlan = this.addPlan.bind(this)
    this.getPlans = this.getPlans.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

  }

  addPlan() {
    browserHistory.push('/plan/' + undefined)
  }

  componentWillMount() {
    this.getPlans()
  }

  getPlans() {
    var token = sessionStorage.getItem('token');
    console.log('token ' + token)

    if (token === null) {
      alert('You must be signed in to view plans')
      browserHistory.push('/')
    } else {
      fetch('/api/plans?token=' + token)
        .then(function (response) {
          return response.json();
        })
        .then(response => this.setState({ plans: response.plans }))
    }
  }

      close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

  render() {
    console.log('plans ' + this.state.plans)

    let plans = this.state.plans.map((plan, key) => {
      console.log(plan)
      return <PlanCard key={key} id={plan.id} title={plan.title} tags={plan.tags} duration={plan.total_duration} drills={plan.drills} />
    })

    if (plans.length === 0) {
        return (
      <div>
        <Header title='Plans' />

        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.open}><i className="material-icons">add</i></a>
        </div>

        <div className="container">

          <h2 className="text-center">Plans</h2>
          <h3 className="text-center">It looks like you don't have any plans. Click the button to add one.</h3>

        </div>

      </div>
    );
    } else {

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

                        <Modal show={this.state.showModal} onHide={this.close} bsSize="small">
                    <Modal.Header closeButton className="modal-header">
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                        {/*{drills}*/}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="text-center" onClick={this.viewPlan}>Edit Plan</Button>
                    </Modal.Footer>
                </Modal>

      </div>
    );
    }
  }
}

export default Plans;
