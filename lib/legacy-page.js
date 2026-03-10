import fs from 'node:fs';
import path from 'node:path';

export function getLegacyHomeMarkup() {
  const legacyIndexPath = path.join(process.cwd(), 'index.html');
  const html = fs.readFileSync(legacyIndexPath, 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    throw new Error('Unable to locate body markup in index.html');
  }

  return bodyMatch[1]
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .trim();
}
