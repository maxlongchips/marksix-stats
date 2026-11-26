import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDraws, exclusionHistory, exclusionCandidates, backtestExclusions } from './stats.mjs';

const draws = parseDraws(JSON.parse(readFileSync(new URL('./test.json', import.meta.url), 'utf8')));
const size = 5, min = 50;

test('exclusionHistory: 与 backtest 的 correct/rate 一致', () => {
  const h = exclusionHistory(draws, size, min);
  const b = backtestExclusions(draws, size, min);
  assert.equal(h.tested, draws.length - min);
  assert.equal(h.rows.length, h.tested);
  assert.equal(h.correct, b.correct);
  assert.equal(h.rate, b.rate);
});

test('exclusionHistory: 每期只用到该期之前的记录（无未来数据）', () => {
  const ordered = [...draws].sort((a, b) => a.issue - b.issue);
  const h = exclusionHistory(draws, size, min);
  h.rows.forEach((row, index) => {
    const i = min + index;
    assert.equal(row.issue, ordered[i].issue);
    assert.deepEqual(row.predicted, exclusionCandidates(ordered.slice(0, i), size).map(({ number }) => number));
  });
});

test('exclusionHistory: hit/ok/cumulativeRate 自洽', () => {
  const h = exclusionHistory(draws, size, min);
  let correct = 0;
  h.rows.forEach((row, index) => {
    assert.deepEqual(row.hit, row.predicted.filter((n) => row.drawn.includes(n)));
    assert.equal(row.ok, row.hit.length === 0);
    if (row.ok) correct++;
    assert.equal(row.cumulativeRate, correct / (index + 1));
  });
  assert.equal(correct, h.correct);
  assert.equal(h.rows.at(-1).cumulativeRate, h.rate);
});

test('exclusionHistory: 数据不足 50 期时为空且不除零', () => {
  const h = exclusionHistory(draws.slice(0, 20), size, 50);
  assert.deepEqual(h, { rows: [], tested: 0, correct: 0, rate: 0 });
});

test('exclusionHistory: 非法 size 抛错', () => {
  assert.throws(() => exclusionHistory(draws, 6), /候选数量必须是 5、7 或 12/);
});
