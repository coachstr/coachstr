import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import Header from './components/Header'
import Card from './components/Card'
import PlanItem from './components/PlanItem'


class Main extends Component {
  constructor(props) {
    super(props)

    // this.state= {
    //         email: '',
    //         password: ''
    //     }

    this.addDrill = this.addDrill.bind(this)

  }

  addDrill() {
    alert('Your drill has been added')
  }

  render() {
    return (
      <div>
        {/*<nav>
          <div className="nav-wrapper center orange darken-1">
            <a href="#" className="brand-logo center black-text">Drills</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a className="black-text" onClick={() => browserHistory.push('/signin')}>Sign In</a></li>
            </ul>
          </div>
        </nav>*/}

        <Header/>
        
        <div className="container">
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => browserHistory.push('/drill')}><i className="material-icons">add</i></a>
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
            <Card image="img/warriordrill.png" title="Piston (1-3-1)" description="a coach will start with a ball and a pusher is big on the ball. The keeper than can back off and play the passing lane back to the other coach. The weak side pusher splits the difference from the block player and other coach."/>
            <Card image="https://unsplash.it/300" title="Warrior (1-3-1)" description="Coaches pass back and forth and the warrior must fight through continuous baseline screens. We teach fighting low through these screens forcing the offense away from scoring area and if we are late to the corner, it funnels the offense back into our umbrella trap. Drill continues for 20-25 seconds or when a certain number of deflections are met. Teaching point is that X1 should always be in line with the basketball."/>
            <Card image="https://unsplash.it/200" title="Rebounding (1-3-1)" description="If a shot comes from the corner, we are vulnerable on the weak side boards, so we must run our keeper to the weak side boards to help the pusher. Statistically, 7/10 will bounce weak side so we must attack the weak side boards. The clogger must spin and get to the block and box out that area. If a shot is taken from the wing, we form a triangle with our X1 Warrior going to either pinch in the post or go to weak side. We try as much as possible to form a rebounding triangle."/>
            <Card image="https://unsplash.it/200" title="Zone 1-3-1"/>

          </div>

          </div>

      </div>
    );
  }
}

export default Main;
