# app to get youtube links for songs from csv

## this app takes a csv file with title, artist and finds a youtube link for each row

## this output is a csv file with a link for each row

## the outputted links can then be run through Youtube To M3 downloader to get the .mp3 file

## or you could put the links into playlist for easier sharing


# dev instructions from chatGPT

You: 

what is the most efficient way to use a csv text file with "song title", "artist" and get youtube links for each song?

ChatGPT: 

The most efficient way to get YouTube links for songs in a CSV file is to use the **YouTube Data API**  or **scrape YouTube search results**  programmatically. Here’s a breakdown of two approaches:

---

**1. Using YouTube Data API (Recommended)** **Pros:**  Reliable, avoids scraping issues, structured results
**Cons:**  Requires API key, limited free quota**Steps:**  
1. **Get a YouTube API Key:**  
  - Go to [Google Cloud Console]()

  - Create a new project

  - Enable the "YouTube Data API v3"

  - Generate an API key
 
2. **Install `googleapiclient`:** 

```bash
pip install google-api-python-client pandas
```
 
3. **Write a Python script to fetch YouTube links:** 

```python
import pandas as pd
from googleapiclient.discovery import build

# Load CSV
df = pd.read_csv("songs.csv")  # Ensure columns: 'song title', 'artist'

# YouTube API setup
API_KEY = "YOUR_YOUTUBE_API_KEY"
youtube = build("youtube", "v3", developerKey=API_KEY)

def get_youtube_link(song, artist):
    query = f"{song} {artist}"
    request = youtube.search().list(q=query, part="snippet", maxResults=1, type="video")
    response = request.execute()
    if response["items"]:
        video_id = response["items"][0]["id"]["videoId"]
        return f"https://www.youtube.com/watch?v={video_id}"
    return "No link found"

# Fetch links
df["youtube_link"] = df.apply(lambda row: get_youtube_link(row["song title"], row["artist"]), axis=1)

# Save results
df.to_csv("songs_with_links.csv", index=False)
print("Done! Check songs_with_links.csv")
```


---

**2. Scraping YouTube Search Results (Alternative)** **Pros:**  No API key required
**Cons:**  Less stable, can break if YouTube changes its structure**Steps:**  
1. **Install `youtube-search-python`:** 

```bash
pip install youtube-search-python pandas
```
 
2. **Use Python to scrape YouTube search results:** 

```python
from youtubesearchpython import VideosSearch
import pandas as pd

df = pd.read_csv("songs.csv")  # Ensure columns: 'song title', 'artist'

def get_youtube_link(song, artist):
    search = VideosSearch(f"{song} {artist}", limit=1)
    results = search.result()
    if results["result"]:
        return results["result"][0]["link"]
    return "No link found"

df["youtube_link"] = df.apply(lambda row: get_youtube_link(row["song title"], row["artist"]), axis=1)

df.to_csv("songs_with_links.csv", index=False)
print("Done! Check songs_with_links.csv")
```


---

**Which One Should You Use?**  
- **YouTube API (Option 1)**  → Best for **large-scale & reliable**  results.
 
- **Scraping (Option 2)**  → Best if **you don’t want to use an API key**  but accept the risk of breaking.

Would you like help setting up the API key? 🚀

You: 

can you do it with javascript?

ChatGPT: 

Yes! You can use **Node.js**  with either the **YouTube Data API**  (recommended) or web scraping with a package like `play-dl`. Here’s how to do both:

---

**1. Using YouTube Data API (Recommended)** **Pros:**  Reliable, follows YouTube’s guidelines
**Cons:**  Requires API key, has request limits**Steps**  
1. Get a **YouTube API Key** : 
  - Go to [Google Cloud Console]()
 
  - Enable **YouTube Data API v3**

  - Generate an API key
 
2. Install required packages:


```sh
npm install axios csv-parser fs fast-csv
```
 
3. **Create `fetchYouTubeLinks.js`** :

```javascript
const fs = require('fs');
const axios = require('axios');
const csv = require('fast-csv');

const API_KEY = 'YOUR_YOUTUBE_API_KEY';
const INPUT_CSV = 'songs.csv'; // Ensure columns: "song title", "artist"
const OUTPUT_CSV = 'songs_with_links.csv';

async function getYouTubeLink(song, artist) {
    const query = encodeURIComponent(`${song} ${artist}`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=1&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.items.length > 0) {
            return `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
        }
    } catch (error) {
        console.error(`Error fetching YouTube link for ${song} - ${artist}:`, error.message);
    }
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
```
 
4. **Run the script** :

```sh
node fetchYouTubeLinks.js
```


---

**2. Scraping YouTube Search (Alternative)** **Pros:**  No API key required
**Cons:**  Can break if YouTube changes its structure**Steps**  
1. Install required packages:


```sh
npm install play-dl csv-parser fs fast-csv
```
 
2. **Create `scrapeYouTubeLinks.js`** :

```javascript
const fs = require('fs');
const play = require('play-dl');
const csv = require('fast-csv');

const INPUT_CSV = 'songs.csv';
const OUTPUT_CSV = 'songs_with_links.csv';

async function getYouTubeLink(song, artist) {
    try {
        let searchResults = await play.search(`${song} ${artist}`, { limit: 1 });
        if (searchResults.length > 0) {
            return searchResults[0].url;
        }
    } catch (error) {
        console.error(`Error fetching YouTube link for ${song} - ${artist}:`, error.message);
    }
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
```
 
3. **Run the script** :

```sh
node scrapeYouTubeLinks.js
```


---

**Which One Should You Use?**  
- **YouTube API (Option 1)**  → Best for **reliable results**  and large-scale searches.
 
- **Scraping (Option 2)**  → Best if **you don’t want to use an API key** , but may break if YouTube updates their site.

Let me know if you need help setting up the API key! 🚀






## implementing 
- use google acct to get a Youtube API key:

follow instructions here: https://developers.google.com/youtube/v3/getting-started

- we are using the API with all access, no OAuth required

- youtube api enabled for this app:
- https://console.cloud.google.com/apis/api/youtube.googleapis.com/metrics?project=youtube-links-v1&inv=1&invt=Abpwow

- showing that my API key is a credential:
- https://console.cloud.google.com/apis/api/youtube.googleapis.com/credentials?inv=1&invt=Abpwow&project=youtube-links-v1


# 