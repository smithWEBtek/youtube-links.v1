const fs = require('fs');
const path = require('path');
// const mm = require('music-metadata'); // Ensure this is imported correctly

// const DIRECTORY = './mp3_downloads'; // Change to your actual folder path
const DIRECTORY = '/Users/brad/Music/Downloaded by MediaHuman'; // Change to your actual folder path

async function renameMp3Files() {
  const mm = await import('music-metadata'); // Dynamic import
  const files = fs.readdirSync(DIRECTORY).filter(file => file.endsWith('.mp3'));

  for (const file of files) {
    const filePath = path.join(DIRECTORY, file);

    try {
      const metadata = await mm.parseFile(filePath);
      const title = metadata.common.title;

      if (title) {
        const newFileName = `${title}.mp3`;
        const newFilePath = path.join(DIRECTORY, newFileName);

        if (!fs.existsSync(newFilePath)) { // Avoid overwriting
          fs.renameSync(filePath, newFilePath);
          console.log(`Renamed: ${file} → ${newFileName}`);
        } else {
          console.log(`Skipping: ${newFileName} (already exists)`);
        }
      } else {
        console.log(`Skipping: ${file} (No title metadata found)`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  console.log('Renaming complete!');
}

renameMp3Files();