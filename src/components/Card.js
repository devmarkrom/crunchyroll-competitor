import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    render() { 
        return ( 
            <Link to="/details">
                <figure onClick={ () => this.props.getDetails( this.props.data ) }>
                    <img alt={this.props.data.title} src={this.props.data.image_url} />
                </figure>
            </Link>
         );
    }
}
 
export default Card;