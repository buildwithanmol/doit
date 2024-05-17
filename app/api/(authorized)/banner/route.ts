import { Banner } from "@/modals/banner.modal";
import { connectDB } from "@/utils/database";
import { bannerValidation } from "@/utils/validations";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        
        const banners = await Banner.find().limit(100);

        if (banners.length === 0) {
            return NextResponse.json({ success: false, message: 'No banners found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: banners }, { status: 200 });
    } catch (error) {
        console.log('[BANNER_GET_ERR]', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}
export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        if (!bannerValidation.safeParse(body).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        };

        await connectDB();

        const banner = await Banner.create(body);

        return NextResponse.json({ success: true, message: 'Banner created', data: banner }, { status: 200 })

    } catch (error) {
        console.log('[BANNER_GET_ERR]', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}
export const DELETE = async (request: NextRequest) => {
    try {
        const bannerId = request.nextUrl.searchParams.get('id');
        
        if (!bannerId) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();
        const banner = await Banner.deleteOne({ _id: bannerId });
        if (banner.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'Banner failed to delete' }, { status: 404 })
        }
        return NextResponse.json({ success: true, message: 'Banner deleted' }, { status: 200 })
    } catch (error) {
        console.log('[BANNER_GET_ERR]', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}