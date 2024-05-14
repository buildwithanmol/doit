import { Schema, model, models } from 'mongoose';

const BannerSchema = new Schema({
    title: String,
    description: String,
    image: String,
    button: {
        title: String,
        link: String
    }
});

export const Banner = models?.Banner || model('Banner', BannerSchema)