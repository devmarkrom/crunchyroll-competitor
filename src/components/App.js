import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Header from './Header';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Details from './Details';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataDetails: {}
    };
  }

  getDetails = data => {
    this.setState({
      dataDetails: data
    })
  }

  render() {
    return (
      <Grid> 
        <Router>
          <React.Fragment>
            <Header />
            <Route exact path="/" render={(props) => <Home {...props} getDetails={this.getDetails} />}/>
            <Route path="/details" render={(props) => <Details {...props} dataDetails={this.state.dataDetails} />}/>
          </React.Fragment>
        </Router>
      </Grid>
    );
  }
}

export default App;