import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string(),
  price: z.number().nonnegative().default(0),
  stock: z.number().nonnegative().default(0),
  category: z.string().min(3, "Category is needed"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  image: z.url()
})

export const ProductUpdateSchema = ProductSchema.partial()

export type ProductInput = z.infer<typeof ProductSchema>
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>
