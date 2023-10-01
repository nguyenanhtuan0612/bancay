/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (
        value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length
    ) {
        return true;
    } else {
        return false;
    }
};

function getMailFromSmsVCB(data: string) {
    try {
        const one = data.split('.CT')[0];
        const two = one.split('.');
        if (two.length == 6) {
            return `${two[3]}.${two[4].replace(' ', '@')}.${two[5]}`;
        }
        return `${two[3].replace(' ', '@')}.${two[4]}`;
    } catch (error) {
        return null;
    }
}

function getMailFromSmsMBB(data: string) {
    try {
        const one = data.split('; tai Napas')[0];
        const two = one.split(' ');
        if (two.length == 6) {
            return `${two[2]}.${two[3]}@${two[4]}.${two[5]}`;
        }
        return `${two[2]}@${two[3]}.${two[4]}`;
    } catch (error) {
        return null;
    }
}

function getMailForm3(data: string) {
    try {
        const emailRegex = /\S+@\S+/;
        const email = data.match(emailRegex);
        return email[0];
    } catch (error) {
        return null;
    }
}

const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

export function getEmailFromSms(data: string) {
    switch (true) {
        case regexEmail.test(getMailFromSmsVCB(data)):
            return getMailFromSmsVCB(data);
        case regexEmail.test(getMailFromSmsMBB(data)):
            return getMailFromSmsMBB(data);
        case regexEmail.test(getMailForm3(data)):
            return getMailForm3(data);
        default:
            return null;
    }
}

/**
 * @method parseBool
 * @param {any} data
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const parseBool = (data: any): boolean => {
    return data == 'true' ? true : false;
};
