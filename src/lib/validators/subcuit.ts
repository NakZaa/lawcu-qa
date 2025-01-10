import { z } from 'zod'

export const SubcuitValidator = z.object({
  name: z.string().min(3).max(21)
})

export const SubcuitSubscriptionValidator = z.object({
  subcuitId: z.string()
})

export type CreateSubcuitPayload = z.infer<typeof SubcuitValidator>
export type SubscribeToSubcuitPayload = z.infer<
  typeof SubcuitSubscriptionValidator
>
