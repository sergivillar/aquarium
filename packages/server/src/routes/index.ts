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
            token: await createToken(user),
        });
    })(req, res);
});

router.post('/login', (req: Request, res: Response, next) => {
    passport.authenticate('login', {session: false}, async (err, user, info) => {
        if (err || !user) {
            return next(new APIError(err || info.message || info, 400));
        }
        return res.status(201).json({
            token: await createToken(user),
        });
    })(req, res);
});

router.post('/graphql', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || info) {
            return next(new APIError(err || info.message || info, 401));
        }

        if (!user) {
            return next(new APIError('JWT not related to any user', 401));
        }

        if (user) {
            req.user = user;
        }

        next();
    })(req, res, next);
});

export default router;
