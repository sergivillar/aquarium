import {Request, Response} from 'express';
import APIerror from '../errors';

const errorMiddleware = (error: APIerror, _: Request, res: Response, next: Function) => {
    if (!error.code) error.code = 500;
    res.status(error.code).send({message: error.message});

    next(error);
};

export {errorMiddleware};
