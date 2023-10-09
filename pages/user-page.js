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
import Footer from "../components/footer"


export default function UserPage() {
  const router = useRouter();
  // const { user } = router.query;

    const [signedInUser, setSignedInUser] = useState() 
    const [isHovering, setIsHovering] = useState(false);
    const [page, setPage]= useState(0);
    const[characterAnimation, setCharacterAnimation] = useState(`male-character-idle.gif`);
    const auth = getAuth();

    // const user_info =
    //         <div>
    //           <h1>{signedInUser.user_info.gender}</h1>
    //           <h1>{signedInUser.user_info.weight}</h1>
    //           <h1>{signedInUser.user_info.height}</h1>
    //           <h1>{signedInUser.user_info.bfp}</h1>
    //         </div>
        
        
      
      
      
    
    

    

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
      <NavBar/>

      {signedInUser ? (
      <div>
      <h1>{signedInUser.login.username}</h1>
      {/* <div>{user_info}</div> */}
      </div>
      ) : (
        <p>User not signed in.</p>
      )}


  

      

    </main>
  )
}
