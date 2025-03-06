const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'songs.csv';  // Change this to your actual CSV file
const outputFile = 'search_urls.txt';
const searchBaseUrl = 'https://www.google.com/search?q=';

const urls = [];

fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: ['artist', 'title'], skipLines: 1 }))
  .on('data', (row) => {
    // search for song by title artist and 'pdf sheet music'
    const query = `${row.title} ${row.artist} pdf`.replace(/ /g, '+');

    // searcyh for songbook for this artist
    // const query = `${row.artist} pdf songbook`.replace(/ /g, '+');

    const searchUrl = `${searchBaseUrl}${query}`;
    urls.push(searchUrl);
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, urls.join('\n'));
    console.log(`Saved ${urls.length} search URLs to ${outputFile}`);
  });
