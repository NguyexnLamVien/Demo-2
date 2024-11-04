import { Forbidden, Unauthorized } from '@core/types/errorHandler';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenMiddleware = (req: any, res: Response, next: NextFunction): void => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        throw new Unauthorized("Authorization header missing");
    }

    const token = authHeader;
    if (!token) {
        throw new Unauthorized('Authorization header missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
        req.header = decoded;
        next();
    } catch (error) {
        throw new Forbidden('Invalid token');
    }
};


export { authenMiddleware };
