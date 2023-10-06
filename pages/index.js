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

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const [signUpPage,setSignUpPage] = useState(0)
  const [signedInUser, setSignedInUser] = useState({})
  const [bfp, setBFP] = useState()
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [gender, setGender] = useState()
  const collectionRef = collection(db, 'my-info');
  const router = useRouter();


  useEffect(()  =>{
    const auth = getAuth();
    

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can fetch the user's data here
        // router.push({
        //   pathname: '/user-page',
        //   query: { email: email },
        // })
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
        
        // ...
    })

    const q = query(collection(db, "my-info"), where("user_info.email", "==", email));
    var docID ="";

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      docID = String(doc.id);
      
      
    });
    const docRef = doc(db, "my-info", docID);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    // setSignedInUser(docData)
    console.log("Signed In User: "+docData.user_info.gender)
    


    router.push({
      pathname: '/user-page',
      query: { gender: docData.user_info.gender },
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
      bfp: bfp,
      email: email,
      height: height,
      password: password,
      user_name: username,
      weight: weight,
      gender: gender
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

  const handlePageChange = (page, info) => {

    if(page == 1){
      setSignUpPage(1)
    }else if(page==2){
        setGender(info)
        setSignUpPage(2)
    }
    


  }



      



  return (
    <div className='index-container'>
      <NavBar/>
      <center>
        {signUpPage == 0 &&
        <div className='login-container'>
        <Tabs>
                <TabList id='tabs-holder'>
                    <Tab >Login</Tab>
                    <Tab >Signup</Tab>
                </TabList>
                <TabPanel>
                  <div className='login-box'>
                    <input type="email" id="email" name="email" autoComplete="on" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                    
                  </div>
                  

                </TabPanel>
                <TabPanel>
                  <div className='signup-box'>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className='login-btn' onClick={()=>handlePageChange(1,"null")}>Sign Up</button>
                  </div>
                

                </TabPanel>
        </Tabs>
                  <img className='login-image' src="user-account-icon.png" />
                  <img className='login-image' src="ig-logo.png" />
                  <img className='login-image' src="fb-logo.png" />
        </div> 
        
        }

        {signUpPage == 1 &&
          <div className='login-container'>
            <div className='login-box'>
          <h1>Gender</h1>
          <button className='login-btn' onClick={()=>handlePageChange(2,"male")}>Male</button>
          <button className='login-btn' onClick={()=>handlePageChange(2,"female")}>Female</button>
          </div>
                  </div>}
        
        {signUpPage == 2 &&
          <div className='login-container'>
            <div className='login-box'>
          <h1>Fitness Info</h1>
          <input placeholder="Body Fat Percentage" onChange={(e) => setBFP(e.target.value)}/>
          <input placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
          <input placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
          <button className='login-btn' onClick={handleSignUp}>Finish</button>
          </div>
                  </div>}
         

      </center>
    </div>
    
  );
};

