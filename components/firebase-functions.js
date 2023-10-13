'use client';
import React, {useState} from 'react';
import { useEffect } from 'react'
import {  getAuth,signInWithEmailAndPassword,setPersistence,browserSessionPersistence, browserLocalPersistence,createUserWithEmailAndPassword,onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../components/firebase-config';
import firebase from 'firebase/app';
import 'firebase/auth';

import {db} from '../components/firebase-config'
import { Timestamp, doc, getDoc, getDocs,updateDoc, collection,query,where,addDoc  } from "firebase/firestore";


const collectionRef = collection(db, 'my-info');
const userData = localStorage.getItem('user');

export async function handleRemoveHabit(key){
    console.log("KEY: "+String(key))
    const docRef = doc(db, "my-info", userData.docID);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    const newArray = docData.habits;
    newArray.splice(key, 1); // Remove the item at the specified index
    setMyHabits(newArray)

    console.log("New Array: "+String(newArray))
    // const habitsArray = docData.habits
    await updateDoc(docRef, {
        habits: newArray
    });
    

    }


export async function completeStreak(index){
    console.log("index: " + index);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    const docRef = doc(db, "my-info", String(userData.docID));
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    console.log(docData);
    const habitsArray = docData.habits
    console.log(habitsArray);
    

    if (habitsArray[index].is_completed == true){
    console.log("Habit completed: "+habitsArray[index].is_completed)
    habitsArray[index].is_completed = false;
    habitsArray[index].last_completed_day = new Date(yesterday).toLocaleDateString("en-US");
    habitsArray[index].streak = habitsArray[index].streak-1
    console.log("Last COmpleted Type: "+typeof(habitsArray[index].last_completed_day));
    await updateDoc(docRef, {
        habits: habitsArray,
        'stats.exp':docData.stats.exp -10
    });

  
    }
    else if(habitsArray[index].is_completed==false){
    console.log("Habit completed: "+habitsArray[index].is_completed)
    habitsArray[index].is_completed = true;
    habitsArray[index].last_completed_day = new Date(today).toLocaleDateString("en-US");
    habitsArray[index].streak = habitsArray[index].streak+1
    console.log(habitsArray);
    // await docRef.update({ habits: habitsArray});
    await updateDoc(docRef, {
        habits: habitsArray,
        'stats.exp':docData.stats.exp +10
    });


    

    }
    else{
    console.log("Error updating habit")
    }


}


export async function handleAddHabit(e){
    e.preventDefault()
    
    const docRef = doc(db, "my-info", userData.docID);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    console.log("Added Habit: " + String(addedHabit))
    
    await updateDoc(docRef, {
        habits: arrayUnion(addedHabit)
    });
    // props.returnEmail(props.my_email)
    // window.location.reload(false);
    setShow(false)
    window.location.reload();
    
    }



  
