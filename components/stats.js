import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';

export default function Stats(props) {

    return (
        <div className='main-stats'>
            <h1>Stats</h1>
            <div className='stats-grid'>
                <div><h2>str: {props.stats.strength || 0}</h2></div>
                <div><h2>dex: {props.stats.dexerity || 0}</h2></div>
                <div><h2>int: {props.stats.intellect || 0}</h2></div>
                <div><h2>chr: {props.stats.charisma || 0}</h2></div>
                <div><h2>con: {props.stats.constitution || 0}</h2></div>
                <div><h2>wis: {props.stats.wisdom || 0}</h2></div>
            </div>
        </div>

    )
}