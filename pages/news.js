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


export default function News(){
    return(
        <div>
            <NavBar/>
            <h1>This will be where news goes</h1>
        </div>
    )
}