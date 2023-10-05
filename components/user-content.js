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


export default function UserContent(props){

  const [addedHabit, setAddedHabit] = useState({})
  const [show, setShow] = useState(false)



    const handleAddHabit = async(e)=>{
        e.preventDefault()
        
        const docRef = doc(db, "my-info", props.docID);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data()
        console.log("Added Habit: " + String(addedHabit))
      
        await updateDoc(docRef, {
          habits: arrayUnion(addedHabit)
        });
        // props.returnEmail(props.my_email)
        // window.location.reload(false);
        setShow(false)
        window.location.reload();
        
      }

    return(
        <div className='user-content'>
          {show &&
           <div className="modal-overlay">    
          <div className='modal'>
              <div className='content'>
                  <form onSubmit={handleAddHabit}>
                    <label>Enter Title: </label>
                    <input type="text"
                    onChange={e => setAddedHabit(
                      {
                        name: e.target.value,
                        is_completed: false,
                        streak: 0,
                        last_completed_day: "",
                        start_date: new Date().toLocaleDateString("en-US")
                        })}/>
                    <input type="submit" />
                  </form>
              </div>
              <div>
                  <button onClick=
                      {() => setShow(false)}>
                          Close
                  </button>
              </div>
              </div>
          </div>
            
                      }

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
            <img src="add-button.png" alt="" className='add-btn' onClick={()=>setShow(true)} />
          </div>

          
           
            
            
        
        </div>
        
    )
}