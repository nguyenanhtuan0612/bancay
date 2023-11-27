import { NextFunction, Response } from 'express';
import { Options, RequestWithOptions } from '@/interfaces/request.interface';
import { Filter, Order } from '@/dtos/query.dto';
import { validation } from '@/utils/validators';
import { Op } from 'sequelize';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { ExceptionWithMessage } from '@/exceptions/HttpException';

const generateWhere = (filter: Filter) => {
    const { prop, operator, value } = filter;
    //console.log(operator);
    switch (operator) {
        case 'eq': {
            return { [prop]: value };
        }
        case 'not': {
            return { [prop]: { [Op.not]: value } };
        }
        case 'lt': {
            return { [prop]: { [Op.lt]: value } };
        }
        case 'lte': {
            return { [prop]: { [Op.lte]: value } };
        }
        case 'gt': {
            return { [prop]: { [Op.gt]: value } };
        }
        case 'gte': {
            return { [prop]: { [Op.gte]: value } };
        }
        case 'like': {
            return { [prop]: { [Op.like]: `%${value}%` } };
        }
        case 'iLike': {
            return { [prop]: { [Op.iLike]: `%${value}%` } };
        }
        case 'between': {
            if (!Array.isArray(value)) {
                return { [prop]: value };
            }
            return { [prop]: { [Op.between]: value } };
        }
        case 'in': {
            if (!Array.isArray(value)) {
                return { [prop]: value };
            }
            return { [prop]: { [Op.in]: value } };
        }
        case 'notIn': {
            if (!Array.isArray(value)) {
                return { [prop]: value };
            }
            return { [prop]: { [Op.notIn]: value } };
        }
        default: {
            return { [prop]: value };
        }
    }
};

const generateOrder = (order: Order) => {
    const { prop, direction } = order;
    return [prop, direction.toUpperCase()];
};

@Injectable()
export class QueryMiddleware implements NestMiddleware {
    async use(req: RequestWithOptions, res: Response, next: NextFunction) {
        try {
            const { limit, offset, filter, order } = req.query;
            const options: Options = {
                offset: Number(offset) || 0,
                limit: Number(limit) || 10,
                where: {},
                order: [],
            };

            const filterArr = filter ? JSON.parse(filter.toString()) : [];
            if (Array.isArray(filterArr)) {
                for (const iterator of filterArr) {
                    const { valid, message } = await validation(
                        Filter,
                        iterator,
                    );
                    if (!valid) {
                        next(
                            new ExceptionWithMessage(
                                errors.FILTER_INVALID,
                                400,
                                'Filter error: ' + message,
                            ),
                        );
                    }
                    options.where = Object.assign(
                        options.where,
                        generateWhere(iterator),
                    );
                }
            }

            const orderArr = order ? JSON.parse(order.toString()) : [];
            if (Array.isArray(orderArr)) {
                for (const iterator of orderArr) {
                    const { valid, message } = await validation(
                        Order,
                        iterator,
                    );
                    if (!valid) {
                        next(
                            new ExceptionWithMessage(
                                errors.ORDER_INVALID,
                                400,
                                'Order error: ' + message,
                            ),
                        );
                    }
                    options.order.push(generateOrder(iterator));
                }
            }
            console.log(options);

            req.options = options;
            next();
        } catch (error) {
            next(error);
        }
    }
}
