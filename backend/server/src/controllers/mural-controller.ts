import { Router, Request, Response, NextFunction } from 'express';
import Mural from '../models/mural'
import * as util from 'util'
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { ErrorResponse } from '../models/responses/error-response';

class MuralController {
    router: Router;

    constructor() {
        this.router = Router();
        this.defineRoutes();
    }

    async getMurals(req: Request, res: Response): Promise<void> {

        try {
            let murals = await Mural.find({})
            res.status(200);
            res.json(murals)
        } catch (err) {
            res.status(500);
            res.json(new ErrorResponse(`Error getting murals: ${err}`));
        }

    }

    async getMural(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id;

        try {
            let mural = await Mural.findById(id);
            mural ? res.status(200) : res.status(404);
            res.json(mural);
        } catch (err) {
            res.status(500);
            res.json(new ErrorResponse(`Error getting mural ${id}: ${err}`));
        }
    }

    async createMural(req: Request, res: Response): Promise<void> {
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

        try {
            const newMural = await mural.save();
            res.status(201);
            res.json(newMural)
        } catch (err) {
            res.status(500);
            res.json(new ErrorResponse(`Error creating mural: ${err}`))
        }
    }

    async updateMural(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id;

        let updateData = {
            title: req.body.title,
            description: req.body.description,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        };

        try {
            let mural = await Mural.findByIdAndUpdate(id,
                _.pickBy(updateData),
                { new: true });

            res.status(200);
            res.json(mural);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    }

    async deleteMural(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id;

        try {
            const mural = await Mural.findOneAndRemove({ _id: id });
            res.status(200);
            res.json(mural);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
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