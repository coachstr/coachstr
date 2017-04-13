import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import styles from '../public/css/index.css'

import Header from './components/Header'
import Card from './components/Card'
import PlanItem from './components/PlanItem'


class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      drills: [],
      planDrills: [],
      incomingPlanDrills: [],
      id: ''
    }

    // this.addDrill = this.addDrill.bind(t his)
    this.getDrills = this.getDrills.bind(this)
    this.getPlanDrills = this.getPlanDrills.bind(this)
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
    console.log('function from main to card' + this.state.drills)
  }

  componentWillMount() {
    this.getDrills()
    this.getPlanDrills()
  }

  getDrills() {
    var token = sessionStorage.getItem('token');
    let id = this.props.params.planId

    fetch('/api/drills?token=' + token)
      .then(function (response) {
        return response.json();
      })
    .then(response =>  this.setState({ drills: response.drills }))
  }

  getPlanDrills() {
    var token = sessionStorage.getItem('token');
    let id = this.props.params.planId

     fetch('/api/plans/'+ id +'?token=' + token)
        .then(function(response) {
        return response.json();
      })
      .then(response =>  this.setState({ incomingPlanDrills: response.plan.drills }))
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
    alert('Your plan has been saved')
  }

  render() {

    let incomingPlanDrills = this.state.incomingPlanDrills.map((incomingDrill, key) => {
      console.log(incomingDrill)
      return <PlanItem key={key} title={incomingDrill.title}/>
    })

    let drills = this.state.drills.map((drill, key) => {
      console.log(drill)
      return <Card key={key} id={drill.id} title={drill.title} description={drill.description} duration={drill.duration} tags={drill.tags} drillArray={this.state.planDrills}/>
    })

    return (
      <div>
        <Header title={this.props.params.planId} />
        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => browserHistory.push('/drill/' + this.props.id)}><i className="material-icons">add</i></a>
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

export default Main;
