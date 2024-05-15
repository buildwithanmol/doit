import { Track } from "@/modals/track.modal";
import { IOrder } from "@/types";
import { connectDB } from "@/utils/database";
import { trackUser } from "@/utils/validations";
import { UpdateWriteOpResult } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { orderId: string } }): Promise<NextResponse<{
    success: boolean,
    message: string,
    data?: IOrder[]
}>> => {
    try {
        const id = params.orderId;

        if (!id) {
            return NextResponse.json({ success: false, message: 'Id not provided' }, { status: 400 })
        }

        await connectDB();

        const orders = await Track.find({ order_id: id }).populate('order_id');

        if (orders.length === 0) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Order found', data: orders }, { status: 200 })

    } catch (error) {
        console.log('[ORDER_GET_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}

export const POST = async (request: NextRequest, { params }: { params: { orderId: string } }): Promise<NextResponse<{
    success: boolean,
    message: string,
    data?: UpdateWriteOpResult
}>> => {
    try {
        const id = params.orderId;

        if (!id) {
            return NextResponse.json({ success: false, message: 'Id not provided' }, { status: 400 })
        }

        const body = await request.json();

        if (!trackUser.safeParse(body).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();

        const track = await Track.updateOne({ order_id: id }, {
            $push: {
                tracking: {
                    title: body.title,
                    description: body.description,
                    status: {
                        completed: body.completed,
                        pending: !body.completed
                    }
                }
            }
        })

        return NextResponse.json({ success: true, message: 'Order found', data: track }, { status: 200 });

    } catch (error) {
        console.log('[ORDER_POST_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}