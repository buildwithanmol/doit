import mongoose, { Schema, model, models } from 'mongoose';

const TrackSchema = new Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    isDelivered: Boolean,
    tracking: [{ title: String, description: String, status: { completed: Boolean, pending: Boolean } }]
});

export const Track = models?.Track || model('Track', TrackSchema)