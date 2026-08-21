import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const frontendDist = path.resolve(rootDir, 'frontend/dist');
const rootDist = path.resolve(rootDir, 'dist');
const rootPublic = path.resolve(rootDir, 'public');

try {
  const sourceDir = fs.existsSync(frontendDist) && fs.existsSync(path.join(frontendDist, 'index.html'))
    ? frontendDist
    : fs.existsSync(rootDist) && fs.existsSync(path.join(rootDist, 'index.html'))
      ? rootDist
      : null;

  if (sourceDir) {
    const targets = [frontendDist, rootDist, rootPublic];
    for (const target of targets) {
      if (target !== sourceDir) {
        fs.mkdirSync(target, { recursive: true });
        fs.cpSync(sourceDir, target, { recursive: true });
      }
    }
    console.log(`✅ Synchronized production build to frontend/dist, dist/, and public/`);
  }
} catch (err) {
  console.warn('Sync build warning:', err.message);
}
