import {isEmail, isPhone} from "./helpers";

describe("isPhone", () => {
    it('works for correct phone', () => {
        expect(isPhone('89998887766')).toBe(true);
    })
    it('works for not correct phone', () => {
        expect(isPhone('899988877aa')).toBe(false);
    })
})

describe("isEmail", () => {
    it('works for correct email', () => {
        expect(isEmail('user@bla.bla')).toBe(true);
    })
    it('works for not correct phone', () => {
        expect(isEmail('adasdasdasd')).toBe(false);
    })
})