
declare type WithID = {
    _id: import('mongoose').Types.ObjectId
};



type Params = {
    body?: object,
    params?: object,
    query?: object,
    localObj?: object
}
declare module Express {
    type Request = {
        userId: string
    }
}

declare type ContracterRouter<T extends Params> = import('express').RequestHandler< T['params'] extends undefined ? {} : T['params'], any, T['body'] extends undefined ? {} : T['body'], T['query'] extends undefined ? {} : T['query']>