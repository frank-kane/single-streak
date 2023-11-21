'use client';;
import React, { useState } from 'react';
import 'firebase/auth';
import 'react-tabs/style/react-tabs.css';
import { db,auth } from '../components/firebase-config'
import { doc, getDoc, updateDoc, collection, addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import animeData from '@/components/anime-list.json';
import NavBar from '@/components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyTabs from '@/components/tabs';
import Stats from '@/components/stats';
import Habits from '@/components/habits';
import MyAnime from '@/components/my-anime';
import SiteAnime from '@/components/site-anime';
import UserInfo from '@/components/user-info';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { Elsie_Swash_Caps } from 'next/font/google';
import { Link, useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';
import FitnessInfo from '@/components/fitness-info';

import Footer from '@/components/footer';

export default function Home() {
  // const auth = getAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  // const history = useHistory();
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Your login logic here
    
      // After successful login, navigate to '/user-page'
      // history.push('/user-page');
      router.push('/user-page');
    } catch (error) {
      alert("Error logging in: " + error);
    }
  };
  // const handleRegister = async(e) => {
  //   e.preventDefault();
  //   // You can add your login logic here, e.g., send a request to your authentication API
  //   try {
  //     const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  //     const user = userCredential.user;
  //     // Additional Firestore data can be added here if needed.
  //   } catch (error) {
  //     console.error("Error registering user: ", error);
  //   }
  //   console.log('Form submitted with data:', formData);
  // };

  // const saveUserDataToFirestore = async (uid, userData) => {
  //   const db = firebase.firestore();
  //   const userRef = db.collection("users").doc(uid);
  
  //   try {
  //     await userRef.set(userData);
  //   } catch (error) {
  //     console.error("Error saving user data: ", error);
  //   }
  // }

  return (
    <div className='login-page-container'>
      <NavBar />
      <div className='login-content-holder'>
      <form onSubmit={handleLogin} className='login-form'>
      <h2>Login</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>

      {/* <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password Again</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password2}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form> */}
      <Footer />
    </div>
  );
}
