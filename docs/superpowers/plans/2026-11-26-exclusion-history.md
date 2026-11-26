# 排除号码逐期历史记录 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在「下期排除参考」下新增逐期历史记录，全量回测每一期预测号码的准确率。

**Architecture:** 纯函数 `exclusionHistory` 复用现有 `exclusionCandidates`，逐期重算预测并与实际开奖比对；浏览器端 `renderHistory` 渲染成滚动表格，数据或数量选择变化时重渲染；最后重跑 `build-static.mjs` 把 `stats.mjs` + `app.mjs` 内联成 `client.js`。

**Tech Stack:** 原生 JS ES 模块；Node 22 内置 `node:test`（无 npm 依赖）；`build-static.mjs` 手工打包。

**Spec:** `docs/superpowers/specs/2026-11-26-exclusion-history-design.md`

## Global Constraints

- 不改预测算法；复用 `stats.mjs` 里现有的 `exclusionCandidates`（`size` 仅允许 5/7/12，已由它强制校验）。
- 「成功」定义：候选号码全部未出现在当期 7 个号码中，与 `backtestExclusions(draws, size, minimumHistory)` 的 `correct` 一致。
- 期号显示格式：`2026${String(issue).padStart(3, '0')}`。
- 打包方式不变：`build-static.mjs` 用 `stats.replaceAll('export function ', 'function ')` 剥离导出，因此新函数必须写成顶层 `export function exclusionHistory(...)` 才能被正确内联。

## Review Focus

- **数据不足 50 期**：`tested = 0` 时表格应为空、顶部显示「0 期」，不得除零。→ Task 1 测试覆盖。
- **`size` 非法值**：`exclusionHistory` 透传 `size` 给 `exclusionCandidates`，非法值应抛错而不是静默返回错数据。→ Task 1 测试覆盖（`assert.throws`）。
- **累计成功率方向**：`cumulativeRate` 按时间正序（第 51 期起）累计，而表格按最新在上展示；列名须写「截至该期累计成功率」以免被误读为「逐期下降」。→ Task 2 文案。
- **命中号码高亮**：`drawn` 中属于 `predicted` 的号码要视觉标出，让「出现 n 个」一眼可查。→ Task 2 CSS `.miss`。
- **数据同步新增期**：`applyDraws` 更新后必须重渲染历史（新一期自动补行），且空数据时不渲染。→ Task 2 渲染挂载点。

---

### Task 1: `exclusionHistory` 纯函数 + 测试

**Files:**
- Modify: `stats.mjs`（在 `backtestExclusions` 之后新增）
- Test: `stats.test.mjs`（新建，项目根目录）

**Interfaces:**
- Consumes: `exclusionCandidates(draws, size, window = 20)`（已有）、`backtestExclusions(draws, size, minimumHistory = 50)`（已有）
- Produces:
  ```js
  export function exclusionHistory(draws, size, minimumHistory = 50) => {
    rows: Array<{
      issue: number,          // 当期期号（不含 2026 前缀）
      drawn: number[],        // 当期 7 个实际号码，保持 parseDraws 的原始顺序
      predicted: number[],    // 该期预测的 size 个不出现号码，保持 exclusionCandidates 顺序
      hit: number[],          // predicted ∩ drawn（命中的号码）
      ok: boolean,            // hit.length === 0
      cumulativeRate: number  // 截至本期（含）的累计成功率 = 累计正确 / 已测期数，∈ [0,1]
    }>,
    tested: number,   // rows.length = draws.length - minimumHistory（负数按 0 处理）
    correct: number,
    rate: number      // tested ? correct / tested : 0
  }
  ```
  实现与 `backtestExclusions` 相同的切片：`const ordered = [...draws].sort((a,b)=>a.issue-b.issue)`，从 `i = minimumHistory` 起，用 `ordered.slice(0, i)` 算候选。

- [ ] **Step 1: 写失败测试** —— 新建 `stats.test.mjs`

```js
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
```

- [ ] **Step 2: 跑测试确认失败**

Run: `node --test stats.test.mjs`
Expected: FAIL（`exclusionHistory is not a function` / `undefined`）

- [ ] **Step 3: 实现 `exclusionHistory` 于 `stats.mjs`**

在 `backtestExclusions` 之后新增顶层 `export function exclusionHistory(draws, size, minimumHistory = 50)`，按 Interfaces 的返回结构实现；`predicted` 用 `exclusionCandidates(...).map(({ number }) => number)`，`hit = predicted.filter((n) => numbers.includes(n))`，`drawn = ordered[i].numbers`。

- [ ] **Step 4: 跑测试确认通过**

Run: `node --test stats.test.mjs`
Expected: PASS（5 个测试全绿）

- [ ] **Step 5: 提交**

```bash
git add stats.mjs stats.test.mjs
git commit -m "feat: 新增 exclusionHistory 逐期回测纯函数与测试"
```

---

### Task 2: 渲染 + HTML + CSS

**Files:**
- Modify: `app.mjs`（新增 `renderHistory` 及两处挂载）
- Modify: `index.html`（新增 `<details class="history">` 区块与样式）

**Interfaces:**
- Consumes: `exclusionHistory(state.draws, state.size)`（Task 1）、现有 `numberBall(number, cls)`、`formatNumber`
- Produces: DOM ids —— `history-tested`、`history-correct`、`history-rate`、`history-rows`

- [ ] **Step 1: 在 `index.html` 加区块** —— 紧接 `.recommend` 的 `</section>` 之后、`<section class="transitions">` 之前插入：

```html
<details class="history" id="history-detail">
  <summary class="detail-toggle">查看逐期历史记录（监测成功率）</summary>
  <section class="history-panel" aria-label="逐期历史记录">
    <p class="history-summary">共测试 <strong id="history-tested">--</strong> 期 · 成功 <strong id="history-correct">--</strong> 期 · 成功率 <strong id="history-rate">--</strong></p>
    <div class="history-table-wrap">
      <table class="history-table">
        <thead><tr><th>期号</th><th>预测的不出现号码</th><th>实际开出</th><th>结果</th><th>截至该期累计成功率</th></tr></thead>
        <tbody id="history-rows"></tbody>
      </table>
    </div>
  </section>
</details>
```

- [ ] **Step 2: 在 `index.html` 加样式** —— 在 `.recommend` 相关样式后加（关键值）：

```css
.history { margin-bottom: 22px; }
.history-panel { padding: 20px 24px; }
.history-summary { font-size: 13px; color: #5d7074; margin: 0 0 14px; }
.history-summary strong { color: #147966; }
.history-table-wrap { max-height: 520px; overflow-y: auto; border: 1px solid #e3ebe8; }
.history-table { min-width: 620px; }
.history-table td, .history-table th { height: 40px; padding: 0 12px; white-space: nowrap; }
.history-table tbody tr.ok td { background: #f4faf7; }
.history-table tbody tr.fail td { background: #fdf5f3; }
.history-ball { width: 30px; height: 30px; }
.history-ball .n { font-size: 12px; }
.history-ball .z { font-size: 8px; }
.history-ball.miss { outline: 2px solid #d64545; outline-offset: 1px; }
```

- [ ] **Step 3: 在 `app.mjs` 新增 `renderHistory`**

在 `renderOverlap` 之后新增。逻辑：取 `const history = exclusionHistory(state.draws, state.size)`，写入顶部三个 id；`history-rows` 用 `[...history.rows].reverse()`（最新在上）逐行生成 `<tr class="ok|fail">`，五列分别是：期号标签、预测号码球、实际开出号码球（命中者加 `miss` 类）、结果文案（`✓ 全部没出现` 或 `✗ 出现 n 个`）、累计成功率百分比。号码球复用 `numberBall(n, 'history-ball' + (miss ? ' miss' : ''))`。`state.draws` 为空时直接 `return`。

- [ ] **Step 4: 挂载两处调用**

`app.mjs` 的 `applyDraws` 里，在 `renderColdNumbers();` 之后加 `renderHistory();`；`.size-button` 点击处理器里，在 `renderRecommendation();` 之后加 `renderHistory();`。

- [ ] **Step 5: 提交**

```bash
git add app.mjs index.html
git commit -m "feat: 渲染逐期历史记录区块"
```

---

### Task 3: 打包 + 验证

**Files:**
- Regenerate: `client.js`

- [ ] **Step 1: 重新打包**

Run: `node build-static.mjs`
Expected: 输出 `client.js 已生成：N 期`，无报错。

- [ ] **Step 2: 验证内联结果**

Run: `node -e "const s=require('fs').readFileSync('client.js','utf8'); for (const k of ['function exclusionHistory','history-rows','renderHistory']) if(!s.includes(k)) throw new Error('缺少 '+k); console.log('OK')"`
Expected: `OK`

- [ ] **Step 3: 浏览器验证**

Run: `node server.mjs` 后打开 `http://127.0.0.1:3000`，展开「查看逐期历史记录」：
- 顶部「共测试 / 成功 / 成功率」与右侧「历史回测」的 `correct/rate` 一致；
- 表格最新一期在最上，每行「结果」为 ✓/✗，命中号码带红框；
- 切换 5/7/12 数量按钮后表格随之更新；累计成功率列末行（最早一期）为较低的历史值、首行（最新一期）为总成功率。

- [ ] **Step 4: 提交**

```bash
git add client.js
git commit -m "chore: 重新打包 client.js"
```
