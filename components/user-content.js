// import styles from '../styles/user-content.css'
import {db} from './firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, updateDoc  } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import useSound from 'use-sound';
//import boopSfx from "../public/completed.wav";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default function UserContent(props){



    const handleNameChange = async(e)=>{
        e.preventDefault()
        
        const docRef = doc(db, "my-info", "k6r7dDqNYDPPahiuz945");
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data()
      
        await updateDoc(docRef, {
          name: String(props.name)
        });
        
      }

    return(
        <div className='user-content'>


          <div className='user-left-side'>
            <img src="anime-loading-circle.gif" alt="" className='user-icon' />

            <div className='user-info'>
              <h3 className='user-name-text'>{props.user_name}</h3>
              <h3 className='lvl'>lvl: {props.lvl}</h3>
              <h3 className='exp'>exp: {props.exp} {props.isHovering &&
              (<p className='potentials'>{props.is_completed == true ?
              (<p className='potentials-bad'>-10</p>):(<p className='potentials-good'>+10</p>)}</p>)}</h3>
            </div>
          </div>


          <div className='habits-holder'>
            {props.habits}
          </div>
           
            
            
        
        </div>
        
    )
}