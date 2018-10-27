import { Schema, Document, model } from 'mongoose';


export interface IMuralModel extends Document {
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string,
    latitude: number,
    longitude: number
}

let MuralSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,

    title: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    latitude: {
        type: Number,
        default: '',
        required: true
    },
    longitude: {
        type: Number,
        default: '',
        required: true
    }
});

export default model<IMuralModel>('Mural', MuralSchema);