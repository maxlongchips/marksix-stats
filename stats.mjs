export function parseDraws(rows) {
  if (!Array.isArray(rows)) throw new Error('数据必须是记录数组。');
  const issues = new Set();
  return rows.map((row) => {
    const match = /^2026(\d{3})$/.exec(row?.expect);
    const parts = typeof row?.openCode === 'string' ? row.openCode.split(',') : [];
    const numbers = parts.map((part) => Number(part));
    if (!match || parts.length !== 7 || parts.some((part) => !/^\d{2}$/.test(part)) || numbers.some((number) => number < 1 || number > 49) || new Set(numbers).size !== 7 || issues.has(row.expect)) {
      throw new Error(`记录格式有误：${row?.expect ?? '未知期号'}`);
    }
    issues.add(row.expect);
    return { issue: Number(match[1]), numbers };
  });
}

export function summarize(draws, start, end) {
  const selected = draws.filter(({ issue }) => issue >= start && issue <= end);
  const counts = Array.from({ length: 49 }, (_, index) => ({ number: index + 1, all: 0, last: 0 }));
  for (const { numbers } of selected) {
    for (const number of numbers) counts[number - 1].all++;
    counts[numbers[6] - 1].last++;
  }
  return { drawCount: selected.length, counts };
}

// 并列（recent 与 overall 都相同）时用确定性的伪随机哈希打破平局，避免系统性地偏向小号
function tieKey(number) {
  return (Math.imul(number, 2654435761) ^ Math.imul(number, 40503)) >>> 0;
}

export function exclusionCandidates(draws, size, window = 20) {
  if (![5, 7, 12].includes(size)) throw new Error('候选数量必须是 5、7 或 12。');
  const history = [...draws].sort((a, b) => a.issue - b.issue);
  const recent = history.slice(-window);
  const overall = Array(49).fill(0);
  const recentCounts = Array(49).fill(0);
  for (const { numbers } of history) for (const number of numbers) overall[number - 1]++;
  for (const { numbers } of recent) for (const number of numbers) recentCounts[number - 1]++;
  return Array.from({ length: 49 }, (_, index) => ({
    number: index + 1,
    recent: recentCounts[index],
    overall: overall[index],
    key: tieKey(index + 1),
  })).sort((a, b) => a.recent - b.recent || a.overall - b.overall || a.key - b.key).slice(0, size);
}

export function backtestExclusions(draws, size, minimumHistory = 50) {
  const ordered = [...draws].sort((a, b) => a.issue - b.issue);
  let correct = 0;
  let avoided = 0;
  const tested = Math.max(0, ordered.length - minimumHistory);
  for (let i = minimumHistory; i < ordered.length; i++) {
    const candidates = exclusionCandidates(ordered.slice(0, i), size);
    const numbers = ordered[i].numbers;
    if (candidates.every(({ number }) => !numbers.includes(number))) correct++;
    avoided += candidates.reduce((sum, { number }) => sum + (numbers.includes(number) ? 0 : 1), 0);
  }
  const baseline = Array.from({ length: 7 }, (_, index) => (49 - size - index) / (49 - index))
    .reduce((product, term) => product * term, 1);
  const rate = tested ? correct / tested : 0;
  const se = tested ? Math.sqrt(baseline * (1 - baseline) / tested) : 0;
  const z = se ? (rate - baseline) / se : 0;
  const instances = tested * size;
  return {
    tested,
    correct,
    rate,
    baseline,
    se,
    z,
    perNumberRate: instances ? avoided / instances : 0,
    perNumberBaseline: 42 / 49,
  };
}

export function exclusionHistory(draws, size, minimumHistory = 50) {
  const ordered = [...draws].sort((a, b) => a.issue - b.issue);
  const tested = Math.max(0, ordered.length - minimumHistory);
  const rows = [];
  let correct = 0;
  for (let i = minimumHistory; i < ordered.length; i++) {
    const candidates = exclusionCandidates(ordered.slice(0, i), size);
    const numbers = ordered[i].numbers;
    const predicted = candidates.map(({ number }) => number);
    const hit = predicted.filter((number) => numbers.includes(number));
    const ok = hit.length === 0;
    if (ok) correct++;
    rows.push({
      issue: ordered[i].issue,
      drawn: numbers,
      predicted,
      hit,
      ok,
      cumulativeRate: correct / (i - minimumHistory + 1),
    });
  }
  return { rows, tested, correct, rate: tested ? correct / tested : 0 };
}

export function adjacentOverlap(draws) {
  const ordered = [...draws].sort((a, b) => a.issue - b.issue);
  const histogram = Array(8).fill(0);
  const overlaps = [];
  let specialRepeat = 0;
  for (let index = 1; index < ordered.length; index++) {
    const previous = ordered[index - 1].numbers;
    overlaps.push(ordered[index].numbers.filter((number) => previous.includes(number)).length);
    histogram[overlaps.at(-1)]++;
    if (ordered[index].numbers.includes(previous[6])) specialRepeat++;
  }
  let afterZeroTests = 0;
  let afterZeroNoRepeat = 0;
  for (let index = 1; index < overlaps.length; index++) {
    if (overlaps[index - 1] === 0) {
      afterZeroTests++;
      if (overlaps[index] === 0) afterZeroNoRepeat++;
    }
  }
  const latest = ordered.at(-1);
  const previous = ordered.at(-2);
  return {
    latest,
    previous,
    repeated: latest && previous ? latest.numbers.filter((number) => previous.numbers.includes(number)) : [],
    histogram,
    pairs: overlaps.length,
    specialRepeat,
    specialBaseline: 7 / 49,
    afterZeroTests,
    afterZeroNoRepeat,
    baselineNoRepeat: Array.from({ length: 7 }, (_, index) => (42 - index) / (49 - index))
      .reduce((product, term) => product * term, 1),
  };
}

// —— 生肖与五行（2026 年为马年）——
// 49 个号码按 12 生肖循环分配：01 为当年生肖（马），往前依次为蛇、龙、兔……；
// 每差 12 号归入同一生肖。五行配色：鼠/猪=水，牛/龙/羊/狗=土，虎/兔=木，蛇/马=火，猴/鸡=金。
const ZODIAC_ORDER = ['马', '蛇', '龙', '兔', '虎', '牛', '鼠', '猪', '狗', '鸡', '猴', '羊'];
const ZODIAC_ELEMENT = { 鼠: '水', 牛: '土', 虎: '木', 兔: '木', 龙: '土', 蛇: '火', 马: '火', 羊: '土', 猴: '金', 鸡: '金', 狗: '土', 猪: '水' };

export function zodiacFor(number) {
  return ZODIAC_ORDER[(number - 1) % 12];
}

export function zodiacElement(zodiac) {
  return ZODIAC_ELEMENT[zodiac] || '';
}

