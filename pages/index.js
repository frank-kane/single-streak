'use client';
import React, {useState} from 'react';
import {  getAuth,signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../components/firebase-config';
import { NavLink, Router, useNavigate } from 'react-router-dom'
import Link from 'next/link'
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';

export default function Home(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
   
  const router = useRouter();

  const handleLogin = async () => {
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

