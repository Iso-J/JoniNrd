import fs from 'fs';
import path from'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, '../data/db.json');
const dest = path.resolve(__dirname, '../public/data/db.json');

fs.copyFile(src, dest, (err) => {
  if (err) {
    console.error('Error copying file:', err);
  } else {
    console.log('db.json copied to public/data');
  }
});
