import express, {Request, Response} from 'express';
import passport from 'passport';
import {createToken, createRefreshToken, verifyToken} from '../models/user';
import APIError from '../errors';
import models from '../models';

const router = express.Router();

router.post('/singup', (req: Request, res: Response, next) => {
    passport.authenticate('singup', {session: false}, async (err, user, info) => {
        if (err || !user) {
            return next(new APIError(err || info.message || info, 400));
        }
        return res.status(201).json({
            token: await createToken(user),
            refreshToken: await createRefreshToken(user),
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
            refreshToken: await createRefreshToken(user),
        });
    })(req, res);
});

router.post('/token', async (req: Request, res: Response, next) => {
    const {email, refreshToken} = req.body;

    if (!email || !refreshToken) {
        return next(new APIError('No token or email to refresh token', 400));
    }

    try {
        await verifyToken(refreshToken);
    } catch (error) {
        return next(new APIError('Refresh token expired. Please login again', 401));
    }

    let user;
    try {
        user = await models.User.findOne({where: {email, refreshToken}});
    } catch (error) {
        return next(new APIError('Token or email invalid. Please login again', 401));
    }

    if (!user) {
        return next(new APIError('Token or email invalid. Please login again', 401));
    }

    return res.status(201).json({
        token: await createToken(user),
    });
});

router.use('/graphql', (req, res, next) => {
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
