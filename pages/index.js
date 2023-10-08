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

export default function Home(){

  const [user, setUser] = useState({});
  const collectionRef = collection(db, 'my-info');
  const router = useRouter();


  useEffect(()  =>{
    const fetchData = async()=>{
      const query = query(collectionRef, where("user_info.email", "==", "frankmyster@gmail.com"));
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      docID = String(doc.id);
      
      setUser({
        docID: String(doc.id),
      })
      
      
    });
      const docRef = doc(db, "my-info", user.docID);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data()
      setUser({
        login:{
          email:docData.email,
          username:docData.username,
          password:docData.password,
      },
      user_info:{
        gender:docData.gender,
        bfp:docData.bfp,
        height:docData.height,
        weight:docData.weight,


      },
      stats:{
          lvl:docData.lvl,
          exp:docData.exp,
          vig:docData.vig,
          str:docData.str,
          int:docData.int,
          dex:docData.dex,
          luck:docData.luck,
          scale_factor:docData.scale_factor,
  
      },
      
      habits:docData.habits,
  
      
      
      })
  
    console.log("Signed In User: "+user)
    localStorage.setItem('user', user);
    }

    fetchData();
    

  },[]);
  
//=======================Get Doc Information==========================================//
    
    


    


//===================sign up=============================//


  



      



  return (
    <div className='index-container'>
      <NavBar/>
      <center>
        
      </center>
    </div>
    
  );

}
