import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';

export default function MyAnime(props) {

  return (
    <div className='anime-container'>
      <h6>My Anime</h6>
      <div className='all-my-anime'>
        {props.myAnimeTitles.length > 0 ? props.myAnimeTitles.map((anime) => (


          <div key={anime.id} className='anime'>
            <div className='anime-name' key={anime.id}>{anime.name}</div>
            <div><img src={anime.img} key={anime.id} className='anime-icon' /></div>
            <div><button onClick={() => props.deleteAnime(anime.id)}>-</button></div>
            

          </div>
        )) : <div>
          <h1>No Habits</h1>

        </div>
        }
      </div>

    </div>

  )
}