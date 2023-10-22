// import puppeteer from "puppeteer";

// const getAnimeTitles = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://myanimelist.net/topanime.php?type=bypopularity', {
//     waitUntil: 'domcontentloaded',
//   });

//   // Wait for the content to load
//   await page.waitForSelector('.ranking-list');

//   const animeTitles = await page.evaluate(() => {
//     const titles = [];
//     const animeItems = document.querySelectorAll('.ranking-list .title');

//     animeItems.forEach((animeItem) => {
//       const title = animeItem.querySelector('h3').textContent.trim();
//       titles.push(title);
//     });

//     return titles;
//   });

//   console.log(animeTitles);
// //   await browser.close();
// //   return animeTitles;

  
// };

// export default animeTitlesJson = getAnimeTitles();
