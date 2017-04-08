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
    // var drills = this.state.drills
    // console.log('drills original state' + drills)

     fetch('/api/drills?token=' + token)
        .then(function(response) {
        return response.json();
        })
         .then(response => this.setState({ drills: response.drills}))

      //  fetch('/api/drills')
      //   .then(function(response) {
      //           console.log(response)
      //           return response.json()
      //       })
      //   .then(function(response) {
      //       console.log(response)
      //   })

        // .then(console.log('drills ' + response.json))
        // .then(res => this.setState({items: res, originalItems: res}))
    }

  render() {
    console.log('drills ' + this.state.drills)

     let drills = this.state.drills.map((drill, key) => {
      console.log(drill)
      return <Card key={key} id={drill.id} title={drill.title} description={drill.description} duration={drill.duration}/>
        })
        
    return (
      <div>
        <Header/>
        
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
            {/*<Card id="1" image="img/warriordrill.png" title="Piston (1-3-1)" description="a coach will start with a ball and a pusher is big on the ball. The keeper than can back off and play the passing lane back to the other coach. The weak side pusher splits the difference from the block player and other coach." duration="10"/>
            <Card id="2" image="https://unsplash.it/300" title="Warrior (1-3-1)" description="Coaches pass back and forth and the warrior must fight through continuous baseline screens. We teach fighting low through these screens forcing the offense away from scoring area and if we are late to the corner, it funnels the offense back into our umbrella trap. Drill continues for 20-25 seconds or when a certain number of deflections are met. Teaching point is that X1 should always be in line with the basketball." duration="5"/>
            <Card id="3" image="https://unsplash.it/200" title="Rebounding (1-3-1)" description="If a shot comes from the corner, we are vulnerable on the weak side boards, so we must run our keeper to the weak side boards to help the pusher. Statistically, 7/10 will bounce weak side so we must attack the weak side boards. The clogger must spin and get to the block and box out that area. If a shot is taken from the wing, we form a triangle with our X1 Warrior going to either pinch in the post or go to weak side. We try as much as possible to form a rebounding triangle." duration="15"/>
            <Card id="4" image="https://unsplash.it/200" title="Zone 1-3-1"/>*/}

          </div>

          </div>

      </div>
    );
  }
}

export default Main;
