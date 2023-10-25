import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import ProgressBar from 'react-bootstrap/ProgressBar';



export default function UserInfo(props) {
  

    return (
        <div className='user-info'>
        <div>
          {/* <h3>User</h3> */}
          <h6>{props.userInfo.username || ""}</h6>
          <h5>${props.userInfo.money || 0}</h5>
          <h5>Lvl: {props.stats.level || 0}</h5>
          <h5>exp: {props.stats.current_exp || 0}/{props.stats.next_exp}</h5>
          <h5>health: {props.stats.current_health || 0}/{props.stats.total_health}</h5>
          <ProgressBar now={(props.stats.current_health / props.stats.total_health) / 0.01} />
          </div>
        

        </div>

    )
}