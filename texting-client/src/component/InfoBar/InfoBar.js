import React from 'react';
import './InfoBar.css';

const InfoBar = ({ room }) => {
    return ( 
        <div className = 'infoBar' >
            <div className = 'leftInnerContainer' >
                <svg width = "1em"
                height = "1em"
                fill = "Green"
                className = "onlineIcon"
                xmlns = "http://www.w3.org/2000/svg" >
                    <circle cx = "6"
                     cy = "6"
                    r = "6" / >
                </svg> 
                <h3> { room } </h3> 
            </div> 
        </div> 
    );
}

export default InfoBar;