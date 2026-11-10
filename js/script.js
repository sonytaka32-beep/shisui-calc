/* Kalkulator Shisui Uchiha — logika lengkap */
const display = document.getElementById('display');
let current = '0';
let previous = null;
let op = null;

function format(num) {
  const n = Number(num);
  if (!Number.isFinite(n)) return 'Error';
  return n.toString().length > 12 ? n.toExponential(4) : n.toString();
}

function render() { display.textContent = format(current); }

function clearAll() { current = '0'; previous = null; op = null; render(); }

function deleteLast() {
  if (current.length === 1 || current === '-0') current = '0';
  else current = current.slice(0, -1) || '0';
  render();
}

function toggleSign() {
  if (current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  render();
}

function percent() {
  current = String(Number(current) / 100);
  render();
}

function mapOp(unicodeOp) {
  if (unicodeOp === '×') return '*';
  if (unicodeOp === '÷') return '/';
  if (unicodeOp === '−') return '-';
  if (unicodeOp === '+') return '+';
  return unicodeOp;
}

function compute(a, b, operator) {
  const op = mapOp(operator);
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b === 0 ? NaN : a / b;
  return b;
}

function pressOperator(operator) {
  const val = Number(current);
  if (previous === null) {
    previous = val;
  } else if (op) {
    const res = compute(previous, val, op);
    if (!Number.isFinite(res)) { clearAll(); display.textContent = 'Error'; return; }
    previous = res;
    display.textContent = format(res);
    current = String(res);
  }
  op = operator;
  current = '0';
}

function pressEqual() {
  if (previous === null || !op) return;
  const res = compute(previous, Number(current), op);
  if (!Number.isFinite(res)) { display.textContent = 'Error'; clearAll(); return; }
  current = String(res);
  previous = null;
  op = null;
  render();
}

function pressKey(key) {
  if (key === '.') {
    if (current.includes('.')) return;
    current += '.';
  } else {
    if (current === '0') current = key;
    else if (current.length < 12) current += key;
  }
  render();
}

document.querySelectorAll('.keys button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.ac) clearAll();
    else if (btn.dataset.del) deleteLast();
    else if (btn.dataset.sign) toggleSign();
    else if (btn.dataset.percent) percent();
    else if (btn.dataset.eq) pressEqual();
    else if (btn.dataset.op) pressOperator(btn.dataset.op);
    else pressKey(btn.textContent);
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 120);
  });
});

// Dukungan papan ketik fisik
document.addEventListener('keydown', e => {
  const key = e.key;
  if ((key >= '0' && key <= '9') || key === '.') { pressKey(key); return; }
  if (key === 'Enter' || key === '=') { e.preventDefault(); pressEqual(); return; }
  if (key === 'Escape') { clearAll(); return; }
  if (key === 'Backspace') { deleteLast(); return; }
  if (key === '+') pressOperator('+');
  else if (key === '-') pressOperator('−');
  else if (key === '*') pressOperator('×');
  else if (key === '/') pressOperator('÷');
});

render();