import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import styles from '../public/css/index.css'

import Header from './components/Header'
import Card from './components/Card'
import PlanItem from './components/PlanItem'


class Drills extends Component {
  constructor(props) {
    super(props)

    this.state = {
      drills: [],
      planDrills: [],
      incomingPlanDrills: [],
      drillTitles: [],
      planTitle: '',
      id: ''
    }

    // this.addDrill = this.addDrill.bind(t his)
    this.getDrills = this.getDrills.bind(this)
    this.getPlanDrills = this.getPlanDrills.bind(this)
    this.getPlanName = this.getPlanName.bind(this)
    this.viewNewDrills = this.viewNewDrills.bind(this)
    this.savePlan = this.savePlan.bind(this)

  }

  addDrill(drill) {
    if (this.state.drills.length === 0) {
      this.setState.drills = this.state.drills.push(drill)
      console.log("no drills from adddrill" + this.state.drills)
    } else {
      this.setState.drills = this.state.drills.push(drill)
      console.log("drills from adddrill" + this.state.drills)
    }
    console.log('function from drills to card' + this.state.drills)
  }

  componentWillMount() {
    this.getDrills()
    this.getPlanDrills()
    this.getPlanName()
  }

  getDrills() {
    var token = sessionStorage.getItem('token');
    let id = this.props.params.planId

    if (token === null) {
      alert('You must be signed in to view drills')
      browserHistory.push('/')
    } else {
      fetch('/api/drills?token=' + token)
        .then(function (response) {
          return response.json();
        })
        .then(response => this.setState({ drills: response.drills }))
    }
  }

  getPlanDrills() {
    var token = sessionStorage.getItem('token');
    let id = this.props.params.planId
    console.log('getplandrills')

    fetch('/api/plans/' + id + '?token=' + token)
      .then(function (response) {
        return response.json();
      })
      .then(response => this.setState({ incomingPlanDrills: response.plan.drills }))
  }

  viewNewDrills() {
    this.setState({ incomingPlanDrills: this.state.drillTitles })
    console.log(this.state.drillTitles)
  }

    getPlanName() {
    var token = sessionStorage.getItem('token');
    let id = this.props.params.planId
    console.log('getplanname')

    fetch('/api/plans/' + id + '?token=' + token)
      .then(function (response) {
        return response.json();
      })
      .then(response => this.setState({ planTitle: response.plan.title }))
  }

  savePlan() {
    let id = this.props.params.planId
    var token = sessionStorage.getItem('token')
    fetch('/api/plans/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        drills: this.state.planDrills,
        token: token
      })
    })
    console.log(this.state.planDrills)
    browserHistory.push('/plans')
    alert('Your plan has been saved ')
  }

  render() {

    let incomingPlanDrills = this.state.incomingPlanDrills.map((incomingDrill, key) => {
      console.log(incomingDrill)
      return <PlanItem key={key} title={incomingDrill.title} />
    })

    let drills = this.state.drills.map((drill, key) => {
      console.log(drill)
      return <Card key={key} id={drill.id} drill={drill} title={drill.title} description={drill.description} duration={drill.duration} tags={drill.tags} drillIdArray={this.state.planDrills} planId={this.props.params.planId} drillTitleArray={this.state.drillTitles} addItemFunction={this.viewNewDrills}
        />
    })

    return (
      <div>
        <Header title={this.state.planTitle} />
        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => browserHistory.push('/drill/' + this.props.params.planId + '/' + this.props.id)}><i className="material-icons">add</i></a>
        </div>

        <div className="container">
          <div className="leftColumn col-sm-3">
            <h2 className="text-center newFont">Plan</h2>
            <ul className="collection planItems">
              {incomingPlanDrills}
              <li className="collection-item text-center savePlan" onClick={this.savePlan}>Save Plan</li>
            </ul>
          </div>

          <div className="rightColumn col-sm-9">
            <h2 className="text-center newFont">Drills</h2>
            {drills}
          </div>

        </div>

      </div>
    );
  }
}

export default Drills;
