import mongoose from "mongoose";
import { NextRequest } from "next/server";

interface ExtendedNextRequest extends NextRequest {
    userId?: string
}

interface IUser {
    name: {
        first_name: string,
        last_name: string
    },
    preferences: {
        dark: boolean
    },
    address: {
        shipping_address: string,
        billing_address: string
    },
    phone: number,
    profile_icon: string
}

interface ICart {
    product_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId
}

interface IOrder {
    user_id: mongoose.Schema.Types.ObjectId,
    product_id: mongoose.Schema.Types.ObjectId,
    paid: boolean,
    payment: {
        signature: string,
        id: string,
        amount: number
    },
    variation_id?: mongoose.Schema.Types.ObjectId,
    track: mongoose.Schema.Types.ObjectId
}

export enum ContentType {
    IMAGE = 'image',
    VIDEO = 'video'
}