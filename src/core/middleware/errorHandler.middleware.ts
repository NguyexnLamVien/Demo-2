import { ErroBase } from '@core/types/errorHandler';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: ErroBase, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ErroBase) {
        res.status(err.status).send(err.message);
    } else {
        res.status(500).send("An error occurred while processing the request");
    }
}

export { errorHandler };