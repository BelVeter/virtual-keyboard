import {Key} from "./classes/key.js";

let keysHtml = [];

console.log('started');

let container = document.createElement('div');
container.classList.add('container');

let h1 = document.createElement('h1');
h1.innerText= 'Virtual keyboard';

let textarea = document.createElement('textarea');

let keyBoardContainer = document.createElement('div');
keyBoardContainer.classList.add('keyboard-container');
console.log(Key.keysArray.length);
for(let i=1; i<=5; i++) {
    let line = document.createElement('div');
    line.classList.add('line');
    //console.log(Key.getKeyboardLineKeys(i));
    Key.getKeyboardLineKeys(i).forEach((key)=>{
        let keyDiv = document.createElement('div');
        keyDiv.classList.add('key');
        keyDiv.innerText=key.value;
        keyDiv.dataset.code=key.code;
        line.appendChild(keyDiv);
        keysHtml.push(keyDiv);
    });
    keyBoardContainer.appendChild(line);
}



container.appendChild(h1);
container.appendChild(textarea);
container.appendChild(keyBoardContainer);

document.body.appendChild(container);


document.addEventListener('keydown', keyDownHandle);
document.addEventListener('keyup', keyUpHandle);
document.addEventListener('mousedown', mouseDownHandle);
document.addEventListener('mouseup', mouseUpHandle);

function keyDownHandle(e){
    e.preventDefault();
    let key = Key.getKeyByCode(e.code);
    
    keyActionHandle(key);
}

function keyUpHandle(e){
    console.log(e.code);
    let key = Key.getKeyByCode(e.code);

    if(key) {
        setTimeout(removeActive, 200, key);
    }
    e.preventDefault();
}

function mouseDownHandle(e){
    console.log('dd');
    let code = e.target.dataset.code;
    if(code){
        let key = Key.getKeyByCode(code);
        keyActionHandle(key);
    }
}

function mouseUpHandle(e){
    let code = e.target.dataset.code;
    if(code){
        let key = Key.getKeyByCode(code);
        setTimeout(removeActive, 200, key);
    }
}

function keyActionHandle(key){
    if(key) {
        insertKey(key);
        addActive(key);
    }
}

function insertKey(key){
    if(key.isCommand()) return;
    let cursorPosition = textarea.selectionStart;
    let str = textarea.value;
    let firstTextPart=str.substring(0,cursorPosition);
    let secondTextPart=str.substring(cursorPosition);
    let newString=firstTextPart+key.getValue()+secondTextPart;
    textarea.value = newString;
    textarea.selectionStart=cursorPosition+1
    textarea.selectionEnd=cursorPosition+1;
}

function deleteChar(){
    let cursorPosition = textarea.selectionStart;
    
    if(cursorPosition==0) return;

    let str = textarea.value;
    let firstTextPart=str.substring(0,cursorPosition-1);
    let secondTextPart=str.substring(cursorPosition);
    let newString=firstTextPart+secondTextPart;
    textarea.value = newString;
    textarea.selectionStart=cursorPosition+1
    textarea.selectionEnd=cursorPosition+1;
}

function addActive(key){
    let target = keysHtml.find((el)=>el.dataset.code==key.code);
    //console.log(target);
    target.classList.add('active');
}

function removeActive(key){
    let target = keysHtml.find((el)=>el.dataset.code==key.code);
    //console.log(target);
    target.classList.remove('active');
}