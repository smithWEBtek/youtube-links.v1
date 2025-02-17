
You: 

I try to find pdf sheet music files for songs I'm learning for various musical groups. Often scribd.com has good results. Although scribd is making changes to their support of sheet music. 
Do you have any suggestions on where to find pdf files for songs?

ChatGPT: 

Yes! There are several great sources for PDF sheet music, depending on what you're looking for (free vs. paid, lead sheets vs. full arrangements, etc.). Here are some good options:
**Free Sheet Music Sources:**  
1. **[IMSLP (International Music Score Library Project)](https://imslp.org/) **  – Best for classical and public domain music.
 
2. **[MuseScore](https://musescore.com/) **  – Community-uploaded sheet music, including lead sheets, jazz, and pop.
 
3. **[8notes](https://www.8notes.com/) **  – Free and paid sheet music in various genres.
 
4. **[Mutopia Project](https://www.mutopiaproject.org/) **  – Classical sheet music, similar to IMSLP.
 
5. **[The Fake Book Library]() **  – Many old jazz, ragtime, and fake books.
 
6. **[Wikifonia (Archived)](https://wikinoten.com/) **  – Lead sheets in MusicXML and PDF format.
**Paid / Subscription-Based Sheet Music Sites:**  
1. **[Sheet Music Direct](https://www.sheetmusicdirect.com/) **  – Lead sheets, full scores, and arrangements.
 
2. **[Musicnotes](https://www.musicnotes.com/) **  – Well-formatted arrangements for many instruments.
 
3. **[Virtual Sheet Music](https://www.virtualsheetmusic.com/) **  – Classical, jazz, and pop arrangements.
 
4. **[JW Pepper](https://www.jwpepper.com/) **  – Great for ensemble and choral music.
**Jazz & Latin Music:**  
1. **[Sher Music Digital](https://www.shermusic.com/) **  – Official Real Books and other jazz books.
 
2. **[Jazz Transcriptions by Mark S.]() **  – Hand-transcribed jazz piano scores.
 
3. **[Latinpiano.net](https://latinpiano.net/) **  – Paid Latin jazz and salsa arrangements.

If you’re looking for something specific, I can help you track it down. Do you need lead sheets, full piano arrangements, or something else?

You: 

I'm looking for free if possible.  Often I search for "song_title pdf" and find downloadable results.

ChatGPT: 

That’s a solid approach! If you're searching for free sheet music, try adding these keywords in your searches:
 
- `"song title" pdf site:imslp.org` → Classical & public domain
 
- `"song title" pdf site:musescore.com` → Community-contributed sheet music
 
- `"song title" pdf site:8notes.com` → Various genres
 
- `"song title" lead sheet pdf` → Lead sheets
 
- `"song title" fake book pdf` → Jazz & pop lead sheets
 
- `"song title" transcription pdf` → If looking for a detailed transcription

Also, some sites (like MuseScore) require an account to download, but you can sometimes preview the sheets online for free.

For Latin and salsa, you might have to dig a bit more—if there’s a particular song you're struggling to find, let me know and I’ll see if I can help track it down!

You: 

how can I automate this search using a csv file of songs such as this example: 
"title", "artist"
Billy Jean-Michael Jackson
Brick House-Commodores

ChatGPT: 

You can automate searching for sheet music using a Node.js script that reads a CSV file and generates Google search URLs for each song. Here’s how:
**Steps:** 
1. Read the CSV file.

2. Format each row into a Google search query.

3. Open or save the search URLs for easy access.


---

**1️⃣ Install Required Packages** You'll need **csv-parser**  to read the CSV file and **open**  to automatically open search URLs in your browser.
Run this command in your project folder:


```sh
npm install csv-parser open
```


---

**
You can automate searching for sheet music using a Node.js script that reads a CSV file and generates Google search URLs for each song. Here’s how:
**Steps:** 
1. Read the CSV file.

2. Format each row into a Google search query.

3. Open or save the search URLs for easy access.


---

**1️⃣ Install Required Packages** You'll need **csv-parser**  to read the CSV file and **open**  to automatically open search URLs in your browser.
Run this command in your project folder:


```sh
npm install csv-parser open
```


---

2️⃣ Create `searchSheetMusic.js` Script** 
Save the following Node.js script:


```javascript
const fs = require('fs');
const csv = require('csv-parser');
const open = require('open');

const csvFilePath = 'songs.csv';  // Change this to your actual CSV file
const searchBaseUrl = 'https://www.google.com/search?q=';

// Read the CSV and process each song
fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: ['title', 'artist'], skipLines: 1 })) // Adjust headers as needed
  .on('data', (row) => {
    const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
    const searchUrl = `${searchBaseUrl}${query}`;

    console.log(`Searching: ${searchUrl}`);
    open(searchUrl);  // Opens in your default browser
  })
  .on('end', () => {
    console.log('All searches launched.');
  });
```


---

**3️⃣ Run the Script** 

```sh
node searchSheetMusic.js
```
This will:
✅ Read `songs.csv`
✅ Generate Google search queries like
`https://www.google.com/search?q=Billy+Jean+Michael+Jackson+pdf+sheet+music`
✅ Open each search in your browser

---

**Modifications You Might Want**  
- **Just save URLs instead of opening them:** 
Modify the script to write URLs to a text file instead of opening them.
 
- **Use a headless browser (like Puppeteer)**  to scrape search results automatically.
 
- **Automate downloading PDFs**  (if direct links exist), but this would require more complex scraping.

Would you like to refine this further based on how you want to handle results?

You: 

yes please add instructions for saving the URLs and using Puppeteer
I'll only download PDFs after I've viewed the URLs to determine if the PDF meets my needs.

ChatGPT: 

Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.**
Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.Updated `searchSheetMusic.js` Script** 

```javascript
const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'songs.csv';  // Change this to your actual CSV file
const outputFile = 'search_urls.txt';
const searchBaseUrl = 'https://www.google.com/search?q=';

const urls = [];

fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: ['title', 'artist'], skipLines: 1 }))
  .on('data', (row) => {
    const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
    const searchUrl = `${searchBaseUrl}${query}`;
    urls.push(searchUrl);
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, urls.join('\n'));
    console.log(`Saved ${urls.length} search URLs to ${outputFile}`);
  });
```
**Run the script:** 

```sh
node searchSheetMusic.js
```
✅ It will generate a `search_urls.txt` file containing all the Google search URLs.
✅ You can manually open the links and check the results.

---

**2️⃣ Use Puppeteer to Scrape the First Few Search Results** 
Instead of manually opening search results, Puppeteer can extract the first few links from each Google search.
**Install Puppeteer** 
Run this in your terminal:


```sh
npm install puppeteer
```


---

**
Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.**
Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.Updated `searchSheetMusic.js` Script** 

```javascript
const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'songs.csv';  // Change this to your actual CSV file
const outputFile = 'search_urls.txt';
const searchBaseUrl = 'https://www.google.com/search?q=';

const urls = [];

fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: ['title', 'artist'], skipLines: 1 }))
  .on('data', (row) => {
    const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
    const searchUrl = `${searchBaseUrl}${query}`;
    urls.push(searchUrl);
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, urls.join('\n'));
    console.log(`Saved ${urls.length} search URLs to ${outputFile}`);
  });
```
**Run the script:** 

```sh
node searchSheetMusic.js
```
✅ It will generate a `search_urls.txt` file containing all the Google search URLs.
✅ You can manually open the links and check the results.

---

**2️⃣ Use Puppeteer to Scrape the First Few Search Results** 
Instead of manually opening search results, Puppeteer can extract the first few links from each Google search.
**Install Puppeteer** 
Run this in your terminal:


```sh
npm install puppeteer
```


---

New `scrapeSheetMusicLinks.js` Script** 
This script:
 
- Reads `songs.csv`

- Searches Google for each song

- Extracts the first 3-5 results (ignoring ads)
 
- Saves them to `search_results.txt`


```javascript
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
      const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
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
```
**Run the script:** 

```sh
node scrapeSheetMusicLinks.js
```
**What This Does:** ✅ Reads `songs.csv`
✅ Searches Google for each song
✅ Extracts the first 5 links
✅ Saves them to `search_results.txt`

---

**
Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.**
Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.Updated `searchSheetMusic.js` Script** 

```javascript
const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'songs.csv';  // Change this to your actual CSV file
const outputFile = 'search_urls.txt';
const searchBaseUrl = 'https://www.google.com/search?q=';

const urls = [];

fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: ['title', 'artist'], skipLines: 1 }))
  .on('data', (row) => {
    const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
    const searchUrl = `${searchBaseUrl}${query}`;
    urls.push(searchUrl);
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, urls.join('\n'));
    console.log(`Saved ${urls.length} search URLs to ${outputFile}`);
  });
```
**Run the script:** 

```sh
node searchSheetMusic.js
```
✅ It will generate a `search_urls.txt` file containing all the Google search URLs.
✅ You can manually open the links and check the results.

---

**2️⃣ Use Puppeteer to Scrape the First Few Search Results** 
Instead of manually opening search results, Puppeteer can extract the first few links from each Google search.
**Install Puppeteer** 
Run this in your terminal:


```sh
npm install puppeteer
```


---

**
Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.**
Great! Below are two enhancements:
 
1. **Save the search URLs to a text file instead of opening them immediately.**
 
2. **Use Puppeteer to scrape search results and save the first few links for each song.**


---

**1️⃣ Save URLs to a File Instead of Opening Them** Modify the script to write search URLs to `search_urls.txt` instead of opening them.Updated `searchSheetMusic.js` Script** 

```javascript
const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'songs.csv';  // Change this to your actual CSV file
const outputFile = 'search_urls.txt';
const searchBaseUrl = 'https://www.google.com/search?q=';

const urls = [];

fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: ['title', 'artist'], skipLines: 1 }))
  .on('data', (row) => {
    const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
    const searchUrl = `${searchBaseUrl}${query}`;
    urls.push(searchUrl);
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, urls.join('\n'));
    console.log(`Saved ${urls.length} search URLs to ${outputFile}`);
  });
```
**Run the script:** 

```sh
node searchSheetMusic.js
```
✅ It will generate a `search_urls.txt` file containing all the Google search URLs.
✅ You can manually open the links and check the results.

---

**2️⃣ Use Puppeteer to Scrape the First Few Search Results** 
Instead of manually opening search results, Puppeteer can extract the first few links from each Google search.
**Install Puppeteer** 
Run this in your terminal:


```sh
npm install puppeteer
```


---

New `scrapeSheetMusicLinks.js` Script** 
This script:
 
- Reads `songs.csv`

- Searches Google for each song

- Extracts the first 3-5 results (ignoring ads)
 
- Saves them to `search_results.txt`


```javascript
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
      const query = `${row.title} ${row.artist} pdf sheet music`.replace(/ /g, '+');
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
```
**Run the script:** 

```sh
node scrapeSheetMusicLinks.js
```
**What This Does:** ✅ Reads `songs.csv`
✅ Searches Google for each song
✅ Extracts the first 5 links
✅ Saves them to `search_results.txt`

---

Example `search_results.txt` Output** 

```bash
Billy Jean - Michael Jackson
https://www.scribd.com/document/123456789/Billie-Jean-Sheet-Music
https://musescore.com/user/987654321/scores/654321
https://www.musicnotes.com/sheetmusic/mtd.asp?ppn=MN0041234

Brick House - Commodores
https://musescore.com/sheetmusic/brick-house
https://www.sheetmusicdirect.com/se/ID_No/123456/Product.aspx
https://freepianosheets.com/brick-house
```


---

**Final Thoughts**  
- Now you can **review the links manually**  before downloading PDFs.
 
- If you want **more advanced filtering**  (e.g., prioritize MuseScore, exclude certain domains), let me know!
 
- You can modify Puppeteer to **click through and download PDFs automatically** , but it’s best to review first.

Would you like any refinements to this workflow? 🚀
