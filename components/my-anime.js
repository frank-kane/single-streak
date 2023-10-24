import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';

export default function MyAnime(props){

    return(
        <div className='anime-container'>
        <h1>My Anime</h1>
        <div className='all-my-anime'>
          {props.myAnimeTitles.length > 0 ? props.myAnimeTitles.map((anime) => (


            <div key={anime.id} className='anime'>
              <div key={anime.id}>{anime.name}</div>
              <img src={anime.img} key={anime.id} className='anime-icon' />
              <button onClick={() => props.deleteAnime(anime.id)}>-</button>

            </div>
          )) : <div>
            <h1>No Habits</h1>

          </div>
          }
        </div>

      </div>
        
    )
}