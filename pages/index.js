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
import NavBar from "../components/navbar"
import {db} from '../components/firebase-config'
import { Timestamp, doc, getDoc, getDocs,updateDoc, collection,query,where,addDoc  } from "firebase/firestore";
import UserContent from "../components/user-content"
import MyTabs from "../components/tabs"
import Habits from "../components/habits"



export default function Home(){

  const [user, setUser] = useState({});
  const collectionRef = collection(db, 'my-info');
  // const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      const q = query(collectionRef, where("login.email", "==", "frankmyster2@gmail.com"));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
  
        setUser((prevUser) => ({
          ...prevUser,
          docID: String(doc.id),
          login: {
            email: docData.login.email,
            username: docData.login.username,
            password: docData.login.password,
          },
          user_info: {
            gender: docData.user_info.gender,
            bfp: docData.user_info.bfp,
            height: docData.user_info.height,
            weight: docData.user_info.weight,
          },
          stats: {
            lvl: docData.stats.lvl,
            exp: docData.stats.exp,
            str: docData.stats.str,
            int: docData.stats.int,
            dex: docData.stats.dex,
          },
          habits: docData.habits,
        }));
      });
  
      console.log("Signed In User: ", JSON.stringify(user)); // This might not log as expected due to asynchronous behavior
      localStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON before saving to localStorage
    };
  
    fetchData();
  }, []);
  
//=======================Get Doc Information==========================================//
useEffect(() => {
  // Check if user has data to store
  if (Object.keys(user).length > 0) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}, [user]);

useEffect(() => {
  // Retrieve user data from localStorage
  const userData = localStorage.getItem('user');

  if (userData) {
    // Parse the stored JSON data back into an object
    const parsedUserData = JSON.parse(userData);
    
    // Set the user state with the retrieved data
    setUser(parsedUserData);
  }
}, []);
    


    


//===================sign up=============================//


  



      



  return (
    <div className='index-container'>
    <NavBar />
      {user && Object.keys(user).length > 0 ? (
        <div>
        <UserContent
        username = {user.login.username}
        lvl = {user.stats.lvl}
        exp = {user.stats.exp}
        habits = {user.habits}
        />
        
        <MyTabs/>

        </div>
      ) : (
        <p>No user data found in localStorage.</p>
      )}
  </div>
    
  );

}
