import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import Header from './components/Header'
import Card from './components/Card'
import PlanItem from './components/PlanItem'


class Main extends Component {
  constructor(props) {
    super(props)

    this.state= {
            drills: []
        }

    this.addDrill = this.addDrill.bind(this)
    this.getDrills = this.getDrills.bind(this)

  }

  addDrill() {
    alert('Your drill has been added')
  }

    componentWillMount() {
        this.getDrills()
    }

    getDrills() {
    var token = sessionStorage.getItem('token');

     fetch('/api/drills?token=' + token)
        .then(function(response) {
        return response.json();
        })
         .then(response => this.setState({ drills: response.drills}))
    }

  render() {
    console.log('drills ' + this.state.drills)

     let drills = this.state.drills.map((drill, key) => {
      console.log(drill)
      return <Card key={key} id={drill.id} title={drill.title} description={drill.description} duration={drill.duration} tags={drill.tags} />
        })

    return (
      <div>
        <Header title='Plan X'/>
        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => browserHistory.push('/drill/' + this.props.id)}><i className="material-icons">add</i></a>
        </div>

        <div className="container">
        <div className="leftColumn col-sm-3">
          <h2 className="text-center newFont">Plan</h2>
          <ul className="collection planItems">
            <PlanItem title="Piston (1-3-1)"/>
            <PlanItem title="Piston (1-3-1)"/>
            <PlanItem title="Piston (1-3-1)"/>
            <PlanItem title="Piston (1-3-1)"/>
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
