import { readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseDraws } from './stats.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const outputPath = join(root, 'client.js');

export async function writeClientBundle(rows) {
  parseDraws(rows);
  const stats = await readFile(join(root, 'stats.mjs'), 'utf8');
  const app = await readFile(join(root, 'app.mjs'), 'utf8');
  const firstLine = app.split('\n', 1)[0];
  if (!firstLine.includes("from './stats.mjs'")) throw new Error('找不到客户端统计模块导入');
  const script = '(() => {\nconst DRAW_ROWS = ' + JSON.stringify(rows) + ';\n'
    + stats.replaceAll('export function ', 'function ') + '\n'
    + app.slice(firstLine.length + 1) + '\n})();\n';
  const tempPath = outputPath + '.tmp';
  await writeFile(tempPath, script, 'utf8');
  await rename(tempPath, outputPath);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const rows = JSON.parse(await readFile(join(root, 'test.json'), 'utf8'));
  await writeClientBundle(rows);
  console.log('client.js 已生成：' + rows.length + ' 期');
}
