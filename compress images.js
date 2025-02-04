const sharp = require('sharp');
const { globSync } = require('glob');
const fs = require('fs');

// Create dist folder structure
if (!fs.existsSync('dist')) fs.mkdirSync('dist');
if (!fs.existsSync('dist/images')) fs.mkdirSync('dist/images');

// Process images
globSync('src/images/*.{jpg,png}').forEach(file => {
  const outputPath = file
    .replace('src/', 'dist/')
    .replace(/\..+$/, '.webp');

  sharp(file)
    .webp({ quality: 80 })
    .resize(1200)
    .toFile(outputPath)
    .catch(err => console.error(`Error processing ${file}:`, err));
});

// Copy other files
['*.html', 'styles.css', 'scripts', '_headers'].forEach(pattern => {
  globSync(`src/${pattern}`).forEach(file => {
    const dest = file.replace('src/', 'dist/');
    fs.cpSync(file, dest, { recursive: true });
  });
});