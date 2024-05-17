import { Image } from "@/modals/image.modal";
import { Video } from "@/modals/video.modal";
import { ContentType } from "@/types";
import { connectDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { secure_url, type }: { secure_url: string, type: ContentType } = await request.json();

        if (!secure_url || !type) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();

        if (type === ContentType.IMAGE) {
            const data = await Image.create({ secure_url });
            return NextResponse.json({ success: true, message: 'Uploaded successfully', data })
        } else if (type === ContentType.VIDEO) {
            const data = await Video.create({ secure_url });
            return NextResponse.json({ success: true, message: 'Uploaded successfully', data })
        }

        return NextResponse.json({ success: false, message: 'Invalid type' }, { status: 400 })

    } catch (error) {
        console.log('[CONTENT_POST_ERR]', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { _id, type }: { _id: string, type: ContentType } = await request.json();

        if (!_id || !type) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();

        if (type === ContentType.IMAGE) {
            const data = await Image.deleteOne({ _id });
            return NextResponse.json({ success: true, message: 'Content deleted successfully', data })
        } else if (type === ContentType.VIDEO) {
            const data = await Video.deleteOne({ _id });
            return NextResponse.json({ success: true, message: 'Content deleted successfully', data })
        }

        return NextResponse.json({ success: false, message: 'Invalid type' }, { status: 400 })

    } catch (error) {
        console.log('[CONTENT_POST_ERR]', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}