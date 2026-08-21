import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const publicPath = path.resolve('public');
const frontendDist = path.resolve('frontend/dist');

try {
  if (fs.existsSync(distPath)) {
    fs.cpSync(distPath, publicPath, { recursive: true });
    fs.cpSync(distPath, frontendDist, { recursive: true });
    console.log('✅ Synchronized build artifacts to dist/, public/, and frontend/dist/');
  }
} catch (err) {
  console.warn('Sync build warning:', err.message);
}
