import { Schema, model, models } from 'mongoose';

const ImageSchema = new Schema({
    secure_url: String
});

export const Image = models?.Image || model('Image', ImageSchema)