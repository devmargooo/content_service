export async function auth(login:string) {
    if (isPhone(login)) {
        return sendSms(login);
    }
    if (isEmail(login)) {
        return sendEmailCode(login);
    }
    throw new Error('Invalid login');
}

export async function checkCode(login:string, code:string) {
    if (code.length !== 4) {
        throw new Error('Invalid code length');
    }
    if (isPhone(login)) {
        return checkSmsCode(code);
    }
    if (isEmail(login)) {
        return checkEmailCode(code);
    }
    // ???
}

export function isPhone(value:string):boolean {
    return !!(Number(value) && value.length === 11 && value[0] === '8');
}

export function isEmail(value:string):boolean {
    return value.includes('@') && value.includes('.');
}

export const sendSms = async (phoneNumber:string) => Promise.resolve();
export const sendEmailCode = async (email:string) => Promise.resolve();
export const checkSmsCode = async (code:string) => Promise.resolve();
export const checkEmailCode = async (code:string) => Promise.resolve();