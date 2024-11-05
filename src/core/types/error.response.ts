class ErroBase {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

class BadRequest extends ErroBase {
    constructor(message: string) {
        super(400, message || "Bad Request");
    }
}

class Unauthorized extends ErroBase {
    constructor(message: string) {
        super(401, message || "Unauthorized");
    }
}

class Forbidden extends ErroBase {
    constructor(message: string) {
        super(403, message || "Forbidden");
    }
}

class NotFound extends ErroBase {
    constructor(message: string) {
        super(404, message || "Not Found");
    }
}
class Conflict extends ErroBase {
    constructor(message: string) {
        super(409, message || "Conflict");
    }
}

export { ErroBase, BadRequest, Unauthorized, Forbidden, NotFound, Conflict };
