import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser'
import * as jwt from 'jsonwebtoken'
import Config from './config/config'
import MuralController from './controllers/mural-controller';
import AuthController from './controllers/auth-controller'

export class Server {
    app: express.Application;

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }
    
    public config() {
        //setup mongoose
        mongoose.connect('mongodb://localhost/dallas-art-map');
        
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}));
    }
    
    public routes(): void {
        let router = express.Router();
        
        this.app.use('/', router);
        this.app.use('/api/v1/murals', this.verifyAuthToken, MuralController);
        this.app.use('/api/v1/auth', AuthController);
    }

    private verifyAuthToken(req: express.Request, res: express.Response, next) {
        const bearerHeader = req.headers.authorization;

        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            jwt.verify(bearerToken, Config.JWT.SECRET, (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    req.headers.authenticatedPrincipal = authData;
                    next();
                }
            })
        } else {
            res.sendStatus(403);
        }
    }
}

export default new Server().app;