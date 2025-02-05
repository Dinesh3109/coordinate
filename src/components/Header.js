import React from 'react';
import '../style/style.css';
import Compass from '../compass.jpg';

export default class Header extends React.Component{
    render(){
        return(
            <div className="header button">
                <img src={Compass} alt="logo" className="logo"></img>
            </div>
        )
    }
} 