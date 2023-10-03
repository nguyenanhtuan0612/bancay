import { appConfigs } from '@/config';

export const errors = {
    FILTER_INVALID: {
        detail: '{{filter.inValid}}',
        code: 1,
    },
    ORDER_INVALID: {
        detail: '{{order.inValid}}',
        code: 2,
    },
    INVALIDATION_FAIL: {
        code: 3,
    },
    LOGIN_ERROR_UNAUTHORIZE: {
        detail: '{{token.unAuthorize}}',
        code: 4,
    },
    EMAIL_EXIST: {
        code: 5,
        detail: '{{email.isAlreadeExist}}',
    },
    LOGIN_ERROR_MISSING: {
        detail: '{{token.isMissing}}',
        code: 6,
    },
    SEQUELIZE_ERROR: {
        code: 7,
        detail: '{{sequelize.error}}',
    },
    LIMIT_FILE_TYPE: {
        message: 'Only accept filetypes: ',
        code: 8,
        detail: '{{upload.wrongType}}',
    },
    FILE_NOT_FOUND: {
        message: 'File not found',
        code: 9,
        detail: '{{file.notFound}}',
    },
    USER_ROLE_INVALID: {
        code: 10,
        detail: '{{user.roleInvalid}}',
    },
    USERNAME_PASSWORD_INVALID: {
        code: 11,
        detail: '{{login.usernameOrPasswordInvalid}}',
    },
    FORBIDDEN_RESOURCE: {
        code: 12,
        detail: '{{permisson.forbiddenResource}}',
    },
    RECORD_NOT_FOUND: {
        code: 13,
        detail: '{{record.notFound}}',
    },
    OTP_NOT_EXPIRED: {
        code: 16,
        detail: '{{otp.otpSentYetToExpire}}',
    },
    ACCOUNT_NOT_FOUND: {
        code: 17,
        detail: '{{teacher.notFound}}',
    },
    TRANSACTION_NOT_FOUND: {
        code: 20,
        detail: '{{transaction.notFound}}',
    },
    TRANSACTION_PAID: {
        code: 21,
        detail: '{{transaction.cantCancel}}',
    },
    TRANSACTION_TYPE_NOT_FOUND: {
        code: 22,
        detail: '{{transaction.typeNotFound}}',
    },
    UPLOAD_ERROR: {
        message: 'Upload fail',
        code: 23,
        detail: '{{upload.fail}}',
    },
    LIMIT_FILE_SIZE: {
        message:
            'File size must be lessthan ' + appConfigs().limitFileSize + ' MB',
        code: 24,
        detail: '{{file.tooLarge}}',
    },
    USER_NOT_FOUND: {
        code: 25,
        detail: '{{user.notFound}}',
    },
    CURRENT_PASSWORD_NOT_MATCH: {
        code: 28,
        detail: '{{password.notMatch}}',
    },
    INVALID_SIGNATURE: {
        code: 29,
        detail: '{{signature.invalid}}',
    },
    NOTHING_IN_CART: {
        code: 30,
        detail: '{{cart.nothingInCart}}',
    },
};
