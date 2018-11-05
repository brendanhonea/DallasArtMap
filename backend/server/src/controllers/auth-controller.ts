import * as jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express';
import Config from '../config/config'

class AuthController {
    router: Router;

    constructor() {
        this.router = Router();
        this.defineRoutes();
    }

    login(req: Request, res: Response): any {
        const user = {
            id: 1,
            email: "brendan@test.com",
            username: "brendan"
        }

        jwt.sign({ user: user }, Config.JWT.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (typeof err !== 'undefined') {
                res.json({ token });
            } else {
                res.sendStatus(500);
            }
        });
    }

    defineRoutes() {
        this.router.post('/login', this.login);
    }
}

const authController = new AuthController();
export default authController.router;
