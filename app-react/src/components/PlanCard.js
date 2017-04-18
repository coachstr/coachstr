import React from 'react'
import { browserHistory } from 'react-router'
import { Modal, Button } from 'react-bootstrap'

import Chip from './Chip'
import PlanDrill from './PlanDrill'

class PlanCard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            plans: [],
            tags: [],
            drills: [],
            showModal: false,
        }

        // this.addToPlan = this.addToPlan.bind(this)
        this.viewPlan = this.viewPlan.bind(this)
        this.getTags = this.getTags.bind(this)
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)

    }

    componentWillMount() {
        this.getTags()
    }

    getTags() {
        var token = sessionStorage.getItem('token');

        fetch('/api/drills?token=' + token)
            .then(function (response) {
                return response.json();
            })
            .then(response => this.setState({ plans: response.plans }))
    }


    viewPlan() {
        console.log(this.props.id)
        browserHistory.push('/drills/' + this.props.id)
    }

    setFields() {
        if (this.props.title !== undefined) {
            var title = this.props.title
            var drillObject = {
                title: title,
            }

            browserHistory.push('/plan/' + this.props.id)
            console.log(drillObject)
        } else {
            browserHistory.push('/plan/' + this.props.id)
        }
    }

    addToPlan() {
        alert('This drill has been added to your plan')
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        let tags = this.props.tags.map((tag, key) => {
            return <Chip tag={tag.name} />
        })

        let drills = this.props.drills.map((drill, key) => {
            console.log(drill.title)
            return <PlanDrill drill={drill.title} />
        })

        return <div className="col-sm-4 col-m-4" >
            <div className="card blue-grey darken-1 small" onClick={this.open}>
                <div className="card-content white-text">
                    <div className="card-title">{this.props.title}<span> ({this.props.duration} mins)</span></div>
                    <ul>
                        {drills}
                    </ul>
                </div>
                <div className="card-action">
                    {tags}
                </div>

                <Modal show={this.state.showModal} onHide={this.close} bsSize="small">
                    <Modal.Header closeButton className="modal-header text-center">
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                        {drills}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="text-center" onClick={this.viewPlan}>Edit Plan</Button>
                    </Modal.Footer>
                </Modal>

                {/*<a className="btn-floating waves-effect waves-light red cardFab" onClick={this.addToPlan}><i className="material-icons">add</i></a>*/}
            </div>


        </div>
    }
}

export default PlanCard
