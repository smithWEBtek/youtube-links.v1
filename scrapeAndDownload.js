const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs-extra');
const path = require('path');

puppeteer.use(StealthPlugin());

const downloadDir = '/Users/brad/Downloads/_pdf_downloads';
fs.ensureDirSync(downloadDir);

const allowedSites = ['scribd.com', 'imslp.org', 'musescore.com']; // Trusted sites

const songs = [
  { title: "Stacy's Mom", artist: "Fountains of Wayne" },
  { title: "Faith", artist: "George Michael" },
];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set a real User-Agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  const searchResults = [];

  for (const song of songs) {
    const query = `${song.artist} ${song.title} pdf`;
    const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;

    console.log(`Searching: ${searchUrl}`);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    // Replace waitForTimeout with a manual delay
    await new Promise(r => setTimeout(r, 3000 + Math.random() * 2000)); // 3-5 sec delay

    const links = await page.$$eval('a.result__a', anchors => anchors.map(a => a.href));
    if (links.length > 0) {
      const firstLink = links[0];
      searchResults.push({ title: song.title, artist: song.artist, url: firstLink });

      // Check if the link is from an allowed site
      const isAllowed = allowedSites.some(site => firstLink.includes(site));
      if (isAllowed) {
        console.log(`Downloading: ${firstLink}`);
        const pdfPage = await browser.newPage();
        await pdfPage.goto(firstLink, { waitUntil: 'domcontentloaded' });

        // Simulate waiting for download (manual delay again)
        await new Promise(r => setTimeout(r, 5000));
        await pdfPage.close();
      }
    }
  }

  fs.writeFileSync('search_results_non-downloaded.txt', JSON.stringify(searchResults, null, 2));
  console.log('Saved search results to search_results_non-downloaded.txt');

  await browser.close();
})();
