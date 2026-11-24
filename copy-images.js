const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\Saideep\\.gemini\\antigravity-ide\\brain\\c7abc5ba-66c9-4274-b22b-a6b46ba0ed13';
const userUploadedDir = 'C:\\Users\\Saideep\\.gemini\\antigravity-ide\\brain\\a430a7f6-8bdf-4c6c-bd04-eda4dd9dee7b\\.user_uploaded';
const placesDir = path.join(__dirname, 'client', 'public', 'places');

if (!fs.existsSync(placesDir)) {
  fs.mkdirSync(placesDir, { recursive: true });
}

const files = fs.readdirSync(artifactDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
console.log('Found artifact images:', files);

const mappings = [
  { prefix: 'kalsubai_peak', dest: 'kalsubai.jpg' },
  { prefix: 'bhandardara_lake', dest: 'bhandardara.jpg' },
  { prefix: 'sandhan_valley', dest: 'sandhan-valley.jpg' },
  { prefix: 'kokankada_cliff', dest: 'harishchandragad.jpg' },
  { prefix: 'ratangad_nedhe', dest: 'ratangad.jpg' },
  { prefix: 'randha_falls', dest: 'randha-falls.jpg' },
  { prefix: 'amruteshwar_temple', dest: 'amruteshwar.jpg' },
  { prefix: 'amk_expedition', dest: 'amk-trek.jpg' },
  { prefix: 'seed_bank_rural', dest: 'seed-bank.jpg' },
  { prefix: 'fofsandi_valley', dest: 'fofsandi.jpg' },
  { prefix: 'ajoba_parvat', dest: 'ajoba-parvat.jpg' },
  { prefix: 'samrad_camping', dest: 'samrad-camping.jpg' }
];

mappings.forEach(m => {
  const match = files.find(f => f.startsWith(m.prefix));
  if (match) {
    fs.copyFileSync(path.join(artifactDir, match), path.join(placesDir, m.dest));
    console.log(`✅ Successfully copied ${match} -> ${m.dest}`);
  } else {
    console.warn(`⚠️ No match found for prefix: ${m.prefix}`);
  }
});

// Also check umbrella falls
const umbrellaSrc = path.join(userUploadedDir, 'media_1787552062320.jpg');
if (fs.existsSync(umbrellaSrc)) {
  fs.copyFileSync(umbrellaSrc, path.join(placesDir, 'umbrella-falls.jpg'));
  console.log('✅ Copied umbrella-falls.jpg');
} else {
  // Check if umbrella-falls.jpg already in client/public
  const pubUmbrella = path.join(__dirname, 'client', 'public', 'umbrella-falls.jpg');
  if (fs.existsSync(pubUmbrella)) {
    fs.copyFileSync(pubUmbrella, path.join(placesDir, 'umbrella-falls.jpg'));
    console.log('✅ Copied umbrella-falls.jpg from public');
  }
}

console.log('🎉 All authentic images copied to client/public/places!');
