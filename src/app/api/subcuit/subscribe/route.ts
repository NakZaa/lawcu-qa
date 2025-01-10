import { currentUser } from '@/lib/auth'
import db from '@/lib/db'
import { SubcuitSubscriptionValidator } from '@/lib/validators/subcuit'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const loggedInUser = await currentUser()

    if (!loggedInUser) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { subcuitId } = SubcuitSubscriptionValidator.parse(body)

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subcuitId,
        userId: loggedInUser.id
      }
    })

    if (subscriptionExists) {
      return new Response('You are already subscribed', { status: 400 })
    }

    await db.subscription.create({
      data: {
        subcuitId,
        userId: loggedInUser.id
      }
    })

    return new Response(subcuitId)
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed.', { status: 422 })
    }

    return new Response('Could not subscribe', { status: 500 })
  }
}
