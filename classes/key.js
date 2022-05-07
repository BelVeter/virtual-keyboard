export class Key{
    static keysArray=[
        ['Backquote', '`'], 
        ['Digit1', '1'], 
        ['Digit2', '2'], 
        ['Digit3', '3'], 
        ['Digit4', '4'], 
        ['Digit5', '5'], 
        ['Digit6', '6'], 
        ['Digit7', '7'], 
        ['Digit8', '8'], 
        ['Digit9', '9'], 
        ['Digit0', '0'], 
        ['Minus', '-'],
        ['Equal', '='],  
        ['Backspace', 'Backspace'], 

        ['Tab', 'Tab'], 
        ['KeyQ', 'q'], 
        ['KeyW', 'w'], 
        ['KeyE', 'e'], 
        ['KeyR', 'r'], 
        ['KeyT', 't'], 
        ['KeyY', 'y'], 
        ['KeyU', 'u'], 
        ['KeyI', 'i'], 
        ['KeyO', 'o'], 
        ['KeyP', 'p'],
        ['BracketLeft', '['], 
        ['BracketRight', ']'],
        ['Backslash', '\\'], 

        ['CapsLock', 'Caps Lock'], 
        ['KeyA', 'a'], 
        ['KeyS', 's'], 
        ['KeyD', 'd'], 
        ['KeyF', 'f'], 
        ['KeyG', 'g'], 
        ['KeyH', 'h'], 
        ['KeyJ', 'j'], 
        ['KeyK', 'k'], 
        ['KeyL', 'l'],
        ['Semicolon', ';'],
        ['Quote', '\''],  
        ['Enter', 'Enter'], 
        
        ['ShiftLeft', 'Shift'], 
        ['KeyZ', 'z'], 
        ['KeyX', 'x'], 
        ['KeyC', 'c'], 
        ['KeyV', 'v'], 
        ['KeyB', 'b'], 
        ['KeyN', 'n'], 
        ['KeyM', 'm'],
        ['Comma', ','], 
        ['Period', '.'], 
        ['Slash', '/'], 
        ['ArrowUp', '▲'], 
        ['ShiftRight', 'Shift'], 
        
        ['ControlLeft', 'Ctrl'], 
        ['AltLeft', 'Option'], 
        ['MetaLeft', 'Command'], 
        ['Space', 'Space'], 
        ['MetaRight', 'Command'], 
        ['AltRight', 'Option'], 
        ['ArrowLeft', '◄'], 
        ['ArrowDown', '▼'], 
        ['ArrowRight', '►'], 
        
    ]

    static getKeyboardLineKeys(line=1){
        let result =[];
        let iFinish=0;
        let iStart=0;
        switch (line){
            case 1:
                iStart=0;
                iFinish=13;
                break;
            case 2:
                iStart=14;
                iFinish=27;
                break;
            case 3:
                iStart=28;
                iFinish=40;
                break;
            case 4:
                iStart=41;
                iFinish=53;
                break;
            case 5:
                iStart=54;
                iFinish=62;
                break;

        }

        for (let i = iStart; i <= iFinish; i++) {
            result.push(new Key(Key.keysArray[i]));
        }

        return result;
    }

    static getKeyByCode(code){
        let rez;
        rez = Key.keysArray.find((el)=>el[0]==code);
        if(rez){
            return new Key(rez);
        }
        else return false;
    }

    getValue() {
        if (this.value=='Tab') return '\t';
        if (this.value=='Enter') return '\n';
        else return this.value;
    }

    constructor(keyArr){
        this.code=keyArr[0];
        this.value=keyArr[1];
    }
}