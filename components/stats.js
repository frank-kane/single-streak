import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import React, { useState } from 'react';

export default function Stats(props) {


    return (
        <div className='main-stats'>
            <h3>Stats</h3>
            <div className='stats-grid'>
                <div><h6 className={`str ${props.fadeAnimation ? props.fadeOutClass : props.fadeInClass}`}>str: {props.stats.strength || 0}</h6></div>
                <div><h6>dex: {props.stats.dexerity || 0}</h6></div>
                <div><h6>int: {props.stats.intellect || 0}</h6></div>
                <div><h6>chr: {props.stats.charisma || 0}</h6></div>
                <div><h6>con: {props.stats.constitution || 0}</h6></div>
                <div><h6>wis: {props.stats.wisdom || 0}</h6></div>
            </div>
        </div>

    )
}