//For showing modal for adding a habit

{show &&
    <div className="modal-overlay">    
   <div className='modal'>
       <div className='content'>
           <form onSubmit={handleAddHabit}>
             <label>Enter Title: </label>
             <input type="text"
             onChange={e => setAddedHabit(
               {
                 name: e.target.value,
                 is_completed: false,
                 streak: 0,
                 last_completed_day: "",
                 start_date: new Date().toLocaleDateString("en-US")
                 })}/>
             <input type="submit" />
           </form>
       </div>
       <div>
           <button onClick=
               {() => setShow(false)}>
                   Close
           </button>
       </div>
       </div>
   </div>
     
               }




               React.useEffect(() => {
                const scrapeTopAnime = async () => {
                  try {
                    // Define the URL of the website you want to scrape.
                    const url = 'https://www.animenewsnetwork.com/encyclopedia/ratings-anime.php?top50=popular&n=500'; // Replace with the actual URL.
                
                    // Make an HTTP GET request to fetch the HTML content of the webpage.
                    const response = await axios.get(url);
                
                    // Load the HTML content into Cheerio for parsing.
                    const $ = cheerio.load(response.data);
                
                    // Write code to scrape the top anime titles.
                    // You'll need to inspect the HTML structure of the website to determine how to select the relevant data.
                    const topAnimeTitles = [];
                
                    // Example code to select titles:
                    $('t').each((index, element) => {
                      const title = $(element).text();
                      topAnimeTitles.push(title);
                    });
                
                    // Set the scraped data to the state variable.
                    setSiteAnime(topAnimeTitles);
                    console.log(topAnimeTitles);
                
                  } catch (error) {
                    console.error('Error scraping anime:', error);
                  }
                };
                scrapeTopAnime();
              }, []);



              <div className='animeScroller'>
        {siteAnime.length > 0 ? siteAnime.map((anime) => (
          <ul>
          <li>
            {String(anime)}
          </li>
         
        
      </ul>
        )) : <h1>No Anime</h1>}
    </div>


const [siteAnime, setSiteAnime] = useState([]);