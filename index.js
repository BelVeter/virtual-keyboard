import {Key} from "./classes/key.js";

let keysHtml = [];

let keysActive = new Set();


let container = document.createElement('div');
container.classList.add('container');

let h1 = document.createElement('h1');
h1.innerText= 'Virtual keyboard';

let textarea = document.createElement('textarea');

let keyBoardContainer = document.createElement('div');
keyBoardContainer.classList.add('keyboard-container');

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
    keysActive.add(e.code);

    let key = Key.getKeyByCode(e.code);
    if(key && key.code != 'CapsLock') {
        addActive(key);
    }
    keyActionHandle(key);

    console.log(Key.caps);
}

function keyUpHandle(e){
    keysActive.delete(e.code);

    let key = Key.getKeyByCode(e.code);

    if(key && key.code != 'CapsLock') {
        setTimeout(removeActive, 200, key);
    }

    keyUpAction(key);

    e.preventDefault();
}

function mouseDownHandle(e){
    let code = e.target.dataset.code;
    keysActive.add(code);

    if(code){
        let key = Key.getKeyByCode(code);
        if(key && key.code != 'CapsLock') {
            addActive(key);
        }
        keyActionHandle(key);
    }
}

function mouseUpHandle(e){
    let code = e.target.dataset.code;
    keysActive.delete(code);
    if(code){
        let key = Key.getKeyByCode(code);
        if(key && key.code != 'CapsLock') {
            setTimeout(removeActive, 200, key);
        }
        textarea.focus();
    }
}

function keyboardCapsChange(){
    keysHtml.forEach((el)=>{
        let key = Key.getKeyByCode(el.dataset.code);
        //console.log(key.isCommand);
        if(!key.isCommand() && key.code !== 'Enter' && key.code !== 'Tab'){
            el.innerText = key.getValue();
        }
    });
}

function keyActionHandle(key){
    if(!key) return;
    
    if(key.isCommand()) {
        console.log('action2');
        switch(key.code){
            case 'Backspace':
                deleteChar();
                break;
            case 'CapsLock':
                capsToggle();
                if(Key.caps) addActive(key);
                else removeActive(key);
                keyboardCapsChange();
                break;
            case 'ShiftRight':
            case 'ShiftLeft':
                shiftPress();
                keyboardCapsChange();
                break;
        }
    }
    else {
        console.log('key');
        insertKey(key);
    }
}

function keyUpAction(key){
    if(!key) return;
    switch(key.code){
        case 'ShiftRight':
        case 'ShiftLeft':
            shiftRelease();
            keyboardCapsChange();
            break;
    }
}

function shiftPress(){
    Key.shift +=1;
}
function shiftRelease(){
    Key.shift -=1;
}

function capsToggle(){
    Key.capsToggle();

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
    textarea.selectionStart=cursorPosition-1
    textarea.selectionEnd=cursorPosition-1;
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