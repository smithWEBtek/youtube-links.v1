
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

You: 

could I modify Puppeteer to download if the source is one of certain websites? and then if not just store the search string as before?

ChatGPT: 

Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

**Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

2️⃣ Update `scrapeAndDownload.js`** 
This script:
 
- **Scrapes Google search results**
 
- **Downloads PDFs if the link matches a preferred source**
 
- **Saves search links for later review if no PDFs were found**


```javascript
const fs = require('fs-extra');
const csv = require('csv-parser');
const puppeteer = require('puppeteer');
const path = require('path');

const csvFilePath = 'songs.csv';
const outputFile = 'search_results.txt';
const downloadDir = path.join(__dirname, 'pdf_downloads');

const searchBaseUrl = 'https://www.google.com/search?q=';
const preferredSources = ['musescore.com', 'imslp.org', '8notes.com']; // Add more trusted sources

// Ensure download directory exists
fs.ensureDirSync(downloadDir);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const results = [];

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

      let foundPdf = false;

      for (const link of links) {
        const hostname = new URL(link).hostname.replace('www.', '');

        if (preferredSources.some(source => hostname.includes(source))) {
          console.log(`✅ Trusted source found: ${link}`);
          foundPdf = await downloadPdf(page, link, row.title);
          if (foundPdf) break; // Stop looking if we found and downloaded a PDF
        }
      }

      if (!foundPdf) {
        results.push(`\n${row.title} - ${row.artist}`);
        results.push(...links);
      }
    })
    .on('end', async () => {
      fs.writeFileSync(outputFile, results.join('\n'));
      console.log(`Saved search results to ${outputFile}`);
      await browser.close();
    });
})();

// Function to attempt PDF download
async function downloadPdf(page, url, title) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Find a link to a PDF file
    const pdfLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .map(a => a.href)
        .find(href => href.endsWith('.pdf'));
    });

    if (pdfLink) {
      const pdfPath = path.join(downloadDir, `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      const viewSource = await page.goto(pdfLink);
      fs.writeFileSync(pdfPath, await viewSource.buffer());

      console.log(`📥 Downloaded: ${pdfPath}`);
      return true;
    } else {
      console.log(`❌ No direct PDF link found on: ${url}`);
      return false;
    }
  } catch (error) {
    console.error(`⚠️ Error processing ${url}: ${error.message}`);
    return false;
  }
}
```


---

**3️⃣ Running the Script** 
Run:


```sh
node scrapeAndDownload.js
```
**What It Does:** ✅ Searches Google for each song.
✅ Scrapes the first 5 non-Google links.
✅ If the link **matches a trusted source**  (e.g., MuseScore, IMSLP, 8notes): 
- **Attempts to find and download a PDF file.** 
✅ If **no PDF is found** , saves search results in `search_results.txt`.


---

**4️⃣ Example Outputs** **Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

**Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

2️⃣ Update `scrapeAndDownload.js`** 
This script:
 
- **Scrapes Google search results**
 
- **Downloads PDFs if the link matches a preferred source**
 
- **Saves search links for later review if no PDFs were found**


```javascript
const fs = require('fs-extra');
const csv = require('csv-parser');
const puppeteer = require('puppeteer');
const path = require('path');

const csvFilePath = 'songs.csv';
const outputFile = 'search_results.txt';
const downloadDir = path.join(__dirname, 'pdf_downloads');

const searchBaseUrl = 'https://www.google.com/search?q=';
const preferredSources = ['musescore.com', 'imslp.org', '8notes.com']; // Add more trusted sources

// Ensure download directory exists
fs.ensureDirSync(downloadDir);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const results = [];

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

      let foundPdf = false;

      for (const link of links) {
        const hostname = new URL(link).hostname.replace('www.', '');

        if (preferredSources.some(source => hostname.includes(source))) {
          console.log(`✅ Trusted source found: ${link}`);
          foundPdf = await downloadPdf(page, link, row.title);
          if (foundPdf) break; // Stop looking if we found and downloaded a PDF
        }
      }

      if (!foundPdf) {
        results.push(`\n${row.title} - ${row.artist}`);
        results.push(...links);
      }
    })
    .on('end', async () => {
      fs.writeFileSync(outputFile, results.join('\n'));
      console.log(`Saved search results to ${outputFile}`);
      await browser.close();
    });
})();

// Function to attempt PDF download
async function downloadPdf(page, url, title) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Find a link to a PDF file
    const pdfLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .map(a => a.href)
        .find(href => href.endsWith('.pdf'));
    });

    if (pdfLink) {
      const pdfPath = path.join(downloadDir, `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      const viewSource = await page.goto(pdfLink);
      fs.writeFileSync(pdfPath, await viewSource.buffer());

      console.log(`📥 Downloaded: ${pdfPath}`);
      return true;
    } else {
      console.log(`❌ No direct PDF link found on: ${url}`);
      return false;
    }
  } catch (error) {
    console.error(`⚠️ Error processing ${url}: ${error.message}`);
    return false;
  }
}
```


---

**3️⃣ Running the Script** 
Run:


```sh
node scrapeAndDownload.js
```
**What It Does:** ✅ Searches Google for each song.
✅ Scrapes the first 5 non-Google links.
✅ If the link **matches a trusted source**  (e.g., MuseScore, IMSLP, 8notes): 
- **Attempts to find and download a PDF file.** 
✅ If **no PDF is found** , saves search results in `search_results.txt`.


---

**4️⃣ Example Outputs** Downloaded PDFs (`pdf_downloads/`)**  
- `Billy_Jean.pdf`
 
- `Brick_House.pdf`
**Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

**Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

2️⃣ Update `scrapeAndDownload.js`** 
This script:
 
- **Scrapes Google search results**
 
- **Downloads PDFs if the link matches a preferred source**
 
- **Saves search links for later review if no PDFs were found**


```javascript
const fs = require('fs-extra');
const csv = require('csv-parser');
const puppeteer = require('puppeteer');
const path = require('path');

const csvFilePath = 'songs.csv';
const outputFile = 'search_results.txt';
const downloadDir = path.join(__dirname, 'pdf_downloads');

const searchBaseUrl = 'https://www.google.com/search?q=';
const preferredSources = ['musescore.com', 'imslp.org', '8notes.com']; // Add more trusted sources

// Ensure download directory exists
fs.ensureDirSync(downloadDir);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const results = [];

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

      let foundPdf = false;

      for (const link of links) {
        const hostname = new URL(link).hostname.replace('www.', '');

        if (preferredSources.some(source => hostname.includes(source))) {
          console.log(`✅ Trusted source found: ${link}`);
          foundPdf = await downloadPdf(page, link, row.title);
          if (foundPdf) break; // Stop looking if we found and downloaded a PDF
        }
      }

      if (!foundPdf) {
        results.push(`\n${row.title} - ${row.artist}`);
        results.push(...links);
      }
    })
    .on('end', async () => {
      fs.writeFileSync(outputFile, results.join('\n'));
      console.log(`Saved search results to ${outputFile}`);
      await browser.close();
    });
})();

// Function to attempt PDF download
async function downloadPdf(page, url, title) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Find a link to a PDF file
    const pdfLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .map(a => a.href)
        .find(href => href.endsWith('.pdf'));
    });

    if (pdfLink) {
      const pdfPath = path.join(downloadDir, `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      const viewSource = await page.goto(pdfLink);
      fs.writeFileSync(pdfPath, await viewSource.buffer());

      console.log(`📥 Downloaded: ${pdfPath}`);
      return true;
    } else {
      console.log(`❌ No direct PDF link found on: ${url}`);
      return false;
    }
  } catch (error) {
    console.error(`⚠️ Error processing ${url}: ${error.message}`);
    return false;
  }
}
```


---

**3️⃣ Running the Script** 
Run:


```sh
node scrapeAndDownload.js
```
**What It Does:** ✅ Searches Google for each song.
✅ Scrapes the first 5 non-Google links.
✅ If the link **matches a trusted source**  (e.g., MuseScore, IMSLP, 8notes): 
- **Attempts to find and download a PDF file.** 
✅ If **no PDF is found** , saves search results in `search_results.txt`.


---

**4️⃣ Example Outputs** **Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

**Yes! You can modify the Puppeteer script to **automatically download PDFs if the source is from a preferred website**  (like MuseScore, IMSLP, or other trusted sources) while saving other search results as before.

---

**How It Will Work:**  
1. **Read `songs.csv`**  → Generate Google search queries.
 
2. **Extract search result links**  (top 5 non-Google links).
 
3. **Check if the link is from a preferred website**  (e.g., MuseScore, IMSLP, 8notes). 
  - ✅ **If it's from a preferred site → Attempt to download the PDF.**
 
  - ❌ **Otherwise → Save the search URL for manual review.**
 
4. **Save results to `search_results.txt` and download PDFs into a folder.**


---

**1️⃣ Install Required Packages** 
Make sure Puppeteer is installed:


```sh
npm install puppeteer fs-extra path
```


---

2️⃣ Update `scrapeAndDownload.js`** 
This script:
 
- **Scrapes Google search results**
 
- **Downloads PDFs if the link matches a preferred source**
 
- **Saves search links for later review if no PDFs were found**


```javascript
const fs = require('fs-extra');
const csv = require('csv-parser');
const puppeteer = require('puppeteer');
const path = require('path');

const csvFilePath = 'songs.csv';
const outputFile = 'search_results.txt';
const downloadDir = path.join(__dirname, 'pdf_downloads');

const searchBaseUrl = 'https://www.google.com/search?q=';
const preferredSources = ['musescore.com', 'imslp.org', '8notes.com']; // Add more trusted sources

// Ensure download directory exists
fs.ensureDirSync(downloadDir);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const results = [];

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

      let foundPdf = false;

      for (const link of links) {
        const hostname = new URL(link).hostname.replace('www.', '');

        if (preferredSources.some(source => hostname.includes(source))) {
          console.log(`✅ Trusted source found: ${link}`);
          foundPdf = await downloadPdf(page, link, row.title);
          if (foundPdf) break; // Stop looking if we found and downloaded a PDF
        }
      }

      if (!foundPdf) {
        results.push(`\n${row.title} - ${row.artist}`);
        results.push(...links);
      }
    })
    .on('end', async () => {
      fs.writeFileSync(outputFile, results.join('\n'));
      console.log(`Saved search results to ${outputFile}`);
      await browser.close();
    });
})();

// Function to attempt PDF download
async function downloadPdf(page, url, title) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Find a link to a PDF file
    const pdfLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .map(a => a.href)
        .find(href => href.endsWith('.pdf'));
    });

    if (pdfLink) {
      const pdfPath = path.join(downloadDir, `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      const viewSource = await page.goto(pdfLink);
      fs.writeFileSync(pdfPath, await viewSource.buffer());

      console.log(`📥 Downloaded: ${pdfPath}`);
      return true;
    } else {
      console.log(`❌ No direct PDF link found on: ${url}`);
      return false;
    }
  } catch (error) {
    console.error(`⚠️ Error processing ${url}: ${error.message}`);
    return false;
  }
}
```


---

**3️⃣ Running the Script** 
Run:


```sh
node scrapeAndDownload.js
```
**What It Does:** ✅ Searches Google for each song.
✅ Scrapes the first 5 non-Google links.
✅ If the link **matches a trusted source**  (e.g., MuseScore, IMSLP, 8notes): 
- **Attempts to find and download a PDF file.** 
✅ If **no PDF is found** , saves search results in `search_results.txt`.


---

**4️⃣ Example Outputs** Downloaded PDFs (`pdf_downloads/`)**  
- `Billy_Jean.pdf`
 
- `Brick_House.pdf`
Saved `search_results.txt`** 

```nginx
Billy Jean - Michael Jackson
https://example.com/sheetmusic-billyjean
https://sheetmusicplus.com/scores/billy-jean

Brick House - Commodores
https://musescore.com/sheetmusic/brick-house
https://www.sheetmusicdirect.com/se/ID_No/123456/Product.aspx
```


---

**Customization Options**  
- **Expand `preferredSources`**  if you want to include more trusted websites.
 
- **Increase search results**  from 5 → 10+ if you want a bigger pool.
 
- **Modify the PDF detection logic**  to work with more complex sites.

Would you like any refinements? 🚀

You: 

how do I point the downloads to a specific place on my mac?
const downloadDir = path.join(__dirname, 'pdf_downloads');
I want it to land here:
'/Users/brad/Downloads/_pdf_downloads'

ChatGPT: 

You can directly specify the path where you want the downloads to go by modifying the `downloadDir` variable like this:

```javascript
const downloadDir = '/Users/brad/Downloads/_pdf_downloads';
```
Since `fs-extra` ensures the directory exists before writing, you don't need to modify anything else.**You can directly specify the path where you want the downloads to go by modifying the `downloadDir` variable like this:

```javascript
const downloadDir = '/Users/brad/Downloads/_pdf_downloads';
```
Since `fs-extra` ensures the directory exists before writing, you don't need to modify anything else.Final Version of the `downloadDir` Code** 

```javascript
const fs = require('fs-extra');
const path = require('path');

const downloadDir = '/Users/brad/Downloads/_pdf_downloads';

// Ensure the directory exists
fs.ensureDirSync(downloadDir);
```
This will make sure all downloaded PDFs are saved directly in `/Users/brad/Downloads/_pdf_downloads` instead of the script’s working directory. 🚀
