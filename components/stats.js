import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import React, { useState } from 'react';

export default function Stats(props) {


    return (
        <div className='main-stats'>
            <h3>Stats</h3>
            <div className='stats-grid'>
                <div><img src='strength-icon.png' className='stat-image'></img><h6 className='stat-num'>{Math.floor(props.stats.strength) || 0}</h6></div>
                <div><img src='dexterity-icon.png' className='stat-image'></img><h6 className='stat-num'>{Math.floor(props.stats.dexerity) || 0}</h6></div>
                <div><img src='intelligence-icon.png' className='stat-image'></img><h6 className='stat-num'>{Math.floor(props.stats.intellect) || 0}</h6></div>
                <div><img src='charisma-icon.png' className='stat-image'></img><h6 className='stat-num'>{Math.floor(props.stats.charisma) || 0}</h6></div>
                <div><img src='constitute-icon.png' className='stat-image'></img><h6 className='stat-num'>{Math.floor(props.stats.constitution) || 0}</h6></div>
                <div><img src='wisdom-icon.png' className='stat-image'></img><h6 className='stat-num'>{Math.floor(props.stats.wisdom) || 0}</h6></div>
            </div>
        </div>

    )
}