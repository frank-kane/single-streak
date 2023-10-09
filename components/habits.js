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


export default function Habits(props){

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const playAudio = (onOrOff) => {
    if (onOrOff ==true){
      const audio = new Audio('/completed.wav');
      audio.play();

    }else{
      const audio = new Audio('/failure.wav');
      audio.play();

    }
    
  };

  const handleRemoveHabit = async(key)=>{
    console.log("KEY: "+String(key))
    const docRef = doc(db, "my-info", docID);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    const newArray = docData.habits;
    newArray.splice(key, 1); // Remove the item at the specified index
    setMyHabits(newArray)

    console.log("New Array: "+String(newArray))
    // const habitsArray = docData.habits
    await updateDoc(docRef, {
      habits: newArray
  });
  

  }


  const listHabits = props.habits.map((habit,key) =>
    <div className='card' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} key={key} >
            {isHovering &&<img src='red-x.png' className='red-x' onClick={()=>handleRemoveHabit(key)}/>}
            <div onClick={()=>completeStreak(key)} >
              <h3><img src='fastforward.png' className='fastforward'/> {habit.streak}</h3>
              
              
              <center>
              <div className='habit-image-holder'>{habit.is_completed == false ?(<img src='x.png' className='habit-image'></img>):(<img src='fire.gif' className='habit-image'></img>)}</div>
              </center>
              <h3>{habit.name}</h3>

            </div>
            
            

          </div>
  )

    return(
    
          <div className='habits-holder'>
            {listHabits}
          </div>

          
           
            
            
        
     
        
    )
}