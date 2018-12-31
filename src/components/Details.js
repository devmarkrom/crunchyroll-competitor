import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, Table } from 'react-bootstrap';

class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
            episodes: {},
            characters: {}
        };
    }

    componentDidMount() {
        this.getInfo(this.props.dataDetails.mal_id);
    }

    getInfo(id) {
        Axios({
            method: 'GET',
            url: 'https://api.jikan.moe/v3/anime/' + id + '/characters_staff'
        }).then(res=>{
            this.setState({
                characters: res.data.characters
            })
        });
        Axios({
            method: 'GET',
            url: 'https://api.jikan.moe/v3/anime/' + id + '/episodes'
        }).then(res=>{
            this.setState({
                episodes: res.data.episodes                
            })
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <Row className="show-grid details">
                    <Col md={12}>
                        <h2>{this.props.dataDetails.title}</h2>
                    </Col>
                </Row>
                <Row className="show-grid details">
                    <Col md={4} className="img-cntr">
                        <img alt={this.props.dataDetails.title} src={this.props.dataDetails.image_url} />
                    </Col>
                    <Col md={8}>
                        <h3>Synopsis</h3>
                        <p>{this.props.dataDetails.synopsis}</p>
                    </Col>
                </Row>
                <Row className="show-grid details">
                    <Col md={12}>
                        <h3>Characters</h3>
                        { this.state.characters.length > 0 ? (
                            <div className="characters-list">
                            <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(this.state.characters).map( item =>
                                    <tr key={item}>
                                        <td>
                                            <img className="thumbs" alt={this.state.characters[item].name} src={this.state.characters[item].image_url} />
                                        </td>
                                        <td>{this.state.characters[item].name}</td>
                                    </tr>
                                    )}
                            </tbody>
                            </Table>
                        </div>
                        ) : (
                            <p>No information about characters yet.</p>
                        ) }                      
                    </Col>
                </Row>
                <Row className="show-grid details">
                    <Col md={12}>
                    <h3>Episodes</h3>
                        { this.state.episodes.length > 0 ? (
                            <div className="episodes-list">
                            <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(this.state.episodes).map( item =>
                                    <tr key={item}>
                                        <td>{this.state.episodes[item].episode_id}</td>
                                        <td>{this.state.episodes[item].title}</td>
                                    </tr>
                                    )}
                            </tbody>
                            </Table>
                        </div> 
                        ) : ( 
                            <p>No information about episodes yet.</p>
                        ) }
                    </Col>
                </Row>
            </React.Fragment>
         );
    }
}
 
export default Details;