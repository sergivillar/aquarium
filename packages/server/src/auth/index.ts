import passport from 'passport';
import passportLocal from 'passport-local';
import models from '../models';
import {validatePassword, UserInstance} from '../models/user';

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
                    return done('User already exists');
                }

                const user = await models.User.create({email, password});
                return done(null, user);
            } catch (error) {
                return done(error.errors[0].message);
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
                    return done('User not found');
                }

                const validate = await validatePassword(password, user.password);
                if (!validate) {
                    return done('Wrong password');
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
