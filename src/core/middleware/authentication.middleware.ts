import { Forbidden, Unauthorized } from '@core/types/error.response';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const authenMiddleware = (req: any, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    if (!token) {
        throw new Unauthorized('Authorization header missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
        req['userId'] = decoded.userId;
        next();
    } catch (error) {
        next(error);
    }
};


export { authenMiddleware };
