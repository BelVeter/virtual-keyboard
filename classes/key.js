export class Key{
    static keysArray=[
        ['Backquote', '`', '~'], 
        ['Digit1', '1', '!'], 
        ['Digit2', '2', '@'], 
        ['Digit3', '3', '#',], 
        ['Digit4', '4', '$'], 
        ['Digit5', '5', '%'], 
        ['Digit6', '6', '^'], 
        ['Digit7', '7', '&'], 
        ['Digit8', '8', '*'], 
        ['Digit9', '9', '('], 
        ['Digit0', '0', ')'], 
        ['Minus', '-', '_'],
        ['Equal', '=', '+'],  
        ['Backspace', 'Backspace', 'Backspace'], 

        ['Tab', 'Tab', 'Tab'], 
        ['KeyQ', 'q', 'Q'], 
        ['KeyW', 'w', 'W'], 
        ['KeyE', 'e', 'E'], 
        ['KeyR', 'r', 'R'], 
        ['KeyT', 't', 'T'], 
        ['KeyY', 'y', 'Y'], 
        ['KeyU', 'u', 'U'], 
        ['KeyI', 'i', 'I'], 
        ['KeyO', 'o', 'O'], 
        ['KeyP', 'p', 'P'],
        ['BracketLeft', '[', '{'], 
        ['BracketRight', ']', '}'],
        ['Backslash', '\\', '|'], 

        ['CapsLock', 'Caps Lock', 'Caps Lock'], 
        ['KeyA', 'a', 'A'], 
        ['KeyS', 's', 'S'], 
        ['KeyD', 'd', 'D'], 
        ['KeyF', 'f', 'F'], 
        ['KeyG', 'g', 'G'], 
        ['KeyH', 'h', 'H'], 
        ['KeyJ', 'j', 'J'], 
        ['KeyK', 'k', 'K'], 
        ['KeyL', 'l', 'L'],
        ['Semicolon', ';', ':'],
        ['Quote', '\'', '"'],  
        ['Enter', 'Enter', 'Enter'], 
        
        ['ShiftLeft', 'Shift', 'Shift'], 
        ['KeyZ', 'z', 'Z'], 
        ['KeyX', 'x', 'X'], 
        ['KeyC', 'c', 'C'], 
        ['KeyV', 'v', 'V'], 
        ['KeyB', 'b', 'B'], 
        ['KeyN', 'n', 'N'], 
        ['KeyM', 'm', 'M'],
        ['Comma', ',', '<'], 
        ['Period', '.', '>'], 
        ['Slash', '/', '?'], 
        ['ArrowUp', '▲', '▲'], 
        ['ShiftRight', 'Shift', 'Shift'], 
        
        ['ControlLeft', 'Ctrl', 'Ctrl'], 
        ['AltLeft', 'Option', 'Option'], 
        ['MetaLeft', 'Command', 'Command'], 
        ['Space', 'Space', 'Space'], 
        ['MetaRight', 'Command', 'Command'], 
        ['AltRight', 'Option', 'Option'], 
        ['ArrowLeft', '◄', '◄'], 
        ['ArrowDown', '▼', '▼'], 
        ['ArrowRight', '►', '►'],        
    ]

    static commandKeys = ['Backspace', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'];

    static caps = false;
    static shift = 0;

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

    static capsToggle(){
        if(Key.caps) Key.caps = false;
        else Key.caps = true;
    }

    getValue() {
        let value='';
        if (this.value=='Tab') return '\t';
        if (this.value=='Enter') return '\n';
        if (this.value=='Space') return ' ';
        
        if(Key.shift) value = this.shiftValue;
        else value = this.value;

        if((Key.caps && !Key.shift) || (!Key.caps && Key.shift)) {
            return value.toUpperCase();
        }
        else{
            return value.toLowerCase();
        }
        
    }

    isCommand(){
        return Key.commandKeys.includes(this.code);
    }

    constructor(keyArr){
        this.code=keyArr[0];
        this.value=keyArr[1];
        this.shiftValue=keyArr[2];
    }
}