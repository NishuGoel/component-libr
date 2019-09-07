import { KeyCode } from './keyCodes';
/**
 * keyboardEvent.code
 */
export declare enum ScanCode {
    None = 0,
    Hyper = 1,
    Super = 2,
    Fn = 3,
    FnLock = 4,
    Suspend = 5,
    Resume = 6,
    Turbo = 7,
    Sleep = 8,
    WakeUp = 9,
    KeyA = 10,
    KeyB = 11,
    KeyC = 12,
    KeyD = 13,
    KeyE = 14,
    KeyF = 15,
    KeyG = 16,
    KeyH = 17,
    KeyI = 18,
    KeyJ = 19,
    KeyK = 20,
    KeyL = 21,
    KeyM = 22,
    KeyN = 23,
    KeyO = 24,
    KeyP = 25,
    KeyQ = 26,
    KeyR = 27,
    KeyS = 28,
    KeyT = 29,
    KeyU = 30,
    KeyV = 31,
    KeyW = 32,
    KeyX = 33,
    KeyY = 34,
    KeyZ = 35,
    Digit1 = 36,
    Digit2 = 37,
    Digit3 = 38,
    Digit4 = 39,
    Digit5 = 40,
    Digit6 = 41,
    Digit7 = 42,
    Digit8 = 43,
    Digit9 = 44,
    Digit0 = 45,
    Enter = 46,
    Escape = 47,
    Backspace = 48,
    Tab = 49,
    Space = 50,
    Minus = 51,
    Equal = 52,
    BracketLeft = 53,
    BracketRight = 54,
    Backslash = 55,
    IntlHash = 56,
    Semicolon = 57,
    Quote = 58,
    Backquote = 59,
    Comma = 60,
    Period = 61,
    Slash = 62,
    CapsLock = 63,
    F1 = 64,
    F2 = 65,
    F3 = 66,
    F4 = 67,
    F5 = 68,
    F6 = 69,
    F7 = 70,
    F8 = 71,
    F9 = 72,
    F10 = 73,
    F11 = 74,
    F12 = 75,
    PrintScreen = 76,
    ScrollLock = 77,
    Pause = 78,
    Insert = 79,
    Home = 80,
    PageUp = 81,
    Delete = 82,
    End = 83,
    PageDown = 84,
    ArrowRight = 85,
    ArrowLeft = 86,
    ArrowDown = 87,
    ArrowUp = 88,
    NumLock = 89,
    NumpadDivide = 90,
    NumpadMultiply = 91,
    NumpadSubtract = 92,
    NumpadAdd = 93,
    NumpadEnter = 94,
    Numpad1 = 95,
    Numpad2 = 96,
    Numpad3 = 97,
    Numpad4 = 98,
    Numpad5 = 99,
    Numpad6 = 100,
    Numpad7 = 101,
    Numpad8 = 102,
    Numpad9 = 103,
    Numpad0 = 104,
    NumpadDecimal = 105,
    IntlBackslash = 106,
    ContextMenu = 107,
    Power = 108,
    NumpadEqual = 109,
    F13 = 110,
    F14 = 111,
    F15 = 112,
    F16 = 113,
    F17 = 114,
    F18 = 115,
    F19 = 116,
    F20 = 117,
    F21 = 118,
    F22 = 119,
    F23 = 120,
    F24 = 121,
    Open = 122,
    Help = 123,
    Select = 124,
    Again = 125,
    Undo = 126,
    Cut = 127,
    Copy = 128,
    Paste = 129,
    Find = 130,
    AudioVolumeMute = 131,
    AudioVolumeUp = 132,
    AudioVolumeDown = 133,
    NumpadComma = 134,
    IntlRo = 135,
    KanaMode = 136,
    IntlYen = 137,
    Convert = 138,
    NonConvert = 139,
    Lang1 = 140,
    Lang2 = 141,
    Lang3 = 142,
    Lang4 = 143,
    Lang5 = 144,
    Abort = 145,
    Props = 146,
    NumpadParenLeft = 147,
    NumpadParenRight = 148,
    NumpadBackspace = 149,
    NumpadMemoryStore = 150,
    NumpadMemoryRecall = 151,
    NumpadMemoryClear = 152,
    NumpadMemoryAdd = 153,
    NumpadMemorySubtract = 154,
    NumpadClear = 155,
    NumpadClearEntry = 156,
    ControlLeft = 157,
    ShiftLeft = 158,
    AltLeft = 159,
    MetaLeft = 160,
    ControlRight = 161,
    ShiftRight = 162,
    AltRight = 163,
    MetaRight = 164,
    BrightnessUp = 165,
    BrightnessDown = 166,
    MediaPlay = 167,
    MediaRecord = 168,
    MediaFastForward = 169,
    MediaRewind = 170,
    MediaTrackNext = 171,
    MediaTrackPrevious = 172,
    MediaStop = 173,
    Eject = 174,
    MediaPlayPause = 175,
    MediaSelect = 176,
    LaunchMail = 177,
    LaunchApp2 = 178,
    LaunchApp1 = 179,
    SelectTask = 180,
    LaunchScreenSaver = 181,
    BrowserSearch = 182,
    BrowserHome = 183,
    BrowserBack = 184,
    BrowserForward = 185,
    BrowserStop = 186,
    BrowserRefresh = 187,
    BrowserFavorites = 188,
    ZoomToggle = 189,
    MailReply = 190,
    MailForward = 191,
    MailSend = 192,
    MAX_VALUE = 193
}
export declare const ScanCodeUtils: {
    lowerCaseToEnum: (scanCode: string) => number;
    toEnum: (scanCode: string) => number;
    toString: (scanCode: ScanCode) => string;
};
/**
 * -1 if a ScanCode => KeyCode mapping depends on kb layout.
 */
export declare const IMMUTABLE_CODE_TO_KEYCODE: KeyCode[];
/**
 * -1 if a KeyCode => ScanCode mapping depends on kb layout.
 */
export declare const IMMUTABLE_KEYCODE_TO_CODE: ScanCode[];
export declare class ScanCodeBinding {
    readonly ctrlKey: boolean;
    readonly shiftKey: boolean;
    readonly altKey: boolean;
    readonly metaKey: boolean;
    readonly scanCode: ScanCode;
    constructor(ctrlKey: boolean, shiftKey: boolean, altKey: boolean, metaKey: boolean, scanCode: ScanCode);
    equals(other: ScanCodeBinding): boolean;
    /**
     * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
     */
    isDuplicateModifierCase(): boolean;
}
