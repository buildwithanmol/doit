import mongoose, { Schema, model, models } from 'mongoose';

const FavoriteSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

export const Favorite = models?.Favorite || model('Favorite', FavoriteSchema)