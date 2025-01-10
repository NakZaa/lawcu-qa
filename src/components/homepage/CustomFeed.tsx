import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import db from '@/lib/db'
import PostFeed from '../PostFeed'
import { currentUser } from '@/lib/auth'
import { auth } from '@/auth'
import { notFound } from 'next/navigation'

const CustomFeed = async () => {
  const session = await auth()

  // only rendered if session exists, so this will not happen
  if (!session) return notFound()

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      subcuit: true
    }
  })

  const posts = await db.post.findMany({
    where: {
      subcuit: {
        name: {
          in: followedCommunities.map(sub => sub.subcuit.name)
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subcuit: true
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS
  })

  return <PostFeed initialPosts={posts} />
}

export default CustomFeed
