import React from 'react';
import animeData from './anime-list.json'; // Adjust the path to match your file structure

function AnimeList() {
  return (
    <div className='anime-list'>
      <div>
        {animeData.titles.map((anime, index) => (
            <div>
                <div key={index}>{anime.name}</div>
                <img src={anime.img} key={index} />
                <button>+</button>

            </div>
          

        ))}
      </div>

      
    </div>
  );
}

export default AnimeList;