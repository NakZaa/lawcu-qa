import { currentUser } from '@/lib/auth'
import db from '@/lib/db'
import { PostValidator } from '@/lib/validators/post'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const loggedInUser = await currentUser()

    if (!loggedInUser) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { subcuitId, title, content } = PostValidator.parse(body)

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subcuitId,
        userId: loggedInUser.id
      }
    })

    if (!subscriptionExists) {
      return new Response('Subscribe to post', { status: 400 })
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: loggedInUser.id,
        subcuitId
      }
    })

    return new Response('OK')
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed.', { status: 422 })
    }

    return new Response('Could not post at this time.', { status: 500 })
  }
}
