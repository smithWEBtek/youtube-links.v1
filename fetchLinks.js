require('dotenv').config()
// console.log('****************YOUTUBE_API_KEY: ', process.env.YOUTUBE_API_KEY)

const fs = require('fs');
const axios = require('axios');
const csv = require('fast-csv');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const INPUT_CSV = 'songs.csv'; // Ensure columns: "song title", "artist"
const OUTPUT_CSV = 'songs_with_links.csv';

async function getYouTubeLink(song, artist) {
  const query = encodeURIComponent(`${song} ${artist}`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=1&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.items.length > 0) {
      return `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
    }
  } catch (error) {
    console.error(`Error fetching YouTube link for ${song} - ${artist}:`, error.message);
  }
  debugger;
  console.log(' ******** none found');
  return 'No link found';
}

function processCSV() {
  const results = [];
  fs.createReadStream(INPUT_CSV)
    .pipe(csv.parse({ headers: true }))
    .on('data', row => results.push(row))
    .on('end', async () => {
      for (let row of results) {
        row.youtube_link = await getYouTubeLink(row['song title'], row['artist']);
      }
      saveCSV(results);
    });
}

function saveCSV(data) {
  const ws = fs.createWriteStream(OUTPUT_CSV);
  csv.write(data, { headers: true }).pipe(ws);
  console.log(`Done! Saved to ${OUTPUT_CSV}`);
}

processCSV();
