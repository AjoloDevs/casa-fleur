import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(3, "Minimo de 3 caracteres"),
  email: z.string().email(),
  password: z.string().min(6),
  numberPhone: z.string().min(10),
  city: z.string().min(5)
})

export const UserUpdateSchema = UserSchema.partial()

export type UserInput = z.infer<typeof UserSchema>
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>
