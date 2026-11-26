import { parseDraws, summarize, exclusionCandidates, backtestExclusions, adjacentOverlap, zodiacFor, zodiacElement } from './stats.mjs';

const $ = (id) => document.getElementById(id);
const formatNumber = (value) => String(value).padStart(2, '0');
const ELEMENT_CLASS = { 金: 'metal', 木: 'wood', 水: 'water', 火: 'fire', 土: 'earth' };
function numberBall(number, cls = 'number-badge') {
  const zodiac = zodiacFor(number);
  const element = zodiacElement(zodiac);
  return `<span class="${cls} el-${ELEMENT_CLASS[element]}" title="${zodiac} · ${element}"><span class="n">${formatNumber(number)}</span><span class="z">${zodiac}</span></span>`;
}
const state = { draws: [], sort: 'number', descending: false, size: 12 };

function renderRecommendation() {
  if (!state.draws.length) return;
  const maxIssue = Math.max(...state.draws.map(({ issue }) => issue));
  const candidates = exclusionCandidates(state.draws, state.size);
  const result = backtestExclusions(state.draws, state.size);
  $('target-issue').textContent = `2026${String(maxIssue + 1).padStart(3, '0')}`;
  $('candidate-count').textContent = state.size;
  $('candidate-list').innerHTML = candidates.map(({ number }) => numberBall(number, 'candidate-ball')).join('');
  $('candidate-evidence').innerHTML = candidates.map(({ number, recent, overall }) =>
    `<tr><td>${numberBall(number)}</td><td>${recent} 次</td><td>${overall} 次</td></tr>`
  ).join('');
  $('backtest-result').textContent = `${result.correct} / ${result.tested} 期`;
  $('backtest-rate').textContent = `${(result.rate * 100).toFixed(1)}%`;
  $('random-rate').textContent = `${(result.baseline * 100).toFixed(1)}%`;
  $('per-number-rate').textContent = `${(result.perNumberRate * 100).toFixed(1)}%`;
  $('per-number-baseline').textContent = `${(result.perNumberBaseline * 100).toFixed(1)}%`;
  $('z-score').textContent = Number.isFinite(result.z) ? result.z.toFixed(2) : '--';
  $('significance').textContent = significanceLabel(result.z);
  document.querySelectorAll('.size-button').forEach((button) => {
    const selected = Number(button.dataset.size) === state.size;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function renderOverlap() {
  const result = adjacentOverlap(state.draws);
  if (!result.previous) return;
  const issueLabel = (issue) => `2026${String(issue).padStart(3, '0')}`;
  $('overlap-current-issue').textContent = issueLabel(result.latest.issue);
  $('overlap-previous-issue').textContent = issueLabel(result.previous.issue);
  $('overlap-current-numbers').textContent = result.latest.numbers.map(formatNumber).join(' · ');
  $('overlap-previous-numbers').textContent = result.previous.numbers.map(formatNumber).join(' · ');
  $('overlap-current-count').textContent = `${result.repeated.length} 个`;
  $('overlap-current-list').textContent = result.repeated.length ? result.repeated.map(formatNumber).join('、') : '没有重号';
  $('overlap-zero-count').textContent = `${result.histogram[0]} / ${result.pairs}`;
  $('overlap-zero-rate').textContent = `${(result.histogram[0] / result.pairs * 100).toFixed(1)}%`;
  $('overlap-any-count').textContent = `${result.pairs - result.histogram[0]} / ${result.pairs}`;
  $('overlap-after-zero').textContent = `${result.afterZeroNoRepeat} / ${result.afterZeroTests}`;
  $('overlap-after-zero-rate').textContent = `${(result.afterZeroNoRepeat / result.afterZeroTests * 100).toFixed(1)}%`;
  $('overlap-random-rate').textContent = `${(result.baselineNoRepeat * 100).toFixed(1)}%`;
  $('overlap-special-rate').textContent = `${(result.specialRepeat / result.pairs * 100).toFixed(1)}%`;
  $('overlap-special-random').textContent = `${(result.specialBaseline * 100).toFixed(1)}%`;
}

function renderHistory() {
  if (!state.draws.length) return;
  const history = exclusionHistory(state.draws, state.size);
  $('history-tested').textContent = history.tested;
  $('history-correct').textContent = history.correct;
  $('history-rate').textContent = `${(history.rate * 100).toFixed(1)}%`;
  $('history-rows').innerHTML = [...history.rows].reverse().map((row) => {
    const issue = `2026${String(row.issue).padStart(3, '0')}`;
    const predicted = row.predicted.map((number) => numberBall(number, 'history-ball')).join('');
    const drawn = row.drawn.map((number) => numberBall(number, 'history-ball' + (row.hit.includes(number) ? ' miss' : ''))).join('');
    const result = row.ok ? '✓ 全部没出现' : `✗ 出现 ${row.hit.length} 个`;
    const rate = `${(row.cumulativeRate * 100).toFixed(1)}%`;
    return `<tr class="${row.ok ? 'ok' : 'fail'}"><td>${issue}</td><td>${predicted}</td><td>${drawn}</td><td>${result}</td><td>${rate}</td></tr>`;
  }).join('');
}

function renderCurrentHeat() {
  const latest = [...state.draws].sort((a, b) => b.issue - a.issue)[0];
  if (!latest) return;
  const first = Math.min(...state.draws.map(({ issue }) => issue));
  const all = summarize(state.draws, first, latest.issue).counts;
  const recent = summarize(state.draws, Math.max(first, latest.issue - 19), latest.issue).counts;
  const selected = latest.numbers.map((number) => ({ number, all: all[number - 1].all, recent: recent[number - 1].all, last: all[number - 1].last }));
  const hottest = [...selected].sort((a, b) => b.all - a.all || a.number - b.number)[0];
  $('heat-issue').textContent = `2026${String(latest.issue).padStart(3, '0')}`;
  $('heat-total-draws').textContent = state.draws.length;
  $('heat-top-number').textContent = formatNumber(hottest.number);
  $('heat-top-count').textContent = hottest.all;
  $('heat-rows').innerHTML = selected.map(({ number, all: total, recent: last20, last }, index) =>
    `<tr${index === 6 ? ' class="special-row"' : ''}><td>${numberBall(number)}${index === 6 ? '<span class="special-tag">本期末位</span>' : ''}</td><td><strong>${total}</strong> 次</td><td><strong>${last20}</strong> 次</td><td><strong>${last}</strong> 次</td></tr>`
  ).join('');
}

function renderColdNumbers() {
  const issues = state.draws.map(({ issue }) => issue);
  if (!issues.length) return;
  const first = Math.min(...issues);
  const latest = Math.max(...issues);
  const { counts } = summarize(state.draws, first, latest);
  const cold = [...counts].sort((a, b) => a.all - b.all || a.number - b.number).slice(0, 20);
  $('cold-list').innerHTML = cold.map(({ number, all }) =>
    `<div class="cold-item">${numberBall(number)}<span class="cold-count">${all} 次</span></div>`
  ).join('');
}

function showError(message) {
  $('error').textContent = message;
  $('error').hidden = false;
}

function hideError() { $('error').hidden = true; }

function significanceLabel(z) {
  if (!Number.isFinite(z)) return '';
  const abs = Math.abs(z);
  if (abs >= 1.96) return z > 0 ? '显著优于随机（p < 0.05）' : '显著劣于随机（p < 0.05）';
  return '与随机无显著差异（p ≥ 0.05）';
}

function rankMarkup(rows, key, max) {
  return [...rows].sort((a, b) => b[key] - a[key] || a.number - b.number).slice(0, 5).map((row, index) =>
    `<div class="rank-row"><span class="rank">${String(index + 1).padStart(2, '0')}</span><span class="rank-number">${formatNumber(row.number)}</span><span class="track"><span class="fill ${key === 'last' ? 'last' : ''}" style="width:${max ? row[key] / max * 100 : 0}%"></span></span><span class="rank-count">${row[key]}</span></div>`
  ).join('');
}

function render() {
  if (!state.draws.length) return;
  const start = Number($('issue-start').value);
  const end = Number($('issue-end').value);
  const maxIssue = Math.max(...state.draws.map(({ issue }) => issue));
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end > maxIssue || start > end) {
    showError(`请输入有效期号范围：1 至 ${maxIssue}，起始期号不能大于结束期号。`);
    return;
  }
  const query = $('search').value.trim();
  if (query && (!/^\d{1,2}$/.test(query) || Number(query) < 1 || Number(query) > 49)) {
    showError('查找号码请输入 01 至 49。');
    return;
  }
  hideError();
  const { drawCount, counts } = summarize(state.draws, start, end);
  const allMax = Math.max(...counts.map((row) => row.all));
  const lastMax = Math.max(...counts.map((row) => row.last));
  const top = [...counts].sort((a, b) => b.all - a.all || a.number - b.number)[0];
  $('draw-count').textContent = drawCount.toLocaleString('zh-CN');
  $('all-count').textContent = (drawCount * 7).toLocaleString('zh-CN');
  $('last-count').textContent = drawCount.toLocaleString('zh-CN');
  $('issue-range').textContent = `2026${String(start).padStart(3, '0')} – 2026${String(end).padStart(3, '0')}`;
  $('top-number').textContent = drawCount ? formatNumber(top.number) : '--';
  $('top-count').textContent = drawCount ? `${top.all} 次` : '无记录';

  const ordered = counts.filter((row) => !query || row.number === Number(query)).sort((a, b) => {
    const diff = a[state.sort] - b[state.sort];
    return (state.descending ? -diff : diff) || a.number - b.number;
  });
  $('number-rows').innerHTML = ordered.map((row) => `<tr><td class="number">${numberBall(row.number)}</td><td class="bar-cell"><div class="bar-line"><span class="value">${row.all}</span><span class="track"><span class="fill" style="width:${allMax ? row.all / allMax * 100 : 0}%"></span></span></div></td><td class="bar-cell"><div class="bar-line"><span class="value">${row.last}</span><span class="track"><span class="fill last" style="width:${lastMax ? row.last / lastMax * 100 : 0}%"></span></span></div></td></tr>`).join('');
  $('all-rank').innerHTML = rankMarkup(counts, 'all', allMax);
  $('last-rank').innerHTML = rankMarkup(counts, 'last', lastMax);
}

document.querySelectorAll('.sort').forEach((button) => button.addEventListener('click', () => {
  const key = button.dataset.sort;
  state.descending = state.sort === key ? !state.descending : key !== 'number';
  state.sort = key;
  document.querySelectorAll('.sort').forEach((item) => {
    item.classList.toggle('active', item === button);
    item.querySelector('.sort-mark').textContent = item === button ? (state.descending ? '↓' : '↑') : '';
  });
  render();
}));

document.querySelectorAll('.size-button').forEach((button) => button.addEventListener('click', () => {
  state.size = Number(button.dataset.size);
  renderRecommendation();
  renderHistory();
}));

['issue-start', 'issue-end', 'search'].forEach((id) => $(id).addEventListener('input', render));
$('reset').addEventListener('click', () => {
  $('issue-start').value = 1;
  $('issue-end').value = Math.max(...state.draws.map(({ issue }) => issue));
  $('search').value = '';
  render();
});

const API_URL = 'https://history.macaumarksix.com/history/macaujc2/y/2026';

function applyDraws(updated, sourceLabel) {
  const previousMax = state.draws.length ? Math.max(...state.draws.map(({ issue }) => issue)) : 0;
  const maxIssue = Math.max(...updated.map(({ issue }) => issue));
  const changed = JSON.stringify(state.draws) !== JSON.stringify(updated);
  const wasAtLatest = !previousMax || Number($('issue-end').value) === previousMax;
  state.draws = updated;
  $('issue-start').max = maxIssue;
  $('issue-end').max = maxIssue;
  if (wasAtLatest) $('issue-end').value = maxIssue;
  $('source-status').textContent = `${state.draws.length} 期 · 最新 2026${String(maxIssue).padStart(3, '0')} · ${sourceLabel}`;
  if (changed) {
    renderRecommendation();
    renderCurrentHeat();
    renderOverlap();
    renderColdNumbers();
    renderHistory();
    render();
  }
}

async function fetchRemoteDraws() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(API_URL, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`接口 HTTP ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : payload && payload.data;
    if (!Array.isArray(rows)) throw new Error('接口响应缺少 data 数组');
    const thisYear = rows.filter(({ expect }) => /^2026\d{3}$/.test(expect));
    return parseDraws(thisYear.map(({ expect, openCode }) => ({ expect, openCode })));
  } finally {
    clearTimeout(timer);
  }
}

async function updatePage() {
  const source = document.querySelector('.source');
  try {
    applyDraws(await fetchRemoteDraws(), '接口实时数据');
    source.classList.remove('failed');
  } catch (error) {
    try {
      applyDraws(parseDraws(DRAW_ROWS), '接口失败，已降级本地数据');
      source.classList.add('failed');
      console.warn('接口请求失败，已降级到本地数据：', error);
    } catch (fallbackError) {
      $('source-status').textContent = '数据读取失败';
      source.classList.add('failed');
      showError(`无法读取数据：${fallbackError.message}`);
    }
  }
}

updatePage();
