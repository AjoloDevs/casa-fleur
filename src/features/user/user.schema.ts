import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string(),
  city: z.string().min(3, "City must be at least 3 characters"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  orders: z.number().int().nonnegative().default(0),
  totalSpent: z.number().nonnegative().default(0),
})

export const UserUpdateSchema = UserSchema.partial()

export type UserInput = z.infer<typeof UserSchema>
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>
