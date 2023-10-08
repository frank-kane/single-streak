// import styles from './page.css'
import {db} from '../components/firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, getDocs,updateDoc, collection,query,where,arrayRemove  } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import useSound from 'use-sound';
//import boopSfx from "../public/completed.wav";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MyTabs from "../components/tabs"
import NavBar from "../components/navbar"
// import styles from'../styles/page.css';
import UserContent from "../components/user-content"
import User from '../components/user';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSpring, animated } from 'react-spring';


export default function UserPage() {
  const router = useRouter();
  // const { user } = router.query;

    const [signedInUser, setSignedInUser] = useState() 
    const [isHovering, setIsHovering] = useState(false);
    const[characterAnimation, setCharacterAnimation] = useState(`male-character-idle.gif`);
    const auth = getAuth();
    

    

  useEffect(()  =>{
    const userFromLocalStorage = localStorage.getItem("user");
    console.log("User From Local Storage: "+userFromLocalStorage)
    if (userFromLocalStorage) {
      // Parse the JSON string to get the user object
      const parsedUser = JSON.parse(userFromLocalStorage);

      // Set the user object in the component state
      setSignedInUser(parsedUser);
      
    }
    
    console.log("User From Local Storage: "+signedInUser)
    
    
  },[]);


  return (
    <main className='main'>

{signedInUser ? (
        <h1>{signedInUser.login.username}</h1>
      ) : (
        <p>User not signed in.</p>
      )}

    </main>
  )
}
