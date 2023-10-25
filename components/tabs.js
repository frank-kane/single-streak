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



export default function MyTabs(props) {

  return (
    <div className='items-container'>
      <h1>Items</h1>
      <Tabs>
        <TabList>
          <Tab>Weapons</Tab>
          <Tab>Healing Items</Tab>
        </TabList>

        <TabPanel>
          <div className='all-weapons'>
            {props.weapons.length > 0 ? props.weapons.map((weapon) => (
              <div className='weapon' key={weapon.id}>
                <div>
                  <img className='weapon-image' src={`${weapon.name}.png`} />
                </div>
                <div key={weapon.id}>
                  {weapon.name}
                </div>
                <div>Dmg: {weapon.damage}
                </div>
                <div>{weapon.quantity}
                </div>
              </div>
            )) : <h1>No Weapons</h1>}
          </div>
        </TabPanel>

        <TabPanel>
        <div className='all-items'>
            {props.items.length > 0 ? props.items.map((item) => (
              <div className='item' key={item.id}>
                <div>
                  <img className='item-image' src={`${item.name}.png`} />
                </div>
                <div key={item.id}>
                  {item.name}
                </div>
                <div>Heal: {item.damage}
                </div>
                <div>{item.quantity}
                </div>
              </div>
            )) : <h1>No Items</h1>}
          </div>
        </TabPanel>
      </Tabs>


    </div>

  )
}