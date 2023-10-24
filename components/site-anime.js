// import Image from 'next/image'
import { db } from './firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
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



export default function SiteAnime(props) {

    return (
        <div className='anime-site-container'>
            <h1>Site Anime</h1>
            <div className='anime-list'>
                <div>
                    {props.animeData.titles.map((anime, index) => (
                        <div>
                            <div key={index}>{anime.name}</div>
                            <img src={anime.img} key={index} />
                            <button onClick={() => props.addAnime(index)}>+</button>

                        </div>


                    ))}
                </div>


            </div>

        </div>

    )
}