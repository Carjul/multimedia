import { Schema } from 'mongoose';

export const MultimediaSchema = new Schema({
    description: { type: String, required: true },
    file: { type: Object, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
});
