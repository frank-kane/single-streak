'use client';;
import React, { useState } from 'react';
import 'firebase/auth';
import 'react-tabs/style/react-tabs.css';
import { db,auth } from '../components/firebase-config'
import { doc, getDoc, updateDoc, collection, addDoc, deleteDoc, getDocs, query, where, setDoc } from "firebase/firestore";
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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Footer from '@/components/footer';

export default function Home() {
  // const auth = getAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2:'',
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
      const { email, password } = formData;

      // Use Firebase signInWithEmailAndPassword function
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the user's UID in the session (you might want to use a more secure session management approach)
      sessionStorage.setItem('userUID', user.uid);

      // After successful login, push to the user-page
      router.push('/user-page');
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  // ... (rest of the code)

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const { username, email, password, password2 } = formData;
  
      // Validate passwords
      if (password !== password2) {
        alert("Passwords do not match");
        return;
      }
  
      // Use Firebase createUserWithEmailAndPassword function
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store the user's UID in the session (you might want to use a more secure session management approach)
      sessionStorage.setItem('userUID', user.uid);
  
      // Create a user document in Firestore with UID, username, and email fields
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        username: username,
        email: email,
        bfp:0,
        health_subtracted: Date.now(),
        height:"5'0",
        money:0,
        profile_pic_url:"https://i.imgur.com/r9PHGBb.png",
        weight:100,
        stats:{
          strength:0,
          charisma:0,
          constitute:0,
          current_exp:0,
          current_health:25,
          dexerity:0,
          intellect:0,
          level:1,
          next_exp:100,
          prev_current_exp:0,
          prev_next_exp:100,
          scale_factor:1,
          total_health:25,
          wisdom:0


        }

      });
      const animeCollectionRef = collection(userDocRef, "anime");
      const habitsCollectionRef = collection(userDocRef, "habits");
      const itemsCollectionRef = collection(userDocRef, "items");
      const questsCollectionRef = collection(userDocRef, "quests");
      const weaponsCollectionRef = collection(userDocRef, "weapons");
      await addDoc(animeCollectionRef , {
        name: "Favorite Anime 1",
      });
      await addDoc(habitsCollectionRef , {
        name: "My First Habit",
        is_completed:false,
        last_completed:new Date(),
        streak:0,
        type: "strength"


      });
      await addDoc(itemsCollectionRef , {
        name: "small health potion",
        quantity:1,
        heal:3
      });
      await addDoc(questsCollectionRef , {
        title: "first quest",
        type: "strength",
        time_constraint: false,
        reward: "5 exp",
        required_num_of_habits:1,
        description: "Earn 5 exp by completing your first habit"

      });
      await addDoc(weaponsCollectionRef , {
        name: "cloud sword",
        quantity:1,
        description:"A sword wielded by a favorable warrior in a distant fantasy world. /nSpecial: Use this sword 3 times in a row for a 1.5x damage boost for one additional turn.",
        damage: 25
      });
  
      // After successful registration, push to the user-page
      router.push('/user-page');
    } catch (error) {
      alert("Error registering user: " + error.message);
    }
  };
  

  return (
    <div className='login-page-container'>
      <NavBar />
      <div className='login-content-holder'>
      <div className='login-form'>
      <Tabs>
        <TabList >
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanel>
        <form onSubmit={handleLogin} className='login-form'>
      <h2>Login</h2>
        {/* <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div> */}
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
          
        </TabPanel>

        <TabPanel>
        <form onSubmit={handleRegister} className='login-form'>
      <h2>Register</h2>
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
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Register</button>
      </form>
        
        </TabPanel>

      </Tabs>


    </div>
      
      </div>

      
      <Footer />
    </div>
  );
}
