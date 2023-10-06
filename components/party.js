// import styles from '../styles/user-content.css'
import {db} from './firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, updateDoc,arrayUnion, arrayRemove  } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import useSound from 'use-sound';
//import boopSfx from "../public/completed.wav";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default function Party(props){

  const [partyMembers, setPartyMembers] = useState()
  const [show, setShow] = useState(false)



    

    return(
        <div className='user-content'>
          
            <div>
                

            </div>



        </div>
            
                      

        
          
          
           
            
            
 
        
    )
}