import { IUser } from '@interfaces/users.interface';
import { Request } from 'express';
import { Options } from './request.interface';

export interface DataStoredInToken {
    id: number;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request {
    auth: IUser;
}

export interface RequestWithUserOption extends Request {
    auth: IUser;
    options: Options;
}

export interface JwtInfo {
    accessToken: string;
    refreshToken: string;
    tokenExpiresIn: string;
    refreshTokenExpiresIn: string;
}
