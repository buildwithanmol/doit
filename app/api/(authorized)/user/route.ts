import { User } from "@/modals/user.modal";
import { ExtendedNextRequest, IUser } from "@/types";
import { connectDB } from "@/utils/database";
import { updateUser } from "@/utils/validations";
import { UpdateWriteOpResult } from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const GET = async (request: ExtendedNextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: IUser }>> => {
    try {
        const id = request.headers.get('userId');
        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        };

        await connectDB();

        const user = await User.find({ _id: id });

        if (user.length === 0) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'User found', data: user[0] }, { status: 200 })
    } catch (error) {
        console.log('[USER_GET_ERR]', error)
        return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
    }
}

export const PATCH = async (request: ExtendedNextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: UpdateWriteOpResult }>> => {
    try {
        const id = request.headers.get('userId');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        };

        const data = await request.json();

        if (!updateUser.safeParse(data).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();

        const user = await User.find({ _id: id });

        if (user.length === 0) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
        }

        const new_object: IUser = {
            name: {
                first_name: data?.first_name || user[0].name.first_name,
                last_name: data?.last_name || user[0].name.last_name,
            },
            preferences: {
                dark: data?.dark || user[0]?.preferences?.dark
            },
            address: {
                shipping_address: data?.shipping_address || user[0]?.address?.shipping_address,
                billing_address: data?.billing_address || user[0]?.address?.billing_address,
            },
            phone: Number(data?.phone) || user[0]?.phone,
            profile_icon: data?.profile_icon || user[0]?.profile_icon,
        }

        const update = await User.updateOne({
            _id: id
        }, {
            $set: new_object
        })

        if (update.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: 'Update Failed' }, { status: 500 })
        }

        return NextResponse.json({ success: true, message: 'User updated', data: update }, { status: 200 });

    } catch (error) {
        console.log('[USER_PATCH_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}

export const DELETE = async (request: ExtendedNextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: { acknowledged: boolean, deletedCount: number } }>> => {
    try {
        const id = request.headers.get('userId');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        };

        await connectDB();

        const user = await User.deleteOne({ _id: id });

        if (user.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'User failed to delete' }, { status: 404 })
        }


        cookies().delete('user-session');

        return NextResponse.json({ success: true, message: 'User deleted', data: user }, { status: 200 })

    } catch (error) {
        console.log('[USER_DELETE_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}