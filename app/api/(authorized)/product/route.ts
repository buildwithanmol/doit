import { Product } from "@/modals/product.modal";
import { connectDB } from "@/utils/database";
import { productValidation, updateProductValidation } from "@/utils/validations";
import { UpdateWriteOpResult } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Add Admin Authentication here

export const POST = async (request: NextRequest): Promise<NextResponse<{
    success: boolean,
    message: string,
    data?: any
}>> => {
    try {
        const body = await request.json();

        if (!productValidation.safeParse(body).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();

        const product = await Product.create(body);

        return NextResponse.json({ success: true, message: 'Product created', data: product }, { status: 200 })
    } catch (error) {
        console.log('[PRODUCT_GET_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}

export const PATCH = async (request: NextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: UpdateWriteOpResult }>> => {
    try {
        const body = await request.json();

        if (!updateProductValidation.safeParse(body).success) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        }

        await connectDB();
        
        const product_data = await Product.findOne({ _id: body._id });

        const new_object = {
            title: body.title || product_data?.title,
            description: body.description || product_data?.description,
            tags: body.tags || product_data?.tags,
            category: body.category || product_data?.category,
            sku: body.sku || product_data?.sku,
            price: body.price || product_data?.price,
            inStock: body.inStock || product_data?.inStock,
            specification: body.specification || product_data?.specification,
            content: body.content || product_data?.content,
        }

        const product_update = await Product.updateOne({ _id: body._id }, {
            $set: new_object
        });

        return NextResponse.json({ success: true, message: 'Product updated', data: product_update }, { status: 200 })

    } catch (error) {
        console.log('[PRODUCT_GET_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}

export const DELETE = async (request: NextRequest): Promise<NextResponse<{ success: boolean, message: string, data?: { acknowledged: boolean, deletedCount: number } }>> => {
    try {
        const id = request.nextUrl.searchParams.get('id')

        if (!id) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
        };

        const product = await Product.deleteOne({ _id: id });
        
        return NextResponse.json({ success: true, message: 'Product deleted', data: product }, { status: 200 })

    } catch (error) {
        console.log('[PRODUCT_GET_ERR]', error)
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}