import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, Label , ControlLabel, FormControl } from 'react-bootstrap';
import Card from './Card';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDay: this.getDay(),
            dataDay: {}
        };
    }

    componentDidMount() {
        this.loadSchedule(this.state.currentDay);
    }

    getDay() {
        let date = new Date();
        let today = date.getDay();
        let days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
        return days[today];
    }

    loadSchedule(day) {
        Axios({
            method: 'GET',
            url: 'https://api.jikan.moe/v3/schedule/' + day
        }).then(res=>{
            this.setState({
                dataDay: res.data[day]
            })
        })
    }

    selectDay = e => {
        if(e.currentTarget.value !== "---"){
            this.setState({
                currentDay: e.currentTarget.value
            })
            this.loadSchedule(e.currentTarget.value);
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