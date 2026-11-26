import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('./app.mjs', import.meta.url), 'utf8');

test('index.html: 号码球基础选择器都包含 .history-ball', () => {
  const rules = [
    /\.number-badge\s*,\s*\.candidate-ball[^{]*\{[^}]*border-radius:\s*50%/,
    /\.number-badge\s*\.n\s*,\s*\.candidate-ball\s*\.n[^{]*\{/,
    /\.number-badge\s*\.z\s*,\s*\.candidate-ball\s*\.z[^{]*\{/,
  ];
  for (const pattern of rules) {
    const rule = html.match(pattern);
    assert.ok(rule, `未找到规则：${pattern}`);
    assert.match(rule[0], /\.history-ball/, `规则缺少 .history-ball：${rule[0]}`);
  }
});

test('app.mjs: 导入列表包含 exclusionHistory', () => {
  const firstLine = app.split('\n', 1)[0];
  assert.match(firstLine, /from '\.\/stats\.mjs'/);
  assert.match(firstLine, /exclusionHistory/);
});

test('index.html: 历史记录区块默认展开', () => {
  assert.match(html, /<details class="history"[^>]*\bopen\b/);
});
