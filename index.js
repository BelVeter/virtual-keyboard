import Key from './classes/key.js';

const keysHtml = [];
const keysActive = new Set();

const container = document.createElement('div');
container.classList.add('container');

const h1 = document.createElement('h1');
h1.innerText = 'Virtual keyboard';

const textarea = document.createElement('textarea');

const keyBoardContainer = document.createElement('div');
keyBoardContainer.classList.add('keyboard-container');

for (let i = 1; i <= 5; i += 1) {
  const line = document.createElement('div');
  line.classList.add('line');
  Key.getKeyboardLineKeys(i).forEach((key) => {
    const keyDiv = document.createElement('div');
    keyDiv.classList.add('key');
    keyDiv.innerText = key.value;
    keyDiv.dataset.code = key.code;
    line.appendChild(keyDiv);
    keysHtml.push(keyDiv);
  });
  keyBoardContainer.appendChild(line);
}

const d1 = document.createElement('div');
d1.classList.add('system');
d1.innerHTML = 'Клавиатура создана в операционной системе MacOs';

const d2 = document.createElement('div');
d2.classList.add('lang');
d2.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';

container.appendChild(h1);
container.appendChild(textarea);
container.appendChild(keyBoardContainer);
container.appendChild(d1);
container.appendChild(d2);

document.body.appendChild(container);

function addActive(key) {
  const target = keysHtml.find((el) => el.dataset.code === key.code);

  target.classList.add('active');
}

function deleteChar() {
  const cursorPosition = textarea.selectionStart;

  if (cursorPosition === 0) return;

  const str = textarea.value;
  const firstTextPart = str.substring(0, cursorPosition - 1);
  const secondTextPart = str.substring(cursorPosition);
  const newString = firstTextPart + secondTextPart;
  textarea.value = newString;
  textarea.selectionStart = cursorPosition - 1;
  textarea.selectionEnd = cursorPosition - 1;
}

function capsToggle() {
  Key.capsToggle();
}

function removeActive(key) {
  const target = keysHtml.find((el) => el.dataset.code === key.code);

  target.classList.remove('active');
}

function keyboardCapsChange() {
  keysHtml.forEach((el) => {
    const key = Key.getKeyByCode(el.dataset.code);

    if (!key.isCommand() && key.code !== 'Enter' && key.code !== 'Tab') {
      const element = el;
      element.innerText = key.getValue();
    }
  });
}

function shiftPress() {
  Key.shift += 1;
}

function langToggle() {
  if (Key.lang === 'en') {
    Key.lang = 'ru';
    localStorage.setItem('lang', Key.lang);
  } else {
    Key.lang = 'en';
    localStorage.setItem('lang', Key.lang);
  }
}

function insertKey(key) {
  if (key.isCommand()) return;
  const cursorPosition = textarea.selectionStart;
  const str = textarea.value;
  const firstTextPart = str.substring(0, cursorPosition);
  const secondTextPart = str.substring(cursorPosition);
  const newString = firstTextPart + key.getValue() + secondTextPart;
  textarea.value = newString;
  textarea.selectionStart = cursorPosition + 1;
  textarea.selectionEnd = cursorPosition + 1;
}

function keyActionHandle(key) {
  if (!key) return;

  if (key.isCommand()) {
    switch (key.code) {
      case 'Backspace':
        deleteChar();
        break;
      case 'CapsLock':
        capsToggle();
        if (Key.caps) addActive(key);
        else removeActive(key);
        keyboardCapsChange();
        break;
      case 'ShiftRight':
      case 'ShiftLeft':
        shiftPress();
        keyboardCapsChange();
        break;
      case 'ControlLeft':
      case 'AltLeft':
        if (keysActive.has('ControlLeft') && keysActive.has('AltLeft')) {
          langToggle();
          keyboardCapsChange();
        }
        break;
      default:
        break;
    }
  } else {
    insertKey(key);
  }
}

function keyDownHandle(e) {
  keysActive.add(e.code);

  const key = Key.getKeyByCode(e.code);
  if (key && key.code !== 'CapsLock') {
    e.preventDefault();
    addActive(key);
  }
  keyActionHandle(key);

  textarea.focus();
}

function shiftRelease() {
  Key.shift -= 1;
}

function keyUpAction(key) {
  if (!key) return;
  switch (key.code) {
    case 'ShiftRight':
    case 'ShiftLeft':
      shiftRelease();
      keyboardCapsChange();
      break;
    default:
      break;
  }
}

function keyUpHandle(e) {
  keysActive.delete(e.code);

  const key = Key.getKeyByCode(e.code);

  if (key && key.code !== 'CapsLock') {
    setTimeout(removeActive, 150, key);
  }

  keyUpAction(key);
}

function mouseDownHandle(e) {
  const { code } = e.target.dataset;
  keysActive.add(code);

  if (code) {
    const key = Key.getKeyByCode(code);
    if (key && key.code !== 'CapsLock') {
      addActive(key);
    }
    keyActionHandle(key);
  }
}

function mouseUpHandle(e) {
  const { code } = e.target.dataset;
  keysActive.delete(code);
  if (code) {
    const key = Key.getKeyByCode(code);
    if (key && key.code !== 'CapsLock') {
      setTimeout(removeActive, 200, key);
    }
    textarea.focus();
  }
}

document.addEventListener('keydown', keyDownHandle);
document.addEventListener('keyup', keyUpHandle);
document.addEventListener('mousedown', mouseDownHandle);
document.addEventListener('mouseup', mouseUpHandle);

if (localStorage.getItem('lang') && localStorage.getItem('lang') !== '') {
  Key.lang = localStorage.getItem('lang');
  keyboardCapsChange();
} else {
  localStorage.setItem('lang', Key.lang);
}
