import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Variation', required: false },
    paid: Boolean,
    payment: {
        signature: String,
        id: String,
        amount: Number
    }
});

export const Order = models?.Order || model('Order', OrderSchema)