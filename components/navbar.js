// import Image from 'next/image'
import {db} from './firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, updateDoc  } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import useSound from 'use-sound';
//import boopSfx from "../public/completed.wav";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useRouter } from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getAuth, signOut } from "firebase/auth";



export default function NavBar(props){

  const [showUserInfo, setShowUserInfo] = useState(false)

  const router = useRouter();

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push({
        pathname: '/',
      })
      // Sign-out successful.
    }).catch((error) => {
      console.error("Error during logout:", error);
      // An error happened.
    });


    

  }

  

    return(
        <div className='nav-bar'>
          <img src="favicon.ico" alt="" className='website-icon'  onClick={()=>router.push({
            pathname: '/',
          })}/>
          {/* <img src="my-anime-life.png" alt="" className='logo'  /> */}
          <h3 onClick={()=>router.push({
            pathname: '/news',
          })}>News</h3>
          <h3>Party</h3>
          <h3>About</h3>  
          <h3>Help</h3>
          
          <img src="user-account-icon.png" alt="" className='user-account-icon' onClick={()=> setShowUserInfo(true)} />
          {showUserInfo &&
          <div className='user-info-modal-overlay'>
          <div className='user-info'>
            <button onClick={handleLogOut}>Log Out</button>
            <button onClick={()=>setShowUserInfo(false)}>Cancel</button>
          </div>
          </div>
          }

        </div>
        
    )
}