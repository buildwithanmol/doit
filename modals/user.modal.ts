import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        first_name: String,
        last_name: String
    },
    email: { type: String, required: true, unique: true },
    preferences: {
        dark: Boolean
    },
    address: {
        shipping_address: String,
        billing_address: String
    },
    phone: Number,
    profile_icon: String
});

export const User = models?.User || model('User', UserSchema)