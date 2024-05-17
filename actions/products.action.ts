import { Product } from "@/modals/product.modal";
import { connectDB } from "@/utils/database";

export const get_products = async (limit: number, offset: number, category?: string, subcategory?: string) => {
    try {
        await connectDB();

        if (category) {
            const data = await Product.find({ 'category.parent': category }).limit(limit).skip(offset);
            return data;
        } else if (subcategory) {
            const data = await Product.find({ 'category.child': subcategory }).limit(limit).skip(offset);
            return data;
        };

        const data = await Product.find().limit(limit).skip(offset);

        if (data.length === 0) {
            return null;
        }

        return data;

    } catch (error) {
        return null;
    }
}