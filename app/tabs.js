import Image from 'next/image'
import styles from './page.css'
import {db} from './firebase-config'
import { useEffect, useState } from 'react'
import { Timestamp, doc, getDoc, updateDoc  } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import useSound from 'use-sound';
//import boopSfx from "../public/completed.wav";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default function MyTabs(props){

    return(
        <div className='my-tabs'>
            <Tabs>
                <TabList>
                    <Tab>Stats</Tab>
                    <Tab>Inventory</Tab>
                    <Tab>Quests</Tab>
                </TabList>

                <TabPanel>
                    <h3>Height: {props.height}</h3>
                    <h3>Weight: {props.weight}</h3>
                    <h3>BFP: {props.bfp}%</h3>
                    <h4>Str: {props.str}</h4>
                    <h4>Dex: {props.dex}</h4>
                    <h4>Int: {props.int}</h4>
                    
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 3</h2>
                </TabPanel>
            </Tabs>

        </div>
        
    )
}