/* Kalkulator Shisui Uchiha — full expression display, zero lag */
const display = document.getElementById('display');
let current = '0';
let previous = null;
let op = null;
let expression = '';  // full expression string

function format(num) {
  const n = Number(num);
  if (!Number.isFinite(n)) return 'Error';
  return n.toString().length > 12 ? n.toExponential(4) : n.toString();
}

function render() {
  // Show full expression if exists, else current number
  display.textContent = expression || format(current);
}

function clearAll() { current = '0'; previous = null; op = null; expression = ''; render(); }

function deleteLast() {
  if (expression) {
    // If we have an expression, remove last char from current
    if (current.length === 1 || current === '-0') current = '0';
    else current = current.slice(0, -1) || '0';
    // Rebuild expression
    if (previous !== null && op) {
      expression = format(previous) + ' ' + op + ' ' + current;
    } else {
      expression = current;
    }
  } else {
    if (current.length === 1 || current === '-0') current = '0';
    else current = current.slice(0, -1) || '0';
  }
  render();
}

function toggleSign() {
  if (current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  if (previous !== null && op) {
    expression = format(previous) + ' ' + op + ' ' + current;
  } else {
    expression = current;
  }
  render();
}

function percent() {
  current = String(Number(current) / 100);
  if (previous !== null && op) {
    expression = format(previous) + ' ' + op + ' ' + current;
  } else {
    expression = current;
  }
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
  const mappedOp = mapOp(operator);
  if (mappedOp === '+') return a + b;
  if (mappedOp === '-') return a - b;
  if (mappedOp === '*') return a * b;
  if (mappedOp === '/') return b === 0 ? NaN : a / b;
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
    current = String(res);
  }
  op = operator;
  // Build expression: previous op current
  expression = format(previous) + ' ' + operator + ' ' + current;
  current = '0';
  render();
}

function pressEqual() {
  if (previous === null || !op) return;
  const res = compute(previous, Number(current), op);
  if (!Number.isFinite(res)) { display.textContent = 'Error'; clearAll(); return; }
  // Show full expression with result instantly, then just result
  expression = format(previous) + ' ' + op + ' ' + current + ' =';
  display.textContent = expression + ' ' + format(res);
  current = String(res);
  previous = null;
  op = null;
  expression = '';
  // Instant - next frame show just result
  requestAnimationFrame(() => { if (!op && !previous) render(); });
}

function pressKey(key) {
  if (key === '.') {
    if (current.includes('.')) return;
    current += '.';
  } else {
    if (current === '0') current = key;
    else if (current.length < 12) current += key;
  }
  // Build expression if we have previous + op
  if (previous !== null && op) {
    expression = format(previous) + ' ' + op + ' ' + current;
  } else {
    expression = current;
  }
  render();
}

document.querySelectorAll('.keys button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.hasAttribute('data-ac')) clearAll();
    else if (btn.hasAttribute('data-del')) deleteLast();
    else if (btn.hasAttribute('data-sign')) toggleSign();
    else if (btn.hasAttribute('data-percent')) percent();
    else if (btn.hasAttribute('data-eq')) pressEqual();
    else if (btn.hasAttribute('data-op')) pressOperator(btn.dataset.op);
    else pressKey(btn.textContent);
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 120);
  });
});

// Keyboard support
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