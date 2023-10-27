import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import ProgressBar from 'react-bootstrap/ProgressBar';



export default function FitnessInfo(props) {
  

    return (
        <div className='fitness-container'>
        <div>
          <h4>Fitness</h4>
          <h6>{props.userInfo.bfp || ""}</h6>
          <h5>{props.userInfo.weight || 0}</h5>
          <h5>{props.userInfo.height || 0}</h5>

          
         
          </div>
        

        </div>

    )
}