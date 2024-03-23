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

const sendSms = async (phoneNumber:string) => Promise.resolve();
const sendEmailCode = async (email:string) => Promise.resolve();
const checkSmsCode = async (code:string) => Promise.resolve();
const checkEmailCode = async (code:string) => Promise.resolve();