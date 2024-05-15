import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Variation', required: false },
    track: {type: mongoose.Schema.Types.ObjectId, ref: "Track"},
    paid: Boolean,
    payment: {
        signature: String,
        id: String,
        amount: Number
    },
});

export const Order = models?.Order || model('Order', OrderSchema)