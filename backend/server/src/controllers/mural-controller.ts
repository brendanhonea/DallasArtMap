import { Router, Request, Response, NextFunction } from 'express';
import Mural from '../models/mural'
import * as util from 'util'
import { Model } from 'mongoose';

export class MuralController {
    router: Router;

    constructor() {
        this.router = Router();
        this.defineRoutes();
    }

    getMurals(req: Request, res: Response): void {
        Mural.find({})
            .then(data => {
                res.status(200);

                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    getMural(req: Request, res: Response): void {
        const id: string = req.params.id;

        Mural.findById(id)
            .then(data => {
                if (data) {
                    res.status(200);
                } else {
                    res.status(404);
                }

                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    createMural(req: Request, res: Response): void {
        const latitude: string = req.body.latitude;
        const longitude: string = req.body.longitude;
        const title: string = req.body.title;
        const description: string = req.body.description;

        const mural = new Mural({
            title,
            description,
            latitude,
            longitude
        });


        console.log('creating new mural: ', mural);

        mural.save()
            .then(mural => {
                res.status(201);

                const status = res.statusCode;
                res.json({
                    status,
                    mural
                })
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    updateMural(req: Request, res: Response): void {
        const id: string = req.params.id;

        Mural.findById(id)
            .then(mural => {
                const title: string = req.body.title ? req.body.title : mural.title;
                const description: string = req.body.description ? req.body.description : mural.description;
                const latitude: string = req.body.latitude ? req.body.latitude : mural.description;
                const longitude: string = req.body.longitude ? req.body.longitude : mural.description;
                mural = new Mural({
                    title,
                    description,
                    latitude,
                    longitude
                })


                mural.save()
                .then(mural => {
                    res.status(200);
                    const status = res.statusCode;
                    res.json({
                        status,
                        mural
                    })
                })
                .catch(err => {
                    res.status(500);

                    const status = res.statusCode;
                    res.json({
                        status,
                        err
                    })
                });
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    deleteMural(req: Request, res: Response): void {
        const id: string = req.params.id;

        Mural.findOneAndRemove({ _id: id })
            .then(data => {
                res.status(200);
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                res.status(500);
                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    defineRoutes() {
        this.router.get('/', this.getMurals);
        this.router.get('/:id', this.getMural);
        this.router.post('/', this.createMural);
        this.router.put('/:id', this.updateMural);
        this.router.delete('/:id', this.deleteMural);
    }
}

const muralController = new MuralController();

export default muralController.router;