"use client";
import Image from 'next/image'
import styles from './page.module.css'
import {db} from './firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, updateDoc  } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function Home() {
  const [streak, setStreak] = useState({}) 



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

    // if (docSnap.exists()) {
    //   console.log("Document data:", docData);

    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    }fetchData()
  },[]);


  //==============================================================================//

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
        streak: docData.streak-1
      });
      setStreak({
        current_day: today.toLocaleDateString("en-US"),
        is_completed: false,
        name: docData.name,
        start_date: docData.start_date,
        last_completed_day: yesterday.toLocaleDateString("en-US"),
        streak : docData.streak-1
      });
      
    }
    else if(docData.is_completed==false){
      await updateDoc(docRef, {
        is_completed: true,
        last_completed_day:today,
        streak: docData.streak +1
      });
      setStreak({
        current_day: today.toLocaleDateString("en-US"),
        is_completed: true,
        name: docData.name,
        start_date: docData.start_date,
        last_completed_day: today.toLocaleDateString("en-US"),
        streak : docData.streak+1
      });

    }
    
    
    
    
  }


  return (
    <main className={styles.main}>
      <div>
        <h1>{streak.name}</h1>
        <h1>Streak: {streak.streak}</h1>
        <h3>Is Completed: {streak.is_completed ?(<p>{`${streak.is_completed}`}</p>):(<p>{`${streak.is_completed}`}</p>)}</h3>

        <h3>{streak.start_date ? (
      <p>Start Date: {streak.start_date.toDate().toLocaleDateString("en-US")}</p>
    ) : (
      <p>Loading...</p>
    )}</h3>

    <h3>Today: {String(streak.current_day)}</h3>
    <h3>Last Completed: {String(streak.last_completed_day)}</h3>
    
    <button onClick={completeStreak}>Yes!</button>
      </div>

        
      
    </main>
  )
}
