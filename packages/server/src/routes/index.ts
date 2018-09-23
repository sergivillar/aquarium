import express, {Request, Response} from 'express';
import passport from 'passport';
import {createToken} from '../models/user';
import APIError from '../errors';

const router = express.Router();

router.post('/singup', (req: Request, res: Response, next) => {
    passport.authenticate('singup', {session: false}, async (err, user, info) => {
        if (err || !user) {
            return next(new APIError(err || info.message || info, 400));
        }
        return res.status(201).json({
            token: await createToken(user, 'MY_SECRET'),
        });
    })(req, res);
});

router.post('/login', (req: Request, res: Response, next) => {
    passport.authenticate('login', {session: false}, async (err, user, info) => {
        if (err || !user) {
            return next(new APIError(err || info.message || info, 400));
        }
        return res.status(201).json({
            token: await createToken(user, 'MY_SECRET'),
        });
    })(req, res);
});

export default router;
