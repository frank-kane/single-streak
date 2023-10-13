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

// import { completeStreak } from './firebase-functions';


export default function Habits(props){
  const [habits, setHabits] = useState(false);
  const [isHovering, setIsHovering] = useState(false);


  // useEffect(() => {
  //   // Retrieve user data from localStorage
  //   const userData = localStorage.getItem('user');
  
  //   if (userData) {
  //     // Parse the stored JSON data back into an object
  //     const parsedUserData = JSON.parse(userData);
      
  //     // Set the user state with the retrieved data
  //     // setUser(parsedUserData);
  //   }
  // }, [habits]);

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

  const completeStreak = async(index)=>{
    const userData = localStorage.getItem('user');
    var parsedUserData = {};
    if (userData) {
      // Parse the stored JSON data back into an object
      parsedUserData = JSON.parse(userData);
    }
    console.log("index: " + index);
    console.log("=>" + JSON.stringify(parsedUserData));
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    const docRef = doc(db, "my-info", String(parsedUserData.docID));
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    console.log(docData);
    const habitsArray = docData.habits
    console.log("Habits array: "+habitsArray);
    
    //changiing from true to false
    if (habitsArray[index].is_completed == true){
    console.log("Habit completed: "+habitsArray[index].is_completed)
    habitsArray[index].is_completed = false;
    habitsArray[index].last_completed_day = new Date(yesterday).toLocaleDateString("en-US");
    habitsArray[index].streak = habitsArray[index].streak-1
    console.log("Last COmpleted Type: "+typeof(habitsArray[index].last_completed_day));
    //Update the database
    await updateDoc(docRef, {
        habits: habitsArray,
        'stats.exp':docData.stats.exp -10
    });

    //set habits
    setHabits(habitsArray)
    parsedUserData.habits = habits
    localStorage.setItem('user', JSON.stringify(parsedUserData));
  
    }

    //changiing from false to true
    else if(habitsArray[index].is_completed==false){
    console.log("Habit completed: "+habitsArray[index].is_completed)
    habitsArray[index].is_completed = true;
    habitsArray[index].last_completed_day = new Date(today).toLocaleDateString("en-US");
    habitsArray[index].streak = habitsArray[index].streak+1
    console.log(habitsArray);
    // await docRef.update({ habits: habitsArray});
    await updateDoc(docRef, {
        habits: habitsArray,
        'stats.exp':docData.stats.exp +10
    });
    setHabits(habitsArray)
    parsedUserData.habits = habits
    localStorage.setItem('user', JSON.stringify(parsedUserData));
    


    

    }
    else{
    console.log("Error updating habit")
    }


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