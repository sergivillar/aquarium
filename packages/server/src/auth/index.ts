import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.use(
    'singup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, done: Function) => {
            // TODO: check if user already exists by email
            try {
                const user = await User.create({email, password});
                console.log('User', {user});
                return done(null, user);
            } catch (error) {
                console.log('errors', error);
                done(error);
            }
        }
    )
);
