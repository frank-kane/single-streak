import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase-config'
import { doc, getDoc, updateDoc, collection, addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

export default function ProfilePic(props) {

    const [showProfilePics, setShowProfilePics] = useState(false)
    const profilePicCollection = collection(db, 'site-info/86Ei9tz05EgTUGAaq1Ts/profile-pics');
    const [profilePics, setProfilePics] = useState([]);
    function handleProfilePicClick() {

        setShowProfilePics(!showProfilePics)

    }

    function handleHover(index) {
        // const updatedHoveredHabits = [...hoveredAnimes];
        // updatedHoveredHabits[index] = true;
        // setHoverAnimes(updatedHoveredHabits);
    }

    function handleHoverExit(index) {
        // const updatedHoveredHabits = [...hoveredAnimes];
        // updatedHoveredHabits[index] = false;
        // setHoverAnimes(updatedHoveredHabits);
    }

    function handleSitePicClick(url){
        props.handleProfilePicChange(url)
        setShowProfilePics(!showProfilePics)

    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(query(profilePicCollection));
                setProfilePics(querySnapshot.docs);
            } catch (error) {
                console.error("Error fetching profile pics:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='profile-pic-holder'>
            <img src={props.profile_pic_url} className='profile-pic' onClick={handleProfilePicClick}></img>
            {showProfilePics &&
                <div className='all-profile-pics'>
                    {profilePics.length > 0 ? profilePics.map((pic,index) => (
                        <img src={pic.data().url} key={pic.id} className='site-profile-pic' onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHoverExit(index)} onClick={()=>handleSitePicClick(pic.data().url)} />
                    )) : <div><h1>No Pics</h1></div>}

                </div>
            }
        </div>

    )
}