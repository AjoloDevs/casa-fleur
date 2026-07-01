import { z } from 'zod'

export const PromotionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  code: z.string().toUpperCase(),
  discount: z.number().min(0).max(100),
  type: z.enum(['cupon']),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean(),
  currentUsage: z.number().int().nonnegative(),
  usageLimit: z.number().int().positive(),
  status: z.enum(['Activo', 'Inactivo']),
  minimumPurchase: z.string().regex(/^\$\d+$/, 'Must be a currency format (e.g., $899)'),
  segment: z.string(),
  condition: z.string(),
  views: z.number().int().nonnegative(),
  conversions: z.number().int().nonnegative(),
});
export const PromotionUpdateSchema = PromotionSchema.partial()

export type PromotionInput = z.infer<typeof PromotionSchema>
export type PromotionUpdateInput = z.infer<typeof PromotionUpdateSchema> 
