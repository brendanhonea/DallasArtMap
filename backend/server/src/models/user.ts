import { Schema, Document, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

interface IUserModal extends Document {
    createdAt: Date,
    updatedAt: Date,
    email: string,
    username: string,
    password: number,
    role: number
    comparePassword: Function;
}

let UserSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,

    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    }
});

//WILL NOT WORK ON UPDATE, MUST USE SAVE
UserSchema.pre('save', async function (next) {
    let user: any = this;

    if (!user.isModified('password')) return next();

    try {
        let hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
        user.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = function (candidatePassword): Promise<boolean> {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) rej(err);
            res(isMatch);
        });
    })
}

export default model<IUserModal>('User', UserSchema);