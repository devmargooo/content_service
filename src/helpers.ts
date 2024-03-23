export type Email = string & { __type: 'Email' };
export type Phone = string & { __type: 'Phone' };
export type Login = { type: 'email', value: Email } | { type: 'phone', value: Phone };

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Code = `${Digit}${Digit}${Digit}${Digit}`;

export class InvalidLoginError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidLogin';
    }
}

export class NotCorrectCodeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotCorrectCode';
    }
}

export const parseLogin = (login:string): Login => {
    if (isPhone(login)) {
        return { type: 'phone', value: login };
    }
    if (isEmail(login)) {
        return { type: 'email', value: login };
    }
    throw new InvalidLoginError('Логин должен быть телефоном или емейлом');
}

export const parseCode = (value:string): Code  => {
    if (!isCode(value)) {
        throw new NotCorrectCodeError('Код должен быть 4 цифры');
    }
    return value;
}


export async function auth(login:Login) {
    switch (login.type) {
        case 'email': return sendEmailCode(login.value);
        case 'phone': return sendSms(login.value);
    }
}

export async function checkCode(login:Login, code:Code) {
    switch (login.type) {
        case 'email': return checkEmailCode(code);
        case 'phone': return checkSmsCode(code);
    }
}

export function isPhone(value:string): value is Phone {
    return !!(Number(value) && value.length === 11 && value[0] === '8');
}

export function isEmail(value:string): value is Email {
    return value.includes('@') && value.includes('.');
}

function isCode(value:string): value is Code {
    return value.length === 4 && !isNaN(Number(value));
}

const sendSms = async (phoneNumber:string) => Promise.resolve();
const sendEmailCode = async (email:string) => Promise.resolve();
const checkSmsCode = async (code:string) => Promise.resolve();
const checkEmailCode = async (code:string) => Promise.resolve();