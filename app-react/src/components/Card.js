import React from 'react'
import { browserHistory } from 'react-router'
import { Modal, Button } from 'react-bootstrap'
import { Row, Input } from 'react-materialize'

import Chip from './Chip'

class Card extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            drills: [],
            tags: [],
            showModal: false,
            showEmailModal: false,
            sharedEmail: ''
        }

        this.addToPlan = this.addToPlan.bind(this)
        this.viewDrill = this.viewDrill.bind(this)
        this.addDrill = this.addDrill.bind(this)
        this.getTags = this.getTags.bind(this)
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.closeEmail = this.closeEmail.bind(this)
        this.openEmail = this.openEmail.bind(this)
        this.shareEmail = this.shareEmail.bind(this)

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
        //  .then(response => this.setState({ drills: response.drills}))
    }


    viewDrill(planId) {
        console.log('card plandId ' + planId)
        browserHistory.push('/drill/' + planId + '/' + this.props.id)
    }

    setFields() {
        if (this.props.title !== undefined) {
            var title = this.props.title
            var description = this.props.description
            var duration = this.props.duration
            var drillObject = {
                title: title,
                description: description,
                duration: duration
            }

            browserHistory.push('/drill/' + this.props.id)
            console.log(drillObject)
        } else {
            browserHistory.push('/drill/' + this.props.id)
        }
    }

    addToPlan() {
        alert('This drill has been added to your plan')
    }

    addDrill(drillId, drillTitle, drillIdArray, drillTitleArray, getPlanDrills) {
        if (drillIdArray.length === 0) {
            drillIdArray = drillIdArray.push(drillId)
            drillTitleArray = drillTitleArray.push(drillTitle)
        } else {
            drillIdArray = drillIdArray.push(drillId)
            drillTitleArray = drillTitleArray.push(drillTitle)
        }

        getPlanDrills()

        // alert('you have added ' + drillTitle.title)
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    closeEmail() {
        this.setState({ showEmailModal: false });
    }

    openEmail() {
        this.close()
        this.setState({ showEmailModal: true });
    }

    shareEmail() {
        var sharedEmail = this.state.sharedEmail
        if (sharedEmail === '') {
            alert('You must enter an email address')
        } else if (!sharedEmail.includes('@') || (sharedEmail.slice(sharedEmail.length - 4, sharedEmail.length - 3) !== '.')) {
            alert('You must enter a valid email address')
        } else {
            console.log('/api/drills/' + this.props.id + '/shares')
            fetch('/api/drills/' + this.props.id + '/shares', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: sharedEmail
                })
            })

                .then(function (response) {
                    return response.json()
                })

                .then(function (response) {
                    console.log(response)
                })

            this.closeEmail()
            alert('You have shared this drill with ' + this.state.sharedEmail)
            this.setState({ sharedEmail : ''})
        }
}

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.shareEmail()
        }
    }

    render() {
        let tags = this.props.tags.map((tag, key) => {
            return <Chip tag={tag.name} key={key} />
        })

        return <div className="col-sm-6 col-m-4" >
            <div className="card blue-grey darken-1 small drillCard">
                <div className="card-content white-text" onClick={this.open}>
                    {/*<div className="card-content white-text" onClick={() => this.viewDrill(this.props.planId)}>*/}
                    <div className="card-title">{this.props.title}<span> ({this.props.duration} mins)</span></div>
                    <p>{this.props.description}</p>
                </div>
                <div className="card-action">
                    {tags}
                </div>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton className="modal-header text-center">
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.description}
                        <hr />
                        {tags}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-left" onClick={() => this.viewDrill(this.props.planId)}>Edit Details</Button>
                        <Button className="pull-right" onClick={this.openEmail}>Share</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showEmailModal} onHide={this.closeEmail}>
                    <Modal.Header closeButton className="modal-header text-center">
                        <Modal.Title>Share {this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input s={12} label="Email" type="text" id="email" value={this.state.sharedEmail} onChange={(e) => this.setState({ sharedEmail: e.target.value })}  onKeyPress={(e) => this.handleKeyPress(e)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.shareEmail}>Share Drill</Button>
                    </Modal.Footer>
                </Modal>

                <a className="btn-floating waves-effect waves-light red cardFab" onClick={() => this.addDrill(this.props.id, this.props.drill, this.props.drillIdArray, this.props.drillTitleArray, this.props.addItemFunction)}><i className="material-icons">add</i></a>
            </div>

        </div>
    }
}

export default Card
