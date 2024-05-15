import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    content: {
        images: [String],
        videos: [String]
    },
    title: String,
    description: String,
    tags: [String],
    category: {parent: String, child: String},
    sku: String,
    price: {
        selling: Number,
        actual: Number
    },
    inStock: Boolean,
    specification: [{ name: String, value: String }]
});

export const Product = models?.Product || model('Product', ProductSchema)