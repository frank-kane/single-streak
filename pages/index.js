'use client';
import React, {useState} from 'react';
import {  getAuth,signInWithEmailAndPassword,setPersistence,browserSessionPersistence, browserLocalPersistence   } from 'firebase/auth';
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

export default function Home(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
   
  const router = useRouter();

  const handleLogin = async () => {
    
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
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

const handleSignUp = async () => {
    
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence)
  signUpWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      router.push({
          pathname: '/user-page',
          query: { email: email },
        })
      // ...
  }).finally(() => {
      console.log("Hello")
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

