import { z } from 'zod'

export const loginValidation = z.object({
    email: z.string().email(),
    name: z.string(),
    profile: z.string()
})