const fs = require('fs');

const sourceFilePath = 'build/index.html';
const destinationFilePath = 'build/';

const readStream = fs.createReadStream(sourceFilePath);
const files = ['dashboard', 'weather', 'devices', 'users', 'agro', 'profile', 'about', 'login', '404']; // Add the names of the files you want to create here

for (const file of files) {
  const writeStream = fs.createWriteStream(destinationFilePath + file + '.html');

  readStream.on('error', (err) => {
    console.error('Error reading source file:', err);
  });

  writeStream.on('error', (err) => {
    console.error('Error writing to destination file:', err);
  });

  readStream.on('close', () => {
    console.log('File copied successfully!');
  });

  readStream.pipe(writeStream);
}
