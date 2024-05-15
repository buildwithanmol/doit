import { Order } from "@/modals/order.modal";
import { Track } from "@/modals/track.modal";
import { IOrder } from "@/types";
import { connectDB } from "@/utils/database";
import { orderUser, updateOrderUser } from "@/utils/validations";
import { UpdateWriteOpResult } from "mongoose";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        const id = request.headers.get('userId');

        if(!id) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }

        await connectDB();

        const orders = await Order.find({ user_id: id }).populate('track').populate('product_id');

        if(orders.length === 0) {
            return NextResponse.json({success: false, message: "Orders not found"}, {status: 404})
        }

        return NextResponse.json({success: false, message: 'Orders found', data: orders}, {status: 200})

    } catch (error) {
        console.log('[ORDER_GET_ERR]', error)
        return NextResponse.json({success: false, message: 'Server Error'}, {status: 500})
    }
}

export const POST = async (request: NextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: IOrder }>> => {
    try {
        const id = request.headers.get('userId');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json();

        if (!orderUser.safeParse(body).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();

        let orderObject: {
            user_id: string,
            product_id: string,
            paid: boolean,
            payment: {
                signature: string,
                id: string,
                amount: number
            },
            variation_id?: string
        } = {
            user_id: id,
            product_id: body.product_id,
            paid: body?.paid,
            payment: {
                signature: body?.payment?.signature,
                id: body?.payment?.id,
                amount: Number(body?.payment?.amount)
            },
        }

        if (body.variation_id) {
            orderObject.variation_id = body.variation_id
        };

        const order = await Order.create(orderObject);

        const tracking = order && await Track.create({
            order_id: order._id,
            isDelivered: false,
            tracking: [{
                title: 'Order Placed',
                description: 'Thanks for shopping with us',
                status: { completed: true, pending: false }
            }]
        })

        tracking && await Order.updateOne({ _id: order._id }, {
            $set: {
                track: tracking._id
            }
        });

        return NextResponse.json({ success: true, message: 'Order placed successfully', data: order }, { status: 200 })

    } catch (error) {
        console.log('[ORDER_POST_ERROR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}

export const PATCH = async (request: NextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: UpdateWriteOpResult }>> => {
    try {

        // Implement Admin Auth here

        const body = await request.json();

        if (!updateOrderUser.safeParse(body).success) {
            return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
        }

        await connectDB();

        const order = await Order.updateOne({ _id: body._id }, {
            $set: {
                paid: body.paid
            }
        });

        if(order.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: 'Order not updated/found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Order updated', data: order }, { status: 200 })

    } catch (error) {
        console.log('[ORDER_PATCH_ERROR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}