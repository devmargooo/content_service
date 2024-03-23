export type Email = string & { __type: 'Email' };
export type Phone = string & { __type: 'Phone' };
export type Login = { type: 'email', value: Email } | { type: 'phone', value: Phone };

export const parseLogin = (login:string): Login => {
    if (isPhone(login)) {
        return { type: 'phone', value: login };
    }
    if (isEmail(login)) {
        return { type: 'email', value: login };
    }
    throw new Error('Логин должен быть телефоном или емейлом');
}

export async function auth(login:Login) {
    switch (login.type) {
        case 'email': return sendEmailCode(login.value);
        case 'phone': return sendSms(login.value);
    }
}

export async function checkCode(login:Login, code:string) {
    if (code.length !== 4) throw new Error('Длина кода должна составлять 4 символа');
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

const sendSms = async (phoneNumber:string) => Promise.resolve();
const sendEmailCode = async (email:string) => Promise.resolve();
const checkSmsCode = async (code:string) => Promise.resolve();
const checkEmailCode = async (code:string) => Promise.resolve();