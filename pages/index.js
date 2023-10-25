'use client';;
import React, { useState } from 'react';
import 'firebase/auth';
import 'react-tabs/style/react-tabs.css';
import { db } from '../components/firebase-config'
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
import { Elsie_Swash_Caps } from 'next/font/google';

export default function Home() {
  const [content, setContent] = useState(0);
  const [myAnimeTitles, setMyAnimeTitles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [stats, setStats] = useState({});
  const [habits, setHabits] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitData, setNewHabitData] = useState({
    name: '',
    type: '',
  });
  const usersCollection = collection(db, 'users'); // Reference to the "users" collection
  const userDocRef = doc(usersCollection, '8yciXAQXy9GTxmuclEX6'); // Reference to the specific user document
  const habitsRef = collection(userDocRef, 'habits');
  const weaponsRef = collection(userDocRef, 'weapons');
  const itemsRef = collection(userDocRef, 'items');
  const myAnimeRef = collection(userDocRef, 'anime');
  const today = new Date(); // Current date and time
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);



  const handleContentChange = function (num) {
    if (content == 0 && num == -1) {
      setContent(2)

    } else if (content == 2 && num == 1) {
      setContent(0)

    } else {
      setContent(content + num)

    }

  }

  function openOrCloseModal() {
    console.log("openOrCloseModal function called");
    console.log("Modal: " + isModalOpen);
    setIsModalOpen(!isModalOpen);
    console.log("New Modal: " + isModalOpen);
  };

  //this is actually cooler than it looks because it changes the value based on the key which is dynamic
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabitData({
      ...newHabitData,
      [name]: value,
    });
  };



  React.useEffect(() => {
    async function giveHealthPotion() {

      const newItem = { name: 'small health potion', heal: 3 };



      // Define a probability value (e.g., 0.2 for a 20% chance)
      const probability = 0.1;

      // Generate a random number between 0 and 1
      const random = Math.random();
      console.log(random)

      // Check if the random number is less than or equal to the probability
      if (random <= probability) {
        const querySnapshot = await getDocs(query(itemsRef, where('name', '==', newItem.name)));

        if (querySnapshot.size > 0) {
          // If a document with the same name exists, update its quantity
          querySnapshot.forEach((item) => {
            const docRef = doc(itemsRef, item.id);
            updateDoc(docRef, {
              quantity: item.data().quantity + 1,
            });
          });
        } else {
          // If no matching document is found, add a new document
          await addDoc(itemsRef, { ...newItem, quantity: 1 });
        }
        alert("Received a small health potion!");
      }
    }
    // Call the function to give a health potion when the component mounts
    giveHealthPotion();
  }, []);


  //===============================ANIME=========================//
  React.useEffect(() => {
    const unsubscribe = onSnapshot(myAnimeRef, function (snapshot) {
      // Sync up our local notes array with the snapshot data
      const animeArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setMyAnimeTitles(animeArr)
    })
    return unsubscribe
  }, []);





  React.useEffect(() => {
    const unsubscribe = onSnapshot(habitsRef, function (snapshot) {
      const habitsArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const today = new Date(); // Current date
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      // Iterate through habits and check if the habit should be reset
      const updatedHabits = habitsArr.map((habit) => {
        // Check if the habit was missed on the previous day (yesterday)
        const lastCompletedDate = habit.last_completed.toDate();
        lastCompletedDate.setHours(0, 0, 0, 0);
        console.log(lastCompletedDate)

        if (lastCompletedDate < yesterday) {
          // If it was completed and missed yesterday, reset the streak
          return {
            ...habit,
            is_completed: false,
            streak: 0,
          };
        }

        return habit; // No changes required
      });

      // Update habits in the database
      updatedHabits.forEach(async (updatedHabit) => {
        const habitDocRef = doc(habitsRef, updatedHabit.id);
        await updateDoc(habitDocRef, updatedHabit);
      });

      setHabits(updatedHabits);
      alert(updatedHabits.length)
      if (updatedHabits.length > 0) {
        subtractHealth(updatedHabits);
      }
    });

    return unsubscribe;
  }, []);




  //============================WEAPONS=============================//
  React.useEffect(() => {
    const unsubscribe = onSnapshot(weaponsRef, function (snapshot) {
      // Sync up our local notes array with the snapshot data
      const weaponsArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setWeapons(weaponsArr)
    })
    return unsubscribe
  }, []);

  //============================ITEMS=============================//
  React.useEffect(() => {
    const unsubscribe = onSnapshot(itemsRef, function (snapshot) {
      // Sync up our local notes array with the snapshot data
      const itemsArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setItems(itemsArr)
    })
    return unsubscribe
  }, []);


  React.useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        // Assuming you have a 'stats' field in your user document
        const userStats = userData.stats;
        setUserInfo({
          username: userData.username,
          money: userData.money
        })
        setStats(userStats);
        console.log(stats)
      }
    });

    // Fetch habits data using a similar onSnapshot block as you did for habits

    return () => {
      // Unsubscribe from both snapshots when the component unmounts
      unsubscribe();
      // Unsubscribe from the habits snapshot as well (you can include your existing habits-related code here)
    };
  }, []);



  async function subtractHealth(habits) {
    var healthLoss = 0;
    //=======================Get Collection======================//
    const userDocRef = doc(usersCollection, '8yciXAQXy9GTxmuclEX6');
    const userSnapshot = await getDoc(userDocRef);
    const currentData = userSnapshot.data();
    //=======================Get Dates======================//
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dateSubtracted = currentData.health_subtracted.toDate();
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    dateSubtracted.setHours(0, 0, 0, 0);


    alert(`Today: ${today}\nYesterday: ${yesterday}\nDate Subtracted: ${dateSubtracted}`)



    alert('Do the dates match: '+(dateSubtracted == today))
    if (dateSubtracted != today) {
      console.log("Health Has Not Been Subtracted")
      if(habits.length > 0){
        habits.forEach((habit) => {
          console.log("Habit: "+habit.name)
          const lastCompletedDate = habit.last_completed.toDate();
          lastCompletedDate.setHours(0, 0, 0, 0);
          console.log("Last Completed Date: "+lastCompletedDate)
          if (lastCompletedDate < yesterday) {
  
            healthLoss = healthLoss - 1
            console.log("Health Loss: " + healthLoss)
          }
        });
        const newHealth = currentData.stats.current_health + healthLoss
        console.log("Health Loss: " + healthLoss)
        console.log("New Health: " + newHealth)
  
        console.log("Updating health")
        await updateDoc(userDocRef, {
          'stats.current_health': newHealth,
        });
  
        // await updateDoc(userDocRef, {
        //   health_subtracted: today,
        // });
        // }

      }else{
        console.log('No Habits to update')
      }
      
    }else{
      alert('Health has been')
    }
  }



  async function createNewHabit() {

    const newHabit = { ...newHabitData, is_completed: false, last_completed: new Date(), streak: 0 };
    await addDoc(habitsRef, newHabit);
    alert('Created New Habit');

    // Close the modal
    openOrCloseModal();

  }

  async function deleteHabit(noteId) {
    const habitsRef = collection(userDocRef, 'habits');
    const docRef = doc(habitsRef, noteId)
    await deleteDoc(docRef)
  }

  async function addAnime(animeIndex) {
    const animeToAdd = animeData.titles[animeIndex]; // Get the anime object from animeData

    try {
      // Add the anime object to your myAnimeRef collection in Firebase
      await addDoc(myAnimeRef, animeToAdd);
      // You may want to show a success message or update your local state here.
    } catch (error) {
      console.error("Error adding anime:", error);
      // Handle the error (e.g., show an error message).
    }
  }

  async function deleteAnime(animeId) {

    const docRef = doc(myAnimeRef, animeId)
    await deleteDoc(docRef)
  }

  async function completeHabit(noteId) {
    const userDocRef = doc(usersCollection, '8yciXAQXy9GTxmuclEX6');
    const habitsRef = collection(userDocRef, 'habits');

    const docRef = doc(habitsRef, noteId)
    const docSnapshot = await getDoc(docRef);
    const userSnapshot = await getDoc(userDocRef);

    const currentData = docSnapshot.data();
    const userCurrentData = userSnapshot.data();
    const updatedIsCompleted = !currentData.is_completed; // Toggle the value
    const streak = currentData.is_completed ? -1 : 1;
    const level = currentData.is_completed ? -1 : 1;
    const new_next_exp = currentData.is_completed ? -1 : 1;
    const statIncrease = currentData.is_completed ? -3 : 3;
    const expIncrease = currentData.is_completed ? -10 : 10;
    const dateChange = currentData.is_completed ? yesterday : today;

    // Update the is_completed field with the new value
    await updateDoc(docRef, {
      is_completed: updatedIsCompleted,
      streak: currentData.streak + streak,
      last_completed: dateChange,
    });

    if (userCurrentData.stats.current_health < userCurrentData.stats.total_health) {
      await updateDoc(userDocRef, {
        'stats.current_health': userCurrentData.stats.current_health + level
      });

    }

    if (userCurrentData.stats.current_exp + expIncrease >= userCurrentData.stats.next_exp) {
      await updateDoc(userDocRef, {
        'stats.level': userCurrentData.stats.level + level,
        'stats.current_exp': 0,
        'stats.prev_current_exp': userCurrentData.stats.current_exp,
        'stats.prev_next_exp': userCurrentData.stats.next_exp,
        'stats.next_exp': Math.floor(userCurrentData.stats.next_exp * (1.15))

      });

    }
    else if (currentData.is_completed == true && userCurrentData.stats.current_exp + expIncrease < 0) {
      await updateDoc(userDocRef, {
        'stats.level': userCurrentData.stats.level + level,
        'stats.current_exp': userCurrentData.stats.prev_next_exp + expIncrease,
        'stats.prev_current_exp': userCurrentData.stats.current_exp,
        'stats.next_exp': userCurrentData.stats.prev_next_exp,

      });

    } else {
      await updateDoc(userDocRef, {
        'stats.current_exp': userCurrentData.stats.current_exp + expIncrease,
        'stats.prev_current_exp': userCurrentData.stats.current_exp
      });

    }
    if (currentData.type == "strength") {
      await updateDoc(userDocRef, {
        'stats.strength': userCurrentData.stats.strength + statIncrease
      });
    } else if (currentData.type == "intellect") {
      await updateDoc(userDocRef, {
        'stats.intellect': userCurrentData.stats.intellect + statIncrease
      });

    } else if (currentData.type == "dexerity") {
      await updateDoc(userDocRef, {
        'stats.intellect': userCurrentData.stats.dexerity + statIncrease
      });

    }
    else if (currentData.type == "wisdom") {
      await updateDoc(userDocRef, {
        'stats.intellect': userCurrentData.stats.wisdom + statIncrease
      });

    }
    else if (currentData.type == "constitute") {
      await updateDoc(userDocRef, {
        'stats.intellect': userCurrentData.stats.constitute + statIncrease
      });

    }
    else if (currentData.type == "charisma") {
      await updateDoc(userDocRef, {
        'stats.intellect': userCurrentData.stats.charisma + statIncrease
      });

    }
  }




  return (
    <div className='index-container'>
      <NavBar />

      <div className='upper-tab'>
        <UserInfo
          stats={stats}
          userInfo={userInfo}
        />
        <div>
          {stats && (
            <Stats
              stats={stats}
            />
          )}


        </div>

        <div className='content'>
          <img src='right arrow.png' className='left' onClick={() => handleContentChange(1)}></img>

          <div className='inner-content'>
            {content == 0
              ? <Habits
                habits={habits}
                openOrCloseModal={openOrCloseModal}
                createNewHabit={createNewHabit}
                deleteHabit={deleteHabit}
                isModalOpen={isModalOpen}
                newHabitData={newHabitData}
                handleInputChange={handleInputChange}
                completeHabit={completeHabit}

              />
              : content == 1
                ? <MyAnime
                  myAnimeTitles={myAnimeTitles}
                  deleteAnime={deleteAnime}
                /> : <h1 className='anime-container'>Hello</h1>
            }
          </div>

          <img src='right arrow.png' className='right' onClick={() => handleContentChange(-1)}></img>




        </div>

      </div>


      <div className='lower-tab'>
        <MyTabs
          weapons={weapons}
          items={items}
        />

        <div>
          <img className='character-image' src='male-character-idle.gif' />
        </div>

        {/* <SiteAnime
          animeData={animeData}
          addAnime={addAnime}

        /> */}
      </div>

    </div>
  );




}
