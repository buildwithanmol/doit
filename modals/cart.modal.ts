import mongoose, { Schema, model, models } from 'mongoose';

const CartSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

export const Cart = models?.Cart || model('Cart', CartSchema)