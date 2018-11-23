import passport from 'passport';
import passportLocal from 'passport-local';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import validator from 'validator';
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
        async (
            email: string,
            password: string,
            done: (error: string | null, user?: UserInstance) => void
        ) => {
            if (!validator.isEmail(email)) {
                return done('Email has an invalid format');
            }

            if (password.length < 6 || password.length > 12) {
                return done('Password length must be between 6 and 12');
            }

            try {
                if (await models.User.findOne({where: {email}})) {
                    return done('User already exists');
                }

                const user = (await models.User.create({email, password})) as UserInstance;
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
                if (!validator.isEmail(email)) {
                    return done('Email has an invalid format');
                }

                const user = (await models.User.findOne({where: {email}})) as UserInstance;

                if (!user) {
                    return done('User not found');
                }

                const validate = await validatePassword(password, user.password);
                if (!validate) {
                    return done('Wrong email or password');
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await models.User.findById(jwtPayload.id, {raw: true});
                return done(null, user);
            } catch (e) {
                return done(e);
            }
        }
    )
);
