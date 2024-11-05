import { Request, Response } from 'express';

// bảo trì
class SuccessResponse {
    public status: number;
    public message: string;
    public data: any;

    constructor(message: string, status: number, data: any = {}) {
        this.message = message;
        this.status = status;
        this.data = this.data;
    }

    send(res: Response) {
        return res.status(this.status).json({ message: this.message, data: this.data });
    }
}


class OK extends SuccessResponse {
    constructor(message: string, data: any = {}) {
        super(message, 200, data);
    }
}

class Created extends SuccessResponse {
    constructor(message: string, data: any = {}) {
        super(message, 201, data);
    }
}

export { OK, Created };
