import mongoose, { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    content: String, 
    rating: Number
});

export const Comment = models?.Comment || model('Comment', CommentSchema)