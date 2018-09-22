import passport from 'passport';
import passportLocal from 'passport-local';
import models from '../models';
import {validatePassword, UserInstance} from '../models/user';
import APIError from '../errors';

const LocalStrategy = passportLocal.Strategy;

passport.use(
    'singup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, done: Function) => {
            try {
                if (await models.User.findOne({where: {email}})) {
                    return done(new APIError('User already exists', 400));
                }

                const user = await models.User.create({email, password});
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = (await models.User.findOne({where: {email}})) as UserInstance;

                if (!user) {
                    return done(new APIError('User not found', 400));
                }

                const validate = await validatePassword(password, user.password);
                if (!validate) {
                    return done(new APIError('Wrong password', 400));
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
