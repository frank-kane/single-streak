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



export default function FirebaseFunctions(){

    const [user, setUser] = useState({});
    const collectionRef = collection(db, 'my-info');

    



  



    





  



      



  return (
    <div className='index-container'>
    
  </div>
    
  );

}
