require('dotenv').config();

const fs = require('fs');
const axios = require('axios');
const csv = require('fast-csv');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const INPUT_CSV = 'artists.csv'; // Ensure columns: "artist"
const OUTPUT_CSV = 'artist_videos.csv';

async function getYouTubeLink(artist) {
  const query = encodeURIComponent(artist);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=3&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    // Log the relevant part of the response
    // console.log(`==============Response for ${artist}:`, response.data.items); // Log the items array

    if (response.data.items.length > 0) {
      // Map the video IDs to their respective URLs
      const videoLinks = response.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`);
      return videoLinks; // Return an array of video links
    }
  } catch (error) {
    console.error(`Error fetching YouTube videos for ${artist}:`, error.message);
  }
  console.log(' ******** none found');
  return 'No videos found';
}

async function processCSV() {
  const results = [];
  fs.createReadStream(INPUT_CSV)
    .pipe(csv.parse({ headers: true }))
    .on('data', row => results.push(row))
    .on('end', async () => {
      for (let row of results) {
        const videoLinks = await getYouTubeLink(`${row['artist']} official music video`);
        row.youtube_link = Array.isArray(videoLinks) ? videoLinks.join(', ') : videoLinks; // Join links if it's an array
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
