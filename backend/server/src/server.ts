import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser'
import MuralController from './controllers/mural-controller';

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
        this.app.use('/api/v1/murals', MuralController);
    }  
}

export default new Server().app;