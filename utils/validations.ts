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