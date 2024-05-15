import { Favorite } from "@/modals/favourite.modal";
import { ExtendedNextRequest, ICart } from "@/types";
import { connectDB } from "@/utils/database";
import { cartUser } from "@/utils/validations";
import { NextResponse } from "next/server";

export const GET = async (request: ExtendedNextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: ICart[] }>> => {
    try {
        const id = request.headers.get('userId');
        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        };
        await connectDB();

        const cart = (await Favorite.find({ user_id: id }).populate('product_id'));

        if (cart.length === 0) {
            return NextResponse.json({ success: false, message: 'No cart found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Favorite found', data: cart }, { status: 200 })

    } catch (error) {
        console.log('[FAVORITE_GET_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}

export const PATCH = async (request: ExtendedNextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: ICart }>> => {
    try {
        const id = request.headers.get('userId');
        console.log(id)
        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const data = await request.json();

        if (!cartUser.safeParse(data).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        const { add, product_id, _id } = data;

        await connectDB();

        if (Boolean(add)) {
            const data = await Favorite.create({
                user_id: id,
                product_id
            });
            return NextResponse.json({ success: true, message: 'Product added to cart', data }, { status: 200 })
        }

        const cart = await Favorite.deleteOne({ _id });

        if (cart.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'Favorite not found/deleted' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Product removed' }, { status: 200 })

    } catch (error) {
        
        console.log('[FAVORITE_PATCH_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
        
    }
}