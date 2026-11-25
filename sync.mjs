import { parseDraws } from './stats.mjs';

export function nextBeijingSyncAt(now = new Date()) {
  const beijingNow = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const target = Date.UTC(beijingNow.getUTCFullYear(), beijingNow.getUTCMonth(),
    beijingNow.getUTCDate(), 14);
  return new Date(target > now.getTime() ? target : target + 24 * 60 * 60 * 1000);
}

export function mergeDrawRows(existing, response) {
  if (!response || !Array.isArray(response.data)) throw new Error('接口响应缺少 data 数组');
  const incoming = response.data
    .filter(({ expect }) => /^2026\d{3}$/.test(expect))
    .map(({ expect, openCode }) => ({ expect, openCode }));
  parseDraws(incoming);
  const combined = new Map(existing.map((row) => [row.expect, row]));
  for (const row of incoming) combined.set(row.expect, row);
  const rows = [...combined.values()].sort((a, b) => Number(b.expect) - Number(a.expect));
  parseDraws(rows);
  return rows;
}
