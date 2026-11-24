const fs = require('fs');
const path = require('path');

const userUploadedDir = 'C:\\Users\\Saideep\\.gemini\\antigravity-ide\\brain\\a430a7f6-8bdf-4c6c-bd04-eda4dd9dee7b\\.user_uploaded';
const targetPath = path.join(__dirname, 'public', 'hero-bg.jpg');

try {
  const files = fs.readdirSync(userUploadedDir);
  console.log('Files in user_uploaded:', files);
  if (files.length > 0) {
    const latestFile = files[files.length - 1];
    const srcPath = path.join(userUploadedDir, latestFile);
    fs.copyFileSync(srcPath, targetPath);
    console.log('Successfully copied', srcPath, 'to', targetPath);
  }
} catch (err) {
  console.error('Error copying image:', err);
}
