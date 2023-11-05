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
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAnimeData, setFilteredAnimeData] = useState(props.animeData.titles);
    const [filteredIndices, setFilteredIndices] = useState([...Array(props.animeData.titles.length).keys()]);
    const [hoveredAnimes, setHoverAnimes] = useState(Array(props.animeData.length).fill(false));

    // Function to update the search query and filter the animeData
    const handleSearch = (query) => {
        const filteredData = props.animeData.titles.filter((anime) =>
            anime.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredAnimeData(filteredData);
        setSearchQuery(query);
        // Update the filtered indices
        setFilteredIndices(filteredData.map((anime) => props.animeData.titles.indexOf(anime)));
    };

    function handleHover(index) {
        const updatedHoveredHabits = [...hoveredAnimes];
        updatedHoveredHabits[index] = true;
        setHoverAnimes(updatedHoveredHabits);
    }

    function handleHoverExit(index) {
        const updatedHoveredHabits = [...hoveredAnimes];
        updatedHoveredHabits[index] = false;
        setHoverAnimes(updatedHoveredHabits);
    }

    return (
        <div className='anime-site-container'>
        

            
                <input
                    type="text"
                    placeholder="Search by Anime Name"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            
            
                    {filteredAnimeData.map((anime, index) => (
                        <div key={index} className='site-anime' style={{ backgroundImage: `url(${anime.img})` }} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHoverExit(index)}>
                            <div className='anime-name'>{anime.name}</div>
                            {/* <img src={anime.img} key={index} className='anime-icon' /> */}
                            {hoveredAnimes[index] &&
                            <div><button onClick={() => props.addAnime(filteredIndices[index])} className='add-button'>+</button></div>}
                        </div>
                    ))}
                
            
        </div>
    );
}
