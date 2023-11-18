// import Image from 'next/image'

import { useEffect, useState } from 'react'

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

import FitnessInfo from '@/components/fitness-info';
import ProfilePic from '@/components/profile-pic';

import Footer from '@/components/footer';




export default function LeftTab(props) {
    const [content, setContent] = useState(0);
    const [showContent, setShowContent] = useState(false);

    async function handleTabButtonClick(contentNum) {

        if(content != contentNum && showContent == true){
            setContent(contentNum)


        }else{
            setShowContent(!showContent)

            setContent(contentNum)

        }
        

    }

    return (
        <div className='left-tab-container'>
            <div className='left-tab'>

                <div className='tab-button' onClick={()=>handleTabButtonClick(0)}>

                </div>

                <div className='tab-button' onClick={()=>handleTabButtonClick(1)}>

                </div>

                <div className='tab-button' onClick={()=>handleTabButtonClick(2)}>

                </div>

                <div className='tab-button' onClick={()=>handleTabButtonClick(3)}>

                </div>

                <div className='tab-button' onClick={()=>handleTabButtonClick(4)}>

                </div>





            </div>


            {showContent &&
            <div className='left-tab-content-holder' onClick={()=>setShowContent(false)}>
            <div className='left-tab-content'>

            {
                content == 0
                ? <div className='upper-tab'>
        <ProfilePic profile_pic_url = {props.userInfo.profile_pic_url} handleProfilePicChange = {props.handleProfilePicChange}/>
        <UserInfo
          stats={props.stats}
          userInfo={props.userInfo}
        />
        <div>
          {props.stats && (
            <Stats
              stats={props.stats}
            />
          )}
          </div>
          </div>
                :
                
                content == 1
                ? <div>
                  <h6 className='content-title'>Habits</h6>
                  <Habits
                    habits={props.habits}
                    openOrCloseModal={props.openOrCloseModal}
                    createNewHabit={props.createNewHabit}
                    deleteHabit={props.deleteHabit}
                    isModalOpen={props.isModalOpen}
                    newHabitData={props.newHabitData}
                    handleInputChange={props.handleInputChange}
                    completeHabit={props.completeHabit}

                  />
                </div>
                : content == 2
                  ? <div>
                    <h6 className='content-title'>My Anime</h6>

                    <MyAnime
                      myAnimeTitles={props.myAnimeTitles}
                      deleteAnime={props.deleteAnime}
                      handleAnimeDayChange={props.handleAnimeDayChange}
                    />
                  </div>
                  : content == 3
                    ? <FitnessInfo
                      userInfo={props.userInfo}
                    />
                    : content == 4
                    ? <div>
                      <h6 className='content-title'>Site Anime</h6>
                      <SiteAnime
                        animeData={props.animeData}
                        addAnime={props.addAnime}

                      />
                    </div>
                    : content == 5
                    ? <FitnessInfo
                      userInfo={props.userInfo}
                    />
                    : <div>
                      
                    </div>
              }

            </div>
            </div>
            }
        </div>
    );
}
