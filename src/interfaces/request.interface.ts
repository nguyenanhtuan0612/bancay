import { Request } from 'express';

export interface Options {
    where?: any;
    limit: number;
    offset: number;
    order?: any[];
}

export interface RequestWithOptions extends Request {
    options: Options;
}

export interface IImportAccountFileData extends Request {
    email: string;
    password: string;
    coin: number;
    like: number;
    follower: number;
    title: string;
    subTitle: string;
    price: number;
    image: string;
    link: string;
}
