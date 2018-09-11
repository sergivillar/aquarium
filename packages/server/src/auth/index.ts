import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/user';
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
                if (User.findOne({email})) {
                    return done(new APIError('User already exists', 400));
                }

                const user = await User.create({email, password});
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);
