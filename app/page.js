"use client";
import Image from 'next/image'
import styles from './page.css'
import {db} from './firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, updateDoc  } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import useSound from 'use-sound';
//import boopSfx from "../public/completed.wav";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MyTabs from "./tabs"

export default function Home() {
    const [streak, setStreak] = useState({}) 
    const [stats, setStats] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [isHovering, setIsHovering] = useState(false);

    const[characterAnimation, setCharacterAnimation] = useState('character-idle.gif');

    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
      const playAudio = () => {
        if (streak.is_completed ==false){
          const audio = new Audio('/completed.wav');
          audio.play();

        }else{
          const audio = new Audio('/failure.wav');
          audio.play();

        }
        
      };

      


  useEffect(()  =>{
    const today = new Date().toLocaleDateString("en-US");
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    yesterday = yesterday.toLocaleDateString("en-US")
    
    async function fetchData() {
    const docRef = doc(db, "my-info", "1R01JaSkN66l356PKmnM");
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    const startDate = docData.start_date.toDate();
    const lastCompletedDay = docData.last_completed_day.toDate().toLocaleDateString("en-US");

    await updateDoc(docRef, {
      current_day: new Date()
    });
    setStats({
        lvl: docData.stats.lvl,
        exp:docData.stats.exp,
        str:docData.stats.str,
        int:docData.stats.int,
        dex:docData.stats.dex
    })


    setUserInfo({
      bfp: docData.user_info.bfp,
      height: docData.user_info.height,
      weight:docData.user_info.weight
  })

    
    
    console.log("Todays Date: "+today)
    console.log("Yesterdays Date: "+yesterday)
    console.log("Start: "+startDate)
    console.log("Last Completed: "+lastCompletedDay)
    
    console.log("streak: "+streak)
    console.log("last COmpleted Day: "+lastCompletedDay)

    
    

    //streak was true for 
    if(lastCompletedDay == today){
      console.log('Outline 1')
      setStreak({
        current_day: today,
        is_completed: true,
        name: docData.name,
        start_date: docData.start_date,
        last_completed_day: lastCompletedDay,
        streak : docData.streak
      });

    }
    else if(lastCompletedDay == yesterday){
      console.log('Outline 2')
      setStreak({
        current_day: today,
        is_completed: false,
        name: docData.name,
        start_date: docData.start_date,
        last_completed_day: lastCompletedDay,
        streak : docData.streak
      });

    }else{
      console.log('Outline 3')
      setStreak({
        current_day: today,
        is_completed: false,
        name: docData.name,
        start_date: docData.start_date,
        last_completed_day: lastCompletedDay,
        streak : 0
      });

    }
    }
    fetchData()
  },[]);


  //============================functions============================================//
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleNameChange = async(e)=>{
    e.preventDefault()
    
    const docRef = doc(db, "my-info", "1R01JaSkN66l356PKmnM");
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
  
    await updateDoc(docRef, {
      name: String(streak.name)
    });
    
  }

  

  async function performCharacterAnimation(){
    if(streak.is_completed==false){
      setCharacterAnimation('character-success.gif');
      await delay(2000);
      

    }else{
      setCharacterAnimation('character-failure.gif');
      await delay(500);
      
    }
    setCharacterAnimation('character-idle.gif');
  }

  async function completeStreak(){
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    const docRef = doc(db, "my-info", "1R01JaSkN66l356PKmnM");
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()

    if (docData.is_completed == true){
      await updateDoc(docRef, {
        is_completed: false,
        last_completed_day: yesterday,
        streak: docData.streak-1,
        'stats.exp':docData.stats.exp -10
      });
      setStreak({
        current_day: today.toLocaleDateString("en-US"),
        is_completed: false,
        name: docData.name,
        start_date: docData.start_date,
        last_completed_day: yesterday.toLocaleDateString("en-US"),
        streak : docData.streak-1
      });

      setStats({
        exp: docData.stats.exp -10
      })
      
    }
    else if(docData.is_completed==false){
      await updateDoc(docRef, {
        is_completed: true,
        last_completed_day:today,
        streak: docData.streak +1,
        'stats.exp':docData.stats.exp +10
      });
      setStreak({
        current_day: today.toLocaleDateString("en-US"),
        is_completed: true,
        name: docData.name,
        start_date: docData.start_date,
        last_completed_day: today.toLocaleDateString("en-US"),
        streak : docData.streak+1
      });

      setStats({
        exp: docData.stats.exp +10
      })

    }
    
    
    
    performCharacterAnimation();
    playAudio();
    
  }


  return (
    <main >
      <div>

      
        <div className='stats'>
        <h3>lvl: {stats.lvl}</h3>
        <h3 className='exp'>exp: {stats.exp} {isHovering &&(<p className='potentials'>{streak.is_completed == true ?(<p className='potentials-bad'>-10</p>):(<p className='potentials-good'>+10</p>)}</p>)}</h3>
        
        </div>
        <Popup trigger=
                {<button> Edit Habit </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                <form onSubmit={handleNameChange}>
                                  <label>Enter Title: </label>
                                  <input type="text" value={streak.name}
                                  onChange={e => setStreak({...streak,name: e.target.value})}
                                  
                                  
                                  />
                                  <input type="submit" />
                                </form>
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        
        {/* //=========================Habit Card===================// */}
      <div className='habits-holder'>
        <center>
          <div className='card' onClick={completeStreak} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>{streak.name}</h3>
            <h3><img src='fastforward.png' className='fastforward'/> {streak.streak}</h3>
            <div className='imageholder'>{streak.is_completed == false ?(<img src='x.png' className='myimg'></img>):(<img src='fire.gif' className='myimg'></img>)}</div>
            <h6>{streak.start_date ? (
            <p>Start Date: {streak.start_date.toDate().toLocaleDateString("en-US")}</p>
              ) : (
            <p>Loading...</p>
            )}</h6>
            <h6>Last Completed: {String(streak.last_completed_day)}</h6>
          </div>
          
        </center>
      

      </div>
     <div className='character-holder'>
           
          <img className='character' src={characterAnimation} alt="" />
          {/* <img className='floor-shadow' src="floor-shadow.png" alt="" /> */}
          
      </div>
      <MyTabs
        height={userInfo.height}
        bfp={userInfo.bfp*100}
        weight={userInfo.weight}
        str={stats.str}
        int={stats.int}
        dex={stats.dex}
      />
      
      </div>  
      
    </main>
  )
}
