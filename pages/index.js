'use client';
import React, {useState} from 'react';
import { useEffect } from 'react'
import {  getAuth,signInWithEmailAndPassword,setPersistence,browserSessionPersistence, browserLocalPersistence,createUserWithEmailAndPassword,onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../components/firebase-config';
import { NavLink, Router, useNavigate } from 'react-router-dom'
import Link from 'next/link'
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import NavBar from "../components/navbar"
import {db} from '../components/firebase-config'
import { Timestamp, doc, getDoc, getDocs,updateDoc, collection,query,where,addDoc,deleteDoc } from "firebase/firestore";
import { arrayUnion, arrayRemove  } from "firebase/firestore";
// import UserContent from "../components/user-content"
// import MyTabs from "../components/tabs"
// import Habits from "../components/habits"
import { onSnapshot } from "firebase/firestore";
// import '../styles/index.css'
// import styles from '../styles/index.module.css'; 






export default function Home(){
  const [stats, setStats] = useState({});
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitData, setNewHabitData] = useState({
    name: '',
    type: '',
  });
  const usersCollection = collection(db, 'users'); // Reference to the "users" collection
  const userDocRef = doc(usersCollection, '8yciXAQXy9GTxmuclEX6'); // Reference to the specific user document

  // Then, if you want to access a subcollection within the user document (e.g., "habits"):
  const habitsRef = collection(userDocRef, 'habits');
  const today = new Date(); // Current date and time
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const openOrCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //this is actually cooler than it looks because it changes the value based on the key which is dynamic
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabitData({
      ...newHabitData,
      [name]: value,
    });
  };

  

  React.useEffect(() => {
    const unsubscribe = onSnapshot(habitsRef, function(snapshot) {
        // Sync up our local notes array with the snapshot data
        const habitsArr = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setHabits(habitsArr)
    })
    return unsubscribe
}, []);

React.useEffect(() => {
  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      // Assuming you have a 'stats' field in your user document
      const userStats = userData.stats;
      setStats(userStats);
      console.log(stats)
    }
  });

  // Fetch habits data using a similar onSnapshot block as you did for habits

  return () => {
    // Unsubscribe from both snapshots when the component unmounts
    unsubscribe();
    // Unsubscribe from the habits snapshot as well (you can include your existing habits-related code here)
  };
}, []); // Add userDocRef as a dependency to trigger the effect

// ... (other code, including your habits-related code)


async function createNewHabit() {
  // const newHabit = {
  //     name: "Your Habit",
  //     is_completed: false,
  //     last_completed: "",
  //     streak: 0,
  //     type: "physical"
  // }
  // const newHabitRef = await addDoc(habitsRef, newHabit)

  const newHabit = { ...newHabitData, is_completed: false, last_completed: '', streak: 0 };
  await addDoc(habitsRef, newHabit);

  // Close the modal
  openOrCloseModal();
 
}

async function deleteHabit(noteId) {
  const habitsRef = collection(userDocRef, 'habits');
  const docRef = doc(habitsRef, noteId)
  await deleteDoc(docRef)
}

async function completeHabit(noteId) {
  const userDocRef = doc(usersCollection, '8yciXAQXy9GTxmuclEX6');
  const habitsRef = collection(userDocRef, 'habits');
  
  const docRef = doc(habitsRef, noteId)
  const docSnapshot = await getDoc(docRef);
  const userSnapshot = await getDoc(userDocRef);
  
  const currentData = docSnapshot.data();
  const userCurrentData = userSnapshot.data();
  const updatedIsCompleted = !currentData.is_completed; // Toggle the value
  const streak = currentData.is_completed ? -1 : 1;
  const statIncrease = currentData.is_completed ? -3 : 3;
  const expIncrease = currentData.is_completed ? -10 : 10;
  const dateChange = currentData.is_completed ?yesterday : today;

    // Update the is_completed field with the new value
    await updateDoc(docRef, {
      is_completed: updatedIsCompleted,
      streak: currentData.streak+streak,
      last_completed: dateChange
    });

    await updateDoc(userDocRef, {
      'stats.current_exp': userCurrentData.stats.current_exp+expIncrease
    });

    if(currentData.type == "physical"){
      await updateDoc(userDocRef, {
        'stats.current_exp': userCurrentData.stats.current_exp+expIncrease,
        'stats.strength':userCurrentData.stats.strength+statIncrease
      });
    }else if(currentData.type == "intellect"){
      await updateDoc(userDocRef, {
        'stats.current_exp': userCurrentData.stats.current_exp+expIncrease,
        'stats.intellect':userCurrentData.stats.intellect+statIncrease
      });

    }else if(currentData.type == "dexerity"){
      await updateDoc(userDocRef, {
        'stats.current_exp': userCurrentData.stats.current_exp+expIncrease,
        'stats.intellect':userCurrentData.stats.dexerity+statIncrease
      });

    }
}

 

return (
  <div className='index-container'>
    <h1>User</h1>
    {stats && (
      <div>
        <h6>Lvl: {stats.level||0}</h6>
        <h6>exp: {stats.current_exp||0}/{stats.next_exp}</h6>
        <h6>str: {stats.strength||0}</h6>
        <h6>dex: {stats.dexerity||0}</h6>
        <h6>int: {stats.intellect||0}</h6>
      </div>
    )}

    <h1>Habits</h1>
    {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h2>Add a New Habit</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Habit name"
          value={newHabitData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Habit type"
          value={newHabitData.type}
          onChange={handleInputChange}
        />
      </form>
      <button onClick={createNewHabit}>Add Habit</button>
      <button onClick={openOrCloseModal}>Cancel</button>
    </div>
  </div>
)}
    <div >
        {habits.length > 0 ? habits.map((habit) => (
          <ul>
          <li key={habit.id}>
            {habit.name}
            {" "}
            {habit.streak}
          </li>
          <li >
          {habit.is_completed == false && habit.last_completed <= yesterday?<img onClick={() => completeHabit(habit.id)} className='icon' src="frozen-flame.png" alt="" />:<img onClick={() => completeHabit(habit.id)} className='icon' src="fire.gif" alt="" />}
          
        </li>
        <li >
        <button onClick={() => deleteHabit(habit.id)}>Delete</button>
      </li>
      </ul>
        )) : <h1>No Habits</h1>}
    </div>
    <button onClick={openOrCloseModal}>Add New Habit</button>
  </div>
);



        
}
