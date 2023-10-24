import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import ProgressBar from 'react-bootstrap/ProgressBar';



export default function UserInfo(props) {

    return (
        <div className='user-info'>
          <h1>User</h1>
          <h4>{props.userInfo.username || ""}</h4>
          <h4>${props.userInfo.money || 0}</h4>
          <h4>Lvl: {props.stats.level || 0}</h4>
          <h4>exp: {props.stats.current_exp || 0}/{props.stats.next_exp}</h4>
          <h4>health: {props.stats.current_health || 0}/{props.stats.total_health}</h4>
          <ProgressBar now={(props.stats.current_health / props.stats.total_health) / 0.01} />

        </div>

    )
}