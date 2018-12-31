import React, { Component } from 'react';
import { Row, Col, Label , ControlLabel, FormControl } from 'react-bootstrap';
import Card from './Card';
import { loadSchedule } from '../api';

const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDay: this.getDay(),
            dataDay: {}
        };
    }

    componentDidMount() {
        loadSchedule(this.state.currentDay)
            .then(res => {
                this.setState({
                    dataDay: res.data[this.state.currentDay]
                })
            });
    }

    getDay() {
        let date = new Date();
        let today = date.getDay();
        return days[today];
    }

    selectDay = e => {
        if(e.currentTarget.value !== "---"){
            this.setState({
                currentDay: e.currentTarget.value
            })
            loadSchedule(e.currentTarget.value)
                .then(res => {
                    this.setState({
                        dataDay: res.data[this.state.currentDay]
                    })
                })
        }
    }

    render() { 
        return ( 
            <React.Fragment>
                <Row className="show-grid">
                    <Col md={8}>
                        <h2>Showing schedule of <Label className="label-day">{this.state.currentDay}</Label></h2>
                    </Col>
                    <Col md={4}>
                        <ControlLabel>Select other day</ControlLabel>
                        <FormControl componentClass="select" onChange={this.selectDay}>
                            <option value="---">---</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </FormControl>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <div className="columns">   
                            {Object.keys(this.state.dataDay).map( item =>
                                <Card key={item} data={this.state.dataDay[item]} getDetails={this.props.getDetails} />
                                )}
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
         );
    }
}
 
export default Home;