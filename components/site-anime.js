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

    return (
        <div className='anime-site-container'>
            <h1>Site Anime</h1>
            <div className='search-bar'>
                <input
                    type="text"
                    placeholder="Search by Anime Name"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className='anime-list'>
                <div>
                    {filteredAnimeData.map((anime, index) => (
                        <div key={index}>
                            <div>{anime.name}</div>
                            <img src={anime.img} key={index} />
                            <button onClick={() => props.addAnime(filteredIndices[index])}>+</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
