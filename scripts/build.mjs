import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const file of ['index.html', 'styles.css', 'app.js', 'theme.js', 'controls.js', 'assets', 'design', 'presentations']) await cp(file, `dist/${file}`, { recursive: true });

// Missing files must be 404 responses, not the homepage.
await writeFile('dist/404.html', '<!doctype html><meta charset="utf-8"><title>404</title>');
