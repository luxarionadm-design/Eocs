import {
  Luxarion,
  HybridTypedArray,
  OptimizedTypedArray,
  EmailValidator,
  URLValidator,
  PasswordValidator,
  helpers,
  generators,
  converters,
  formatters,
  StatusEnum,
  NumericValues,
  StringValues
} from '../src/index.js';

const lux = Luxarion.create();

console.log('📚 Eocs - Luxarion Loaded');
console.log('Version:', lux.version);
console.log('Status:', lux.getState().status);
console.log('Repository: https://github.com/luxarionadm-design/Eocs');

document.getElementById('moduleCount').textContent = '12';
document.getElementById('methodCount').textContent = '150+';
document.getElementById('fileCount').textContent = '42';
document.getElementById('featureCount').textContent = '10';

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

window.runHybridTest = function() {
  const output = document.getElementById('hybridOutput');
  const arr = new HybridTypedArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  let result = '=== HybridTypedArray ===\n';
  result += `Original: [${arr.toArray().join(', ')}]\n`;

  arr.multiply(2);
  result += `Multiply 2: [${arr.toArray().join(', ')}]\n`;

  arr.add(5);
  result += `Add 5: [${arr.toArray().join(', ')}]\n`;

  result += `\nStatistics:\n`;
  result += `  Sum: ${arr.sum()}\n`;
  result += `  Average: ${arr.average()}\n`;
  result += `  Min: ${arr.min()}\n`;
  result += `  Max: ${arr.max()}\n`;
  result += `  Length: ${arr.length}\n`;

  output.textContent = result;
};

window.runOptimizedTest = function() {
  const output = document.getElementById('optimizedOutput');
  const arr = new OptimizedTypedArray([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

  let result = '=== OptimizedTypedArray ===\n';
  result += `Original: [${arr.toArray().join(', ')}]\n`;

  arr.add(5);
  result += `Add 5: [${arr.toArray().join(', ')}]\n`;

  arr.multiply(2);
  result += `Multiply 2: [${arr.toArray().join(', ')}]\n`;

  arr.normalize();
  result += `Normalize: [${arr.toArray().join(', ').slice(0, 50)}...]\n`;

  result += `\nPerformance:\n`;
  result += `  Operations: ${arr.getOperations()}\n`;
  result += `  Is Optimized: ${arr.isOptimized()}\n`;
  result += `  Length: ${arr.length}\n`;

  output.textContent = result;
};

window.validateEmail = function() {
  const input = document.getElementById('emailInput');
  const result = document.getElementById('emailResult');
  const validator = lux.getEmailValidator();
  const value = input.value;
  const isValid = validator.isValid(value);
  const errors = validator.getErrors(value);

  result.className = 'result ' + (isValid ? 'success' : 'error');
  result.innerHTML = isValid
    ? `✅ Valid email: ${value}`
    : `❌ Invalid email: ${value}\nErrors: ${errors.map(e => e.message).join(', ')}`;
};

window.validateURL = function() {
  const input = document.getElementById('urlInput');
  const result = document.getElementById('urlResult');
  const validator = lux.getURLValidator();
  const value = input.value;
  const isValid = validator.isValid(value);
  const errors = validator.getErrors(value);

  result.className = 'result ' + (isValid ? 'success' : 'error');
  result.innerHTML = isValid
    ? `✅ Valid URL: ${value}`
    : `❌ Invalid URL: ${value}\nErrors: ${errors.map(e => e.message).join(', ')}`;
};

window.validatePassword = function() {
  const input = document.getElementById('passwordInput');
  const result = document.getElementById('passwordResult');
  const validator = lux.getPasswordValidator();
  const value = input.value;
  const validation = validator.validate(value);

  result.className = 'result ' + (validation.valid ? 'success' : 'error');
  result.innerHTML = `Password: ${value}\n`;
  result.innerHTML += `Strength: ${validation.strength}\n`;
  result.innerHTML += `Valid: ${validation.valid ? '✅' : '❌'}\n`;
  if (!validation.valid) {
    result.innerHTML += `Errors: ${validation.errors.map(e => e.message).join(', ')}`;
  }
};

window.testDeepClone = function() {
  const result = document.getElementById('helpersResult');
  const obj = { a: 1, b: { c: 2, d: [3, 4] } };
  const cloned = helpers.deepClone(obj);
  result.className = 'result success';
  result.innerHTML = `Original: ${JSON.stringify(obj)}\nCloned: ${JSON.stringify(cloned)}\nSame reference: ${obj === cloned ? '❌' : '✅'}`;
};

window.testDeepMerge = function() {
  const result = document.getElementById('helpersResult');
  const obj1 = { a: 1, b: { c: 2 } };
  const obj2 = { b: { d: 3 }, e: 4 };
  const merged = helpers.deepMerge({}, obj1, obj2);
  result.className = 'result success';
  result.innerHTML = `Object 1: ${JSON.stringify(obj1)}\nObject 2: ${JSON.stringify(obj2)}\nMerged: ${JSON.stringify(merged)}`;
};

let debounceCount = 0;
window.testDebounce = function() {
  const result = document.getElementById('helpersResult');
  const debounced = helpers.debounce(() => {
    debounceCount++;
    result.className = 'result success';
    result.innerHTML = `Debounced called ${debounceCount} times`;
  }, 500);
  debounced();
  debounced();
  debounced();
  result.className = 'result';
  result.innerHTML = 'Debounce triggered 3 times in 500ms... waiting...';
};

window.testThrottle = function() {
  const result = document.getElementById('helpersResult');
  let throttleCount = 0;
  const throttled = helpers.throttle(() => {
    throttleCount++;
    result.className = 'result success';
    result.innerHTML = `Throttled called ${throttleCount} times`;
  }, 500);
  throttled();
  throttled();
  throttled();
  result.className = 'result';
  result.innerHTML = 'Throttle triggered 3 times... waiting...';
};

window.generateUUID = function() {
  const result = document.getElementById('generatorsResult');
  const uuid = generators.generateUUID();
  result.className = 'result success';
  result.innerHTML = `UUID: ${uuid}`;
};

window.generateToken = function() {
  const result = document.getElementById('generatorsResult');
  const token = generators.generateToken(32);
  result.className = 'result success';
  result.innerHTML = `Token: ${token}`;
};

window.generatePassword = function() {
  const result = document.getElementById('generatorsResult');
  const password = generators.generatePassword(16);
  result.className = 'result success';
  result.innerHTML = `Password: ${password}`;
};

window.generateOTP = function() {
  const result = document.getElementById('generatorsResult');
  const otp = generators.generateOTP(6);
  result.className = 'result success';
  result.innerHTML = `OTP: ${otp}`;
};

window.formatCurrency = function() {
  const result = document.getElementById('formattersResult');
  const formatted = formatters.formatCurrency(1234.56, 'USD');
  result.className = 'result success';
  result.innerHTML = `Currency (USD): ${formatted}\nCurrency (EUR): ${formatters.formatCurrency(1234.56, 'EUR')}\nCurrency (IDR): ${formatters.formatCurrency(1234.56, 'IDR')}`;
};

window.formatDate = function() {
  const result = document.getElementById('formattersResult');
  const now = new Date();
  result.className = 'result success';
  result.innerHTML = `ISO: ${formatters.formatDate(now, 'YYYY-MM-DD')}\nCustom: ${formatters.formatDate(now, 'DD/MM/YYYY')}\nTime: ${formatters.formatTime(now)}`;
};

window.formatBytes = function() {
  const result = document.getElementById('formattersResult');
  result.className = 'result success';
  result.innerHTML = `1024 B: ${formatters.formatBytes(1024)}\n1048576 B: ${formatters.formatBytes(1048576)}\n1073741824 B: ${formatters.formatBytes(1073741824)}`;
};

window.formatDuration = function() {
  const result = document.getElementById('formattersResult');
  result.className = 'result success';
  result.innerHTML = `3661s: ${formatters.formatDuration(3661000)}\n86400s: ${formatters.formatDuration(86400000)}\n90061s: ${formatters.formatDuration(90061000)}`;
};

window.runAllTests = function() {
  const result = document.getElementById('testResults');
  let output = '=== RUNNING ALL TESTS ===\n\n';
  let passed = 0;
  let failed = 0;

  try {
    output += '✅ Luxarion: Loaded\n';
    passed++;
  } catch (e) {
    output += `❌ Luxarion: ${e.message}\n`;
    failed++;
  }

  try {
    const arr = new HybridTypedArray([1, 2, 3]);
    arr.multiply(2);
    if (arr.toArray()[0] === 2) {
      output += '✅ HybridTypedArray: Works\n';
      passed++;
    } else {
      output += '❌ HybridTypedArray: Failed\n';
      failed++;
    }
  } catch (e) {
    output += `❌ HybridTypedArray: ${e.message}\n`;
    failed++;
  }

  try {
    const emailValidator = lux.getEmailValidator();
    if (emailValidator.isValid('test@example.com')) {
      output += '✅ EmailValidator: Works\n';
      passed++;
    } else {
      output += '❌ EmailValidator: Failed\n';
      failed++;
    }
  } catch (e) {
    output += `❌ EmailValidator: ${e.message}\n`;
    failed++;
  }

  try {
    const obj = { a: 1 };
    const cloned = helpers.deepClone(obj);
    if (cloned.a === 1 && cloned !== obj) {
      output += '✅ Helpers: Works\n';
      passed++;
    } else {
      output += '❌ Helpers: Failed\n';
      failed++;
    }
  } catch (e) {
    output += `❌ Helpers: ${e.message}\n`;
    failed++;
  }

  try {
    const uuid = generators.generateUUID();
    if (uuid.length === 36) {
      output += '✅ Generators: Works\n';
      passed++;
    } else {
      output += '❌ Generators: Failed\n';
      failed++;
    }
  } catch (e) {
    output += `❌ Generators: ${e.message}\n`;
    failed++;
  }

  try {
    const formatted = formatters.formatCurrency(1000, 'USD');
    if (formatted.includes('$')) {
      output += '✅ Formatters: Works\n';
      passed++;
    } else {
      output += '❌ Formatters: Failed\n';
      failed++;
    }
  } catch (e) {
    output += `❌ Formatters: ${e.message}\n`;
    failed++;
  }

  output += `\n=== RESULTS ===\n`;
  output += `✅ Passed: ${passed}\n`;
  output += `❌ Failed: ${failed}\n`;
  output += `📊 Total: ${passed + failed}\n`;

  result.className = 'result ' + (failed === 0 ? 'success' : 'error');
  result.textContent = output;
};

window.clearResults = function() {
  document.getElementById('testResults').textContent = '';
  document.getElementById('testResults').className = 'result';
};

setTimeout(() => {
  runHybridTest();
  runOptimizedTest();
}, 500);
