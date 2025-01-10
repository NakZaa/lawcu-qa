import { auth } from '@/auth'
import MiniCreatePost from '@/components/MiniCreatePost'
import PostFeed from '@/components/PostFeed'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import db from '@/lib/db'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const page = async ({ params }: PageProps) => {
  const { slug } = params

  const session = await auth()

  const subcuit = await db.subcuit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subcuit: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS
      }
    }
  })

  if (!subcuit) return notFound()

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">r/{subcuit.name}</h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subcuit.posts} subcuitName={subcuit.name} />
    </>
  )
}

export default page
