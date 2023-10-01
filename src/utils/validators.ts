import { plainToClass } from 'class-transformer';
import {
    validate,
    ValidationError,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsValueFilter implements ValidatorConstraintInterface {
    validate(data: any) {
        return (
            typeof data === 'number' ||
            typeof data === 'string' ||
            Array.isArray(data)
        );
    }

    defaultMessage() {
        return '($value) must be number, string or array';
    }
}

export const validation = async (
    type: any,
    value: string | number | object,
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): Promise<{ valid: boolean; message: string }> => {
    return validate(plainToClass(type, value), {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
            const message = errors
                .map((error: ValidationError) =>
                    Object.values(error.constraints),
                )
                .join(', ');

            return { valid: false, message };
        } else {
            return { valid: true, message: 'null' };
        }
    });
};
