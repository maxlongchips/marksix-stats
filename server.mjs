import { createServer } from 'node:http';
import { readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseDraws } from './stats.mjs';
import { mergeDrawRows, nextBeijingSyncAt } from './sync.mjs';
import { writeClientBundle } from './build-static.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dataPath = join(root, 'test.json');
const sourceUrl = 'https://history.macaumarksix.com/history/macaujc2/y/2026';
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/client.js', ['client.js', 'text/javascript; charset=utf-8']],
  ['/stats.mjs', ['stats.mjs', 'text/javascript; charset=utf-8']],
  ['/sync.mjs', ['sync.mjs', 'text/javascript; charset=utf-8']],
  ['/test.json', ['test.json', 'application/json; charset=utf-8']],
]);

const port = Number(process.env.PORT || 3000);
let rows = JSON.parse(await readFile(dataPath, 'utf8'));
parseDraws(rows);
await writeClientBundle(rows);
let lastSyncedAt = null;
let lastError = null;
let syncing = false;
let nextSyncAt = nextBeijingSyncAt().toISOString();

async function syncLatest() {
  if (syncing) return;
  syncing = true;
  try {
    const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(20000), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`接口 HTTP ${response.status}`);
    const updated = mergeDrawRows(rows, await response.json());
    if (JSON.stringify(updated) !== JSON.stringify(rows)) {
      const tempPath = `${dataPath}.tmp`;
      await writeFile(tempPath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
      await rename(tempPath, dataPath);
      rows = updated;
      await writeClientBundle(rows);
      console.log(`数据已更新：${rows[0].expect}，共 ${rows.length} 期`);
    }
    lastSyncedAt = new Date().toISOString();
    lastError = null;
  } catch (error) {
    const cause = error.cause;
    lastError = cause?.code ? `${cause.code}: ${cause.message || error.message}` : cause?.message || error.message;
    console.error(`同步失败：${lastError}`);
  } finally {
    syncing = false;
  }
}

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/api/draws') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ data: rows, lastSyncedAt, lastError, syncing, nextSyncAt }));
    return;
  }
  const file = files.get(pathname);
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const body = await readFile(join(root, file[0]));
    response.writeHead(200, { 'Content-Type': file[1], 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(500); response.end('Unable to read file');
  }
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}`));

function scheduleNextSync() {
  const next = nextBeijingSyncAt();
  nextSyncAt = next.toISOString();
  setTimeout(async () => {
    await syncLatest();
    scheduleNextSync();
  }, next.getTime() - Date.now());
  console.log(`下次同步：${nextSyncAt}（北京时间 22:00）`);
}

scheduleNextSync();
