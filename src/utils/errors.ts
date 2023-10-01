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
    BALANCE_NOT_ENOUGH: {
        code: 27,
        detail: '{{balance.notEnough}}',
    },
    CURRENT_PASSWORD_NOT_MATCH: {
        code: 28,
        detail: '{{password.notMatch}}',
    },
    INVALID_SIGNATURE: {
        code: 29,
        detail: '{{signature.invalid}}',
    },
    LESSON_NOT_FOUND: {
        code: 30,
        detail: '{{lesson.notFound}}',
    },
    TOO_EARLY_TO_JOIN_LESSON: {
        code: 31,
        detail: '{{lesson.tooEarlyToJoin}}',
    },
    SCHEDULE_HAS_NO_LESSON: {
        code: 32,
        detail: '{{schedule.hasNoLesson}}',
    },
    LESSON_HAS_ENDED: {
        code: 33,
        detail: '{{lesson.hasEnded}}',
    },
    MUST_COMPLETE_TRIAL_LESSON: {
        code: 34,
        detail: '{{schedule.trialLessonNotDone}}',
    },
    PACKAGE_NOT_FOUND: {
        code: 35,
        detail: '{{package.notFound}}',
    },
    SCHEDULE_NUMBER_HOUR_TOO_MUCH: {
        code: 36,
        detail: '{{schedule.numberHourTooMuch}}',
    },
    RATING_NOT_FOUND: {
        code: 37,
        detail: '{{rating.notFound}}',
    },
    REMARK_ALREADY_EXIST: {
        code: 38,
        detail: '{{rating.remarkAlreadyExist}}',
    },
    YOU_DO_NOT_HAVE_PERMISSON: {
        code: 39,
        detail: '{{permisson.youDoNotHavePermission}}',
        message:
            'Only teachers and students of the class can see the information',
    },
    YOU_HAVE_NOT_JOINED_NO_WITHDRAW_PROGRAM: {
        code: 40,
        detail: '{{noWithdrawProgram.youHaveNotJoined}}',
    },
    YOU_ALREADY_JOIN_NO_WITHDRAW_PROGRAM_180DAYS: {
        code: 41,
        detail: '{{noWithdrawProgram.youAlreadyJoin180Days}}',
    },
    NOT_ENOUGH_HOUR: {
        code: 42,
        detail: '{{schedule.notEnoughHour}}',
    },
    INVALID_PROMOTION_INFO: {
        code: 43,
        detail: '{{promotion.invalidPromotionInfo}}',
        message: 'percentDiscount or amountDiscount is invalid',
    },
    PROMOTION_CODE_EXIST: {
        code: 44,
        detail: '{{promotion.promotionCodeExist}}',
    },
    PROMOTION_CODE_INVALID_OR_EXPIRED: {
        code: 45,
        detail: '{{promotion.promotionCodeInvalidOrExpired}}',
    },
    PROMOTION_CODE_HAS_BEEN_USE_UP: {
        code: 46,
        detail: '{{promotion.codeHasBeenUseUp}}',
    },
    YOU_ALREADY_USED_THIS_CODE: {
        code: 47,
        detail: '{{promotion.youAlreadyUsedThisCode}}',
    },
    HOUR_LEARNED_NOT_ENOUGH: {
        code: 48,
        detail: '{{rating.hourLearnedNotEnough}}',
    },
    AFFILIATE_CODE_ERROR: {
        code: 49,
        detail: '{{affiliate.somethingWentWrong}}',
    },
    YOU_ALREADY_JOIN_NO_WITHDRAW_PROGRAM: {
        code: 50,
        detail: '{{noWithdrawProgram.youAlreadyJoin}}',
    },
    PROGRAM_IS_INVALID: {
        code: 51,
        detail: '{{noWithdrawProgram.isInvalid}}',
    },
    HOUR_LEARNED_NOT_FOUND: {
        code: 52,
        detail: '{{rating.hourLearnedNotFound}}',
    },
    SCHEDULE_NOT_FOUND: {
        code: 53,
        detail: '{{schedule.notFound}}',
    },
    LESSON_WENT_ON_FOR_MORE_THAN_30_MINUTES: {
        code: 54,
        detail: '{{lesson.wentOnForMoreThan30Minutes}}',
    },
    STUDENT_HAVE_ALREADY_JOINED_ROOM: {
        code: 55,
        detail: '{{student.haveAlreadyJoinedRoom}}',
    },
    CAN_NOT_CANCEL_SCHEDULE: {
        code: 56,
        detail: '{{schedule.canNotCancel}}',
    },
    USER_TEACHER_LINK_NOT_FOUND: {
        code: 57,
        detail: '{{userTeacherLink.notFound}}',
    },
    TRANSACTION_NOT_FREE: {
        code: 58,
        detail: '{{transaciton.notFree}}',
    },
    WITHDRAW_TYPE_INVALID: {
        code: 59,
        detail: '{{withdraw.typeInvalid}}',
    },
    WITHDRAW_AMOUNT_IS_NOT_ENOUGH: {
        code: 60,
        detail: '{{withdraw.amountIsNotEnough}}',
    },
    WITHDRAW_INSUFFICIENT_BALANCE: {
        code: 61,
        detail: '{{withdraw.insufficientBalance}}',
    },
    WITHDRAW_INFO_INVALID: {
        code: 62,
        detail: '{{withdraw.infoInvalide}}',
    },
    WITHDRAW_REQUEST_NOT_FOUND: {
        code: 63,
        detail: '{{withdraw.requestNotFound}}',
    },
    TRANSACTIONPAYMENT_NOT_FOUND: {
        code: 64,
        detail: '{{transactionPayment.notFound}}',
    },
    REQUEST_CHANGE_BALANCE_ERROR: {
        code: 65,
        detail: '{{admin.requestChangeBalanceError}}',
    },
    DELETE_USER_ERROR: {
        code: 66,
        detail: '{{admin.deleteUserError}}',
    },
    SET_PERMISSION: {
        code: 67,
        detail: '{{admin.setPermissionError}}',
    },
    CAN_ONLY_RESCHEDULE_4_HOURS_IN_ADVANCE: {
        code: 68,
        detail: '{{schedule.canOnlyReschedule4HoursInAdvance}}',
    },
    CAN_ONLY_DELETE_SCHEDULE_4_HOURS_IN_ADVANCE: {
        code: 69,
        detail: '{{schedule.canOnlyDeleteSchedule4HoursInAdvance}}',
    },
    LESSON_IS_STILL_GOING_ON: {
        code: 70,
        detail: '{{schedule.lessonIsStillGoingOn}}',
    },
};
