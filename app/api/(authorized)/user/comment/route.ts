import { Order } from "@/modals/order.modal";
import { Comment } from "@/modals/comment.modal";
import { NextRequest, NextResponse } from "next/server";
import { commentValidation } from "@/utils/validations";
import { connectDB } from "@/utils/database";

export const POST = async (request: NextResponse): Promise<NextResponse<{ success: boolean, message: string, data?: any }>> => {
    try {
        const id = request.headers.get('userId');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        };

        const body = await request.json();

        if (!commentValidation.safeParse(body).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        await connectDB();

        const check = await Order.find({ user_id: id, product_id: body.product_id });

        if (check.length === 0) {
            return NextResponse.json({ success: false, message: 'User not allowed to comment' }, { status: 404 });
        }

        const comment = await Comment.create({
            user_id: id,
            product_id: body.product_id,
            content: body.content,
            rating: body.rating
        });

        return NextResponse.json({ success: true, message: 'Comment created', data: comment }, { status: 200 });

    } catch (error) {
        console.log('[COMMENT_POST_ERR]', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: any }>> => {
    try {
        const id = request.headers.get('userId');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const commentId = request.nextUrl.searchParams.get('commentId');

        if (!commentId) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        };

        await connectDB();

        const comment = await Comment.deleteOne({ _id: commentId });

        if (comment.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'Comment not found/deleted' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Comment deleted' }, { status: 200 });

    } catch (error) {
        console.log('[COMMENT_DELETE_ERR]', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}