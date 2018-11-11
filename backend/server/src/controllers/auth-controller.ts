import * as jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express';
import Config from '../config/config'
import User from '../models/user'
import { ErrorResponse } from '../models/responses/error-response';

class AuthController {
    router: Router;

    constructor() {
        this.router = Router();
        this.defineRoutes();
    }

    async login(req: Request, res: Response): Promise<void> {        
        const username = req.body.username;
        const password = req.body.password;

        try {
            let user = await User.findOne({ username: username });

            if(!user) {
                res.status(404);
                res.json(new ErrorResponse('User not found'));
                return;
            }

            let isPasswordMatch = await user.comparePassword(password);

            if (!isPasswordMatch) {
                res.status(422);
                res.json(new ErrorResponse('Invalid Password'));
                return;
            }

            jwt.sign({ username: user.username, role: user.role }, Config.JWT.SECRET, { expiresIn: '1h' }, (err, token) => {
                if (!err) {
                    res.json({ token });
                } else {
                    res.status(500);
                    res.json(new ErrorResponse(`Failed to sign token`));
                }
            });
        } catch (err) {
            res.status(500);

            res.json(new ErrorResponse(`Failed to retrieve user ${username} : ${err}`))
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const email: string = req.body.email;
        const username: string = req.body.username;
        const password: string = req.body.password;
        const role: string = req.body.role;

        const user = new User({
            email,
            username,
            password,
            role
        });

        try {
            const newUser = await user.save();
            res.status(201);
            res.json(newUser);
        } catch (err) {
            res.status(500);
            res.json(new ErrorResponse(`Error creating user: ${err}`));
        }
    }

    defineRoutes() {
        this.router.post('/login', this.login);
        this.router.post('/users', this.createUser);
    }
}

const authController = new AuthController();
export default authController.router;
