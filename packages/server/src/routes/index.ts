import express, {Request, Response} from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/singup', (req: Request, res: Response, next) => {
    passport.authenticate('singup', {session: false}, (err, user, info) => {
        if (err || !user) {
            return next(err);
            // return res.send(err);
        }

        // TODO: generate JWT
        return res.status(201).json({
            message: ' OK',
        });
    })(req, res);
});
// router.post('/login', passport.authenticate('singup', {session: false}));

export default router;
