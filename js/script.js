/* Kalkulator Shisui Uchiha — full expression display, zero lag */
const display = document.getElementById('display');
let current = '0';
let previous = null;
let op = null;
let expression = '';  // full expression string
let waitingForOperand = false;  // true after operator pressed

function format(num) {
  const n = Number(num);
  if (!Number.isFinite(n)) return 'Error';
  return n.toString().length > 16 ? n.toExponential(6) : n.toString();
}

function render() {
  // Show full expression if exists, else current number
  display.textContent = expression || format(current);
}

function clearAll() { current = '0'; previous = null; op = null; expression = ''; waitingForOperand = false; render(); }

function deleteLast() {
  if (expression && !waitingForOperand) {
    // If we have an expression and typing operand, remove last char from current
    if (current.length === 1 || current === '-0') current = '0';
    else current = current.slice(0, -1) || '0';
    // Rebuild expression
    if (previous !== null && op) {
      expression = format(previous) + ' ' + op + ' ' + current;
    } else {
      expression = current;
    }
  } else if (waitingForOperand && expression) {
    // Delete operator
    waitingForOperand = false;
    op = null;
    expression = format(previous);
  } else {
    if (current.length === 1 || current === '-0') current = '0';
    else current = current.slice(0, -1) || '0';
  }
  render();
}

function toggleSign() {
  if (current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  if (previous !== null && op && !waitingForOperand) {
    expression = format(previous) + ' ' + op + ' ' + current;
  } else if (!waitingForOperand) {
    expression = current;
  }
  render();
}

function percent() {
  current = String(Number(current) / 100);
  if (previous !== null && op && !waitingForOperand) {
    expression = format(previous) + ' ' + op + ' ' + current;
  } else if (!waitingForOperand) {
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
  } else if (op && !waitingForOperand) {
    const res = compute(previous, val, op);
    if (!Number.isFinite(res)) { clearAll(); display.textContent = 'Error'; return; }
    previous = res;
    current = String(res);
  }
  op = operator;
  waitingForOperand = true;
  // Show "5 ×" (not "5 × 0")
  expression = format(previous) + ' ' + operator;
  current = '0';
  render();
}

function pressEqual() {
  if (previous === null || !op) return;
  // If waiting for operand, use previous as both operands (e.g., 5 × = → 25)
  const secondOperand = waitingForOperand ? previous : Number(current);
  const res = compute(previous, secondOperand, op);
  if (!Number.isFinite(res)) { display.textContent = 'Error'; clearAll(); return; }
  // Show full expression with result instantly
  const secondStr = waitingForOperand ? format(previous) : current;
  expression = format(previous) + ' ' + op + ' ' + secondStr + ' =';
  display.textContent = expression + ' ' + format(res);
  current = String(res);
  previous = null;
  op = null;
  expression = '';
  waitingForOperand = false;
  // Instant - next frame show just result
  requestAnimationFrame(() => { if (!op && !previous) render(); });
}

function pressKey(key) {
  if (key === '.') {
    if (current.includes('.')) return;
    current += '.';
  } else {
    if (current === '0' || waitingForOperand) current = key;
    else if (current.length < 16) current += key;
  }
  waitingForOperand = false;
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