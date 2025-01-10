import { currentUser } from '@/lib/auth'
import db from '@/lib/db'
import { SubcuitValidator } from '@/lib/validators/subcuit'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const loggedInUser = await currentUser()
    if (!loggedInUser) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = SubcuitValidator.parse(body)

    const subcuitExists = await db.subcuit.findFirst({
      where: {
        name
      }
    })

    if (subcuitExists) {
      return new Response('Subcuit already exists', { status: 409 })
    }

    const subcuit = await db.subcuit.create({
      data: {
        name,
        creatorId: loggedInUser.id
      }
    })

    await db.subscription.create({
      data: {
        userId: loggedInUser.id,
        subcuitId: subcuit.id
      }
    })

    return new Response(subcuit.name)
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create', { status: 500 })
  }
}
