import { auth } from '@/auth'
import db from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await auth()

  let followedCommunitiesIds: string[] = []

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        subcuit: true
      }
    })

    followedCommunitiesIds = followedCommunities.map(sub => sub.subcuit.id)
  }

  try {
    const { limit, page, subcuitName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subcuitName: z.string().nullish().optional()
      })
      .parse({
        subcuitName: url.searchParams.get('subcuitName'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page')
      })

    let whereClause = {}

    if (subcuitName) {
      whereClause = {
        subcuit: {
          name: subcuitName
        }
      }
    } else if (session) {
      whereClause = {
        subcuit: {
          id: {
            in: followedCommunitiesIds
          }
        }
      }
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        subcuit: true,
        votes: true,
        author: true,
        comments: true
      },
      where: whereClause
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
