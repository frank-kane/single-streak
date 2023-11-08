import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import React, { useState } from 'react';

export default function Stats(props) {


    return (
        <div className='main-stats'>
            <h3>Stats</h3>
            <div className='stats-grid'>
                <div><h6>str: {Math.floor(props.stats.strength) || 0}</h6></div>
                <div><h6>dex: {Math.floor(props.stats.dexerity) || 0}</h6></div>
                <div><h6>int: {Math.floor(props.stats.intellect) || 0}</h6></div>
                <div><h6>chr: {Math.floor(props.stats.charisma) || 0}</h6></div>
                <div><h6>con: {Math.floor(props.stats.constitution) || 0}</h6></div>
                <div><h6>wis: {Math.floor(props.stats.wisdom) || 0}</h6></div>
            </div>
        </div>

    )
}