import { z } from 'zod'

export const updateUser = z.object({
    name: z.object({
        first_name: z.string().optional(),
        last_name: z.string().optional()
    }).optional(),
    preferences: z.object({
        dark: z.boolean().optional()
    }).optional(),
    address: z.object({
        shipping_address: z.string().optional(),
        billing_address: z.string().optional()
    }).optional(),
    phone: z.number().optional(),
    profile_icon: z.string().optional()
})

export const cartUser = z.object({
    _id: z.string().optional(),
    product_id: z.string().optional(),
    add: z.boolean()
})

export const orderUser = z.object({
    product_id: z.string(),
    variation_id: z.string().optional(),
    paid: z.boolean(),
    payment: z.object({
        signature: z.string(),
        id: z.string(),
        amount: z.number()
    }),
})

export const updateOrderUser = z.object({
    paid: z.boolean(),
    _id: z.string()
})

export const trackUser = z.object({
    completed: z.boolean(),
    title: z.string(),
    description: z.string()
})

export const productValidation = z.object({
    content: z.object({
        images: z.array(z.string()),
        videos: z.array(z.string()).optional()
    }),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    category: z.object({ parent: z.string(), child: z.string() }),
    sku: z.string(),
    price: z.object({
        selling: z.number(),
        actual: z.number()
    }),
    inStock: z.boolean(),
    specification: z.array(z.object({ name: z.string(), value: z.string() }))
})
export const updateProductValidation = z.object({
    _id: z.string(),
    content: z.object({
        images: z.array(z.string()).optional(),
        videos: z.array(z.string()).optional()
    }),
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.object({ parent: z.string().optional(), child: z.string().optional() }).optional(),
    sku: z.string().optional(),
    price: z.object({
        selling: z.number().optional(),
        actual: z.number().optional()
    }).optional(),
    inStock: z.boolean().optional(),
    specification: z.array(z.object({ name: z.string().optional(), value: z.string().optional() }).optional())
})

export const commentValidation = z.object({
    user_id: z.string(),
    product_id: z.string(), 
    content: z.string(),
    rating: z.number()
})

export const bannerValidation = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    button: z.object({
        title: z.string(),
        link: z.string()
    })
})