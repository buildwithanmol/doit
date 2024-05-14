import { Schema, model, models } from 'mongoose';

const VideoSchema = new Schema({
    secure_url: String
});

export const Video = models?.Video || model('Video', VideoSchema)