export class Key{
    static keysArray=[
        ['Backquote', '`', '~', 'ё', 'Ë'], 
        ['Digit1', '1', '!', '1', '!'], 
        ['Digit2', '2', '@', '2', '"'], 
        ['Digit3', '3', '#', '3', '№'], 
        ['Digit4', '4', '$', '4', ';'], 
        ['Digit5', '5', '%', '5', '%'], 
        ['Digit6', '6', '^', '6', ':'], 
        ['Digit7', '7', '&', '7', '?'], 
        ['Digit8', '8', '*', '8', '*'], 
        ['Digit9', '9', '(', '9', '('], 
        ['Digit0', '0', ')', '0', ')'], 
        ['Minus', '-', '_', '-', '_'],
        ['Equal', '=', '+', '=', '+'],  
        ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],

        ['Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
        ['KeyQ', 'q', 'Q', 'й', 'Й'], 
        ['KeyW', 'w', 'W', 'ц', 'Ц'], 
        ['KeyE', 'e', 'E', 'у', 'У'], 
        ['KeyR', 'r', 'R', 'к', 'К'], 
        ['KeyT', 't', 'T', 'е', 'Е'], 
        ['KeyY', 'y', 'Y', 'н', 'Н'], 
        ['KeyU', 'u', 'U', 'г', 'Г'], 
        ['KeyI', 'i', 'I', 'ш', 'Ш'], 
        ['KeyO', 'o', 'O', 'щ', 'Щ'], 
        ['KeyP', 'p', 'P', 'з', 'З'],
        ['BracketLeft', '[', '{', 'х', 'Х'], 
        ['BracketRight', ']', '}', 'ъ', 'Ъ'],
        ['Backslash', '\\', '|', '\\', '/'],

        ['CapsLock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock'], 
        ['KeyA', 'a', 'A', 'ф', 'Ф'], 
        ['KeyS', 's', 'S', 'ы', 'Ы'], 
        ['KeyD', 'd', 'D', 'в', 'В'], 
        ['KeyF', 'f', 'F', 'а', 'А'], 
        ['KeyG', 'g', 'G', 'п', 'П'], 
        ['KeyH', 'h', 'H', 'р', 'Р'], 
        ['KeyJ', 'j', 'J', 'о', 'О'], 
        ['KeyK', 'k', 'K', 'л', 'Л'], 
        ['KeyL', 'l', 'L', 'д', 'Д'],
        ['Semicolon', ';', ':', 'ж', 'Ж'],
        ['Quote', '\'', '"', 'э', 'Э'],  
        ['Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
        
        ['ShiftLeft', 'Shift', 'Shift', 'Shift', 'Shift'], 
        ['KeyZ', 'z', 'Z', 'я', 'Я'], 
        ['KeyX', 'x', 'X', 'ч', 'Ч'], 
        ['KeyC', 'c', 'C', 'с', 'С'], 
        ['KeyV', 'v', 'V', 'м', 'М'], 
        ['KeyB', 'b', 'B', 'и', 'И'], 
        ['KeyN', 'n', 'N', 'т', 'Т'], 
        ['KeyM', 'm', 'M', 'ь', 'Ь'],
        ['Comma', ',', '<', 'б', 'Б'], 
        ['Period', '.', '>', 'ю', 'Ю'], 
        ['Slash', '/', '?', '.', ','], 
        ['ArrowUp', '▲', '▲', '▲', '▲'], 
        ['ShiftRight', 'Shift', 'Shift', 'Shift', 'Shift'],
        
        ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'], 
        ['AltLeft', 'Option', 'Option', 'Option', 'Option'], 
        ['MetaLeft', 'Command', 'Command', 'Command', 'Command'], 
        ['Space', 'Space', 'Space', 'Space', 'Space'], 
        ['MetaRight', 'Command', 'Command', 'Command', 'Command'], 
        ['AltRight', 'Option', 'Option', 'Option', 'Option'], 
        ['ArrowLeft', '◄', '◄', '◄', '◄'], 
        ['ArrowDown', '▼', '▼', '▼', '▼'], 
        ['ArrowRight', '►', '►', '►', '►'],        
    ]

    static commandKeys = ['Backspace', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'];

    static caps = false;
    static shift = 0;
    static lang = 'en';

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
        
        if(Key.shift) {
            Key.lang=='en' ? value = this.shiftValue : value = this.ruShiftValue;
        }
        else{
            Key.lang=='en' ? value = this.value : value = this.ruValue;
        }

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
        this.ruValue=keyArr[3];
        this.ruShiftValue=keyArr[4];
    }
}