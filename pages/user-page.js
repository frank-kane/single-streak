// import styles from './page.css'
import {db} from '../components/firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, getDocs,updateDoc, collection,query,where  } from "firebase/firestore";
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

export default function UserPage() {
    const [streak, setStreak] = useState({}) 
    const [stats, setStats] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [isHovering, setIsHovering] = useState(false);
    const [myDoc,setMyDoc]= useState("1R01JaSkN66l356PKmnM")
    const [myHabits,setMyHabits]= useState([])
    const router = useRouter();
    const email =  router.query.my_email;

    console.log("The Data: "+String(email))
    
    

    const[characterAnimation, setCharacterAnimation] = useState('character-idle.gif');

    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
      const playAudio = (onOrOff) => {
        if (onOrOff ==true){
          const audio = new Audio('/completed.wav');
          audio.play();

        }else{
          const audio = new Audio('/failure.wav');
          audio.play();

        }
        
      };


  useEffect(()  =>{
    
    const today = new Date().toLocaleDateString("en-US");
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    yesterday = yesterday.toLocaleDateString("en-US")

    // console.log("Email: "+email)
    
    async function fetchData() {
      var docID; 
      if (!email) {
        // Handle the case when email is undefined, e.g., show an error message
        console.error("Email is undefined");
        return;
      }
      const UsersRef = collection(db, "my-info");
      const q = query(UsersRef, where("email", "==", "frankmyster@gmail.com"));
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docID = String(doc.id)
          console.log(doc.id, " => ", doc.data());
        });
      //k6r7dDqNYDPPahiuz945 
      //1R01JaSkN66l356PKmnM
      
    const docRef = doc(db, "my-info", "k6r7dDqNYDPPahiuz945");
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    const habitsArray = docData.habits
    
    // console.log("Habits: "+String(habitsArray[0].last_completed_day.toDate().toLocaleDateString("en-US")))  

    var newHabits = habitsArray.map(habit => {
      if(habit.last_completed_day == String(today)){
        habit.is_completed = true;
        return habit;

      }else if(habit.last_completed_day  ==  String(yesterday)){
        habit.is_completed = false;
        return habit;
        
      }
      else{
        habit.is_completed = false;
        habit.streak = 0;
        return habit;

      }
    }
    )
    console.log("Habits: "+String(habitsArray))
    await updateDoc(docRef, {
      habits: newHabits   
    });
    setMyHabits(docData.habits)

    await updateDoc(docRef, {
      current_day: new Date()
    });
    setStats({
        lvl: docData.stats.lvl,
        exp:docData.stats.exp,
        str:docData.stats.str,
        int:docData.stats.int,
        dex:docData.stats.dex
    })


    setUserInfo({
      user_name: docData.user_info.user_name,
      bfp: docData.user_info.bfp,
      height: docData.user_info.height,
      weight:docData.user_info.weight
  })

    }
    fetchData()
  },[[email]]);


  //============================functions============================================//
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleNameChange = async(e)=>{
    e.preventDefault()
    
    const docRef = doc(db, "my-info", "k6r7dDqNYDPPahiuz945");
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
  
    await updateDoc(docRef, {
      name: String(streak.name)
    });
    
  }

  

  async function performCharacterAnimation(onOrOff){
    if(onOrOff==true){
      setCharacterAnimation('character-success.gif');
      await delay(2000);
      

    }else{
      setCharacterAnimation('character-failure.gif');
      await delay(500);
      
    }
    setCharacterAnimation('character-idle.gif');
  }


  async function completeStreak(index){
    console.log("index: " + index);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    const docRef = doc(db, "my-info", "k6r7dDqNYDPPahiuz945");
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
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
      setStats({
        exp: docData.stats.exp -10
      })
      setMyHabits(docData.habits)
      performCharacterAnimation(false);
      playAudio(false);

      
      
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
      setStats({
        exp: docData.stats.exp +10
      })
      setMyHabits(docData.habits)
      performCharacterAnimation(true);
      playAudio(true);


    

    }
    else{
      console.log("Error updating habit")
    }

    
  }

  const listHabits = myHabits.map((habit,key) =>
    <div className='card' onClick={()=>completeStreak(key)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} key={key} >
            
            <h3><img src='fastforward.png' className='fastforward'/> {habit.streak}</h3>
            <center>
            <div className='habit-image-holder'>{habit.is_completed == false ?(<img src='x.png' className='habit-image'></img>):(<img src='fire.gif' className='habit-image'></img>)}</div>
            </center>
            <h3>{habit.name}</h3>
            {/* <h6>{habit.start_date ? (
            <p>Start Date: {habit.start_date.toDate().toLocaleDateString("en-US")}</p>
              ) : (
            <p>Loading...</p>
            )}</h6>
            <h6>{habit.last_completed_day ? (
            <p>Last Completed Day: {String(habit.last_completed_day)}</p>
              ) : (
            <p>Loading...</p>
            )}</h6> */}

          </div>
    
  );


  return (
    <main className='main'>

        <NavBar/>


        <UserContent
        lvl={stats.lvl}
        exp={stats.exp}
        isHovering={isHovering}
        is_completed={streak.is_completed}
        name={streak.name}
        user_name = {userInfo.user_name}
        habits = {listHabits}
        />
        {/* <Popup trigger=
                {<button> Edit Habit </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                <form onSubmit={handleNameChange}>
                                  <label>Enter Title: </label>
                                  <input type="text" value={streak.name}
                                  onChange={e => setStreak({...streak,name: e.target.value})}
                                  
                                  
                                  />
                                  <input type="submit" />
                                </form>
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup> */}
      <div className='main-content-holder'>
        <div className='main-content'>
          
          
          
          {/* //=========================Habit Cards===================// */}
          
          
          <div className='character-holder'>
              
              <img className='character' src={characterAnimation} alt="" />
              {/* <img className='floor-shadow' src="floor-shadow.png" alt="" /> */}
              
          </div>
          <MyTabs
            height={userInfo.height}
            bfp={userInfo.bfp*100}
            weight={userInfo.weight}
            str={stats.str}
            int={stats.int}
            dex={stats.dex}
          />

        </div>
      </div>

      
      
    </main>
  )
}
