import { Response } from 'express';

interface ResponseData {
    message: string;
    metadata?: any;
}

class SuccessResponse {
    public status: number;
    public message: string;
    public metadata: any;

    constructor({ message, metadata = {} }: ResponseData, status: number) {
        this.status = status;
        this.message = message;
        this.metadata = metadata;
    }

    send(res: Response) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }: ResponseData) {
        super({ message, metadata }, 200);
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, metadata }: ResponseData) {
        super({ message, metadata }, 201);
    }
}

export { OK, CREATED };
