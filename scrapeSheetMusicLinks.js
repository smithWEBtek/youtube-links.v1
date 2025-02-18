const fs = require('fs');
const csv = require('csv-parser');
const puppeteer = require('puppeteer');

const csvFilePath = 'songs.csv';  // CSV file with song titles & artists
const outputFile = 'search_results.txt';
const searchBaseUrl = 'https://www.google.com/search?q=';

(async () => {
  const browser = await puppeteer.launch({ headless: true }); // Set to false if you want to see it run
  const page = await browser.newPage();

  const urls = [];

  // Read the CSV and process each song
  fs.createReadStream(csvFilePath)
    .pipe(csv({ headers: ['title', 'artist'], skipLines: 1 }))
    .on('data', async (row) => {
      // const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
      // const query = `${row.title} ${row.artist} pdf`.replace(/ /g, '+');
      const query = `${row.title} pdf`.replace(/ /g, '+');
      const searchUrl = `${searchBaseUrl}${query}`;

      console.log(`Searching: ${searchUrl}`);
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

      // Extract top search result links
      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'))
          .map(a => a.href)
          .filter(link => link.startsWith('http') && !link.includes('google.com'))
          .slice(0, 5); // Get the first 5 non-Google links
      });

      urls.push(`\n${row.title} - ${row.artist}`);
      urls.push(...links);
    })
    .on('end', async () => {
      fs.writeFileSync(outputFile, urls.join('\n'));
      console.log(`Saved search results to ${outputFile}`);
      await browser.close();
    });

})();