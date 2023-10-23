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
import axios from 'axios';
import cheerio from 'cheerio';
import AnimeList from './anime-list.json'; // Adjust the path to match your file structure
import AnimeList2 from './anime-list'
import animeData from './anime-list.json';
import NavBar from '@/components/navbar';


export default function Home(){
  const [myAnimeTitles, setMyAnimeTitles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [stats, setStats] = useState({});
  const [habits, setHabits] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitData, setNewHabitData] = useState({
    name: '',
    type: '',
  });
  const usersCollection = collection(db, 'users'); // Reference to the "users" collection
  const userDocRef = doc(usersCollection, '8yciXAQXy9GTxmuclEX6'); // Reference to the specific user document
  const habitsRef = collection(userDocRef, 'habits');
  const weaponsRef = collection(userDocRef, 'weapons');
  const itemsRef = collection(userDocRef, 'items');
  const myAnimeRef = collection(userDocRef, 'anime');
  const today = new Date(); // Current date and time
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);


  


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
    const unsubscribe = onSnapshot(myAnimeRef, function(snapshot) {
        // Sync up our local notes array with the snapshot data
        const animeArr = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setMyAnimeTitles(animeArr)
    })
    return unsubscribe
  }, []);


  React.useEffect(() => {
    const unsubscribe = onSnapshot(habitsRef, function (snapshot) {
      const habitsArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      
      const today = new Date(); // Current date
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
  
      // Iterate through habits and check if the habit should be reset
      const updatedHabits = habitsArr.map((habit) => {
        // Check if the habit was missed on the previous day (yesterday)
        const lastCompletedDate = habit.last_completed.toDate();
        lastCompletedDate.setHours(0, 0, 0, 0);
        console.log(lastCompletedDate)
  
        if (lastCompletedDate < yesterday) {
          // If it was completed and missed yesterday, reset the streak
          return {
            ...habit,
            is_completed: false,
            streak: 0,
          };
        }
        
        return habit; // No changes required
      });
  
      // Update habits in the database
      updatedHabits.forEach(async (updatedHabit) => {
        const habitDocRef = doc(habitsRef, updatedHabit.id);
        await updateDoc(habitDocRef, updatedHabit);
      });
  
      setHabits(updatedHabits);
    });
  
    return unsubscribe;
}, []);

React.useEffect(() => {
  const unsubscribe = onSnapshot(weaponsRef, function(snapshot) {
      // Sync up our local notes array with the snapshot data
      const weaponsArr = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }))
      setWeapons(weaponsArr)
  })
  return unsubscribe
}, []);

React.useEffect(() => {
  const unsubscribe = onSnapshot(itemsRef, function(snapshot) {
      // Sync up our local notes array with the snapshot data
      const itemsArr = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }))
      setItems(itemsArr)
  })
  return unsubscribe
}, []);



// React.useEffect(() => {
//   const unsubscribe = onSnapshot(animeCollection, function(snapshot) {
//       // Sync up our local notes array with the snapshot data
//       const animeArr = snapshot.docs.map(doc => ({
//           ...doc.data(),
//           id: doc.id
//       }))
//       setSiteAnime(animeArr)
//   })
//   return unsubscribe
// }, []);

React.useEffect(() => {
  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      // Assuming you have a 'stats' field in your user document
      const userStats = userData.stats;
      setUserInfo({
        username: userData.username,
        money: userData.money
      })
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

  const newHabit = { ...newHabitData, is_completed: false, last_completed: new Date(), streak: 0 };
  await addDoc(habitsRef, newHabit);

  // Close the modal
  openOrCloseModal();
 
}

async function deleteHabit(noteId) {
  const habitsRef = collection(userDocRef, 'habits');
  const docRef = doc(habitsRef, noteId)
  await deleteDoc(docRef)
}

async function addAnime(animeIndex) {
  const animeToAdd = animeData.titles[animeIndex]; // Get the anime object from animeData

  try {
    // Add the anime object to your myAnimeRef collection in Firebase
    await addDoc(myAnimeRef, animeToAdd);
    // You may want to show a success message or update your local state here.
  } catch (error) {
    console.error("Error adding anime:", error);
    // Handle the error (e.g., show an error message).
  }
}

async function deleteAnime(animeId) {
  
  const docRef = doc(myAnimeRef, animeId)
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
  const level = currentData.is_completed ? -1 : 1;
  const new_next_exp = currentData.is_completed ? -1 : 1;
  const statIncrease = currentData.is_completed ? -3 : 3;
  const expIncrease = currentData.is_completed ? -10 : 10;
  const dateChange = currentData.is_completed ?yesterday : today;

    // Update the is_completed field with the new value
    await updateDoc(docRef, {
      is_completed: updatedIsCompleted,
      streak: currentData.streak+streak,
      last_completed: dateChange
    });

    if(userCurrentData.stats.current_exp+expIncrease>=userCurrentData.stats.next_exp){
      await updateDoc(userDocRef, {
        'stats.level': userCurrentData.stats.level+level,
        'stats.current_exp': 0,
        'stats.prev_current_exp':userCurrentData.stats.current_exp,
        'stats.prev_next_exp':userCurrentData.stats.next_exp,
        'stats.next_exp': Math.floor(userCurrentData.stats.next_exp*(1.15))

      });
      
  }
    else if(currentData.is_completed == true && userCurrentData.stats.current_exp+expIncrease<0){
      await updateDoc(userDocRef, {
        'stats.level': userCurrentData.stats.level+level,
        'stats.current_exp': userCurrentData.stats.prev_next_exp+expIncrease,
        'stats.prev_current_exp':userCurrentData.stats.current_exp,
        'stats.next_exp': userCurrentData.stats.prev_next_exp,

      });
    
    }else{
      await updateDoc(userDocRef, {
        'stats.current_exp': userCurrentData.stats.current_exp+expIncrease,
        'stats.prev_current_exp':userCurrentData.stats.current_exp
      });

    }

    if(currentData.type == "physical"){
      await updateDoc(userDocRef, {
        'stats.strength':userCurrentData.stats.strength+statIncrease
      });
    }else if(currentData.type == "intellect"){
      await updateDoc(userDocRef, {
        'stats.intellect':userCurrentData.stats.intellect+statIncrease
      });

    }else if(currentData.type == "dexerity"){
      await updateDoc(userDocRef, {
        'stats.intellect':userCurrentData.stats.dexerity+statIncrease
      });
    
  }
}


 

return (
  <div className='index-container'>
    <NavBar/>

    <div className='upper-tab'>
    <div className='user-info'>
      <h1>User</h1>
      <h4>{userInfo.username||""}</h4>
      <h4>${userInfo.money||0}</h4>
      <h4>Lvl: {stats.level||0}</h4>
      <h4>exp: {stats.current_exp||0}/{stats.next_exp}</h4>
    </div>
    


    {stats && (
        <div className='main-stats'>
          <h1>Stats</h1>
          <div className='stats-grid'>
              <div><h2>str: {stats.strength||0}</h2></div>
              <div><h2>dex: {stats.dexerity||0}</h2></div>
              <div><h2>int: {stats.intellect||0}</h2></div>
              <div><h2>chr: {stats.charisma||0}</h2></div>
              <div><h2>con: {stats.constitution||0}</h2></div>
              <div><h2>wis: {stats.wisdom||0}</h2></div>
          </div>
        </div>
    )}
    <div className='habits-container'>
    <h1>Habits</h1>
        <div className='all-habits'>
        {habits.length > 0 ? habits.map((habit) => (
          
          <div key={habit.id} className='habit'>
            <div >
              <div>{habit.name}</div>
              <div>{habit.streak}</div>
              <div>{habit.is_completed == false && habit.last_completed <= yesterday?<img onClick={() => completeHabit(habit.id)} className='icon' src="frozen-flame.png" alt="" />:<img onClick={() => completeHabit(habit.id)} className='icon' src="fire.gif" alt="" />}</div>
              <div><button onClick={() => deleteHabit(habit.id)}>Delete</button></div>
            </div>
          </div>
          )) : <div>
          <h1>No Habits</h1>

        </div> 
        }
        {habits.length <7 &&<button className='add-habit' onClick={openOrCloseModal}>Add Habit</button>}
      </div>
      
    
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
      <button onClick={createNewHabit}>Create Habit</button>
      <button onClick={openOrCloseModal}>Cancel</button>
    </div>
  </div>
)}
      

        
    </div>
    </div>


    <div className='lower-tab'>
    
    <div className='items-container'> 
    <h1>Items</h1>
    <Tabs>
    <TabList>
      <Tab>Weapons</Tab>
      <Tab>Healing Items</Tab>
    </TabList>

    <TabPanel>
    <div className='all-weapons'>
        {weapons.length > 0 ? weapons.map((weapon) => (
          <div className='weapon' key={weapon.id}>
            <div>
              <img className='item' src={`${weapon.name}.png`}/>
            </div>
          <div key={weapon.id}>
            {weapon.name}
          </div>
          <div>Dmg:
            {weapon.damage}
          </div>
      </div>
        )) : <h1>No Weapons</h1>}
    </div>
    </TabPanel>

    <TabPanel>
    {items.length > 0 ? items.map((item) => (
          <div className='item-container' key={item.id}>
          <div>
            <div>
              <img className='item' src={`${item.name}.png`}/>
            </div>
          <div key={item.id}>
            {item.name}
          </div>
          <div>Heal:
            {item.heal}
          </div>
      </div>
      </div>
        )) : <h1>No Items</h1>}
    </TabPanel>
  </Tabs>
    

    </div>

    <div className='anime-container'>
    <h1>My Anime</h1>
    <div className='all-my-anime'>
        {myAnimeTitles.length > 0 ? myAnimeTitles.map((anime) => (
          
          <div key={anime.id} className='habit'>
            <div >
                <div key={anime.id}>{anime.name}</div>
                <img src={anime.img} key={anime.id} />
                <button onClick={()=>deleteAnime(anime.id)}>-</button>
            
            </div>
          </div>
          )) : <div>
          <h1>No Habits</h1>

        </div> 
        }
      </div>

    </div>

      <div className='anime-site-container'>
        <h1>Site Anime</h1>
        <div className='anime-list'>
      <div>
        {animeData.titles.map((anime, index) => (
            <div>
                <div key={index}>{anime.name}</div>
                <img src={anime.img} key={index} />
                <button onClick={()=>addAnime(index)}>+</button>

            </div>
          

        ))}
      </div>

      
    </div>
        
      </div>

    
      </div>
    

    

   
  </div>
);



        
}
