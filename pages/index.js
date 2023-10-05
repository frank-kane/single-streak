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
import { doc, setDoc, addDoc,collection } from "firebase/firestore"; 

export default function Home(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const collectionRef = collection(db, 'my-info');
  const router = useRouter();


  useEffect(()  =>{
    const auth = getAuth();
    

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can fetch the user's data here
        router.push({
          pathname: '/user-page',
          query: { email: email },
        })
      } else {
        // No user is signed in, you can handle this case (e.g., redirect to login page)
        
      }
      return () => unsubscribe();
    });

  },[]);
  const handleLogin = async () => {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log("Logged in User: "+user);
        // localStorage.setItem("user", user);
        // console.log("Logged in User: "+String(user.email));
        router.push({
            pathname: '/user-page',
            query: { email: user.email },
          })
        // ...
    }).finally(() => {
        console.log("Hello")
    })
}

//===================sign up=============================//

const handleSignUp = async () => {
    
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Sign Up User: "+user)
      
      // ...
  }).finally(() => {
      console.log("Hello")
  })
  const data = {
    current_day: new Date(),
    habits: [],
    stats: {
      dex: 0,
      exp: 0,
      int: 0,
      lvl: 0,
      str: 0
    },
    user_info:{
      bfp: 0.0,
      email: email,
      height: "",
      password: password,
      user_name: username,
      weight: 0
    }
  }
  await addDoc(collectionRef, data)
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
  });

  router.push({
    pathname: '/user-page',
    query: { email: email },
  })


}


      



  return (
    <div className='index-container'>
      <NavBar/>
      <center>
        <div className='login-container'>
        <Tabs>
                <TabList id='tabs-holder'>
                    <Tab >Login</Tab>
                    <Tab >Signup</Tab>
                </TabList>
                <TabPanel>
                  <div className='login-box'>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                    
                  </div>
                  

                </TabPanel>
                <TabPanel>
                  <div className='signup-box'>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className='login-btn' onClick={handleSignUp}>Sign Up</button>
                  </div>
                

                </TabPanel>
        </Tabs>
                  <img className='login-image' src="user-account-icon.png" />
                  <img className='login-image' src="ig-logo.png" />
                  <img className='login-image' src="fb-logo.png" />
        </div>  

      </center>
    </div>
    
  );
};

