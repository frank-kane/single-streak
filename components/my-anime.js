import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';

export default function MyAnime(props) {

  return (
    <div className='my-anime-container'>
      <h6>My Anime</h6>
      
        {props.myAnimeTitles &&
          props.myAnimeTitles.length > 0 ? props.myAnimeTitles.map((anime) => (


            <div key={anime.id} className='anime' style={{ backgroundImage: `url(${anime.img})` }}>

              <div className='anime-name' key={anime.id}>{anime.name || 'No Name'}</div>

              {/* <div><img src={anime.img} key={anime.id} className='anime-icon' /></div> */}
              <div className='anime-lower-content'>
                <img
                  name="active-season-button"
                  className={`active-season-button-${String(anime.active_season)}`}
                  src='active-season-button.png'
                  onClick={(e) => props.handleAnimeDayChange(e, anime.id)}
                ></img>
                <select
                  name="type"
                  value={anime.week_day_air}
                  onChange={(e) => props.handleAnimeDayChange(e, anime.id)}
                  className='day-select'
                >
                  <option value="monday">M</option>
                  <option value="tuesday">T</option>
                  <option value="wednesday">W</option>
                  <option value="thursday">T</option>
                  <option value="friday">F</option>
                  <option value="saturday">St</option>
                  <option value="sunday">Sn</option>
                </select>
                <div><button onClick={() => props.deleteAnime(anime.id)} className='delete-button'>-</button></div>
              </div>


            </div>
          )) : <div>
          <h1>No Habits</h1>

        </div>
        }
      

    </div>

  )
}