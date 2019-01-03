import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() { 
        return ( 
            <Link to="/crunchyroll-competitor" className="link">
                <h1 className="header">Crunchyroll Competitor</h1>
            </Link>  
         );
    }
}
 
export default Header;