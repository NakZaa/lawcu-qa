import { auth } from '@/auth'
import db from '@/lib/db'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Users } from 'lucide-react'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'

const AllCommunities = async () => {
  const session = await auth()
  const allCommunities = await db.subcuit.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      name: true,
      posts: true,
      subscribers: true
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS
  })

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-2xl py-3">Discover Subjects</h1>
      <div className="grid grid-flow-row auto-rows-max gap-2 pb-6">
        {allCommunities.map((community, index) => (
          <Link
            href={`/r/${community.name}`}
            key={index}
            className="items-center justify-center text-center p-2 w-full max-w-sm rounded-lg transition-all inline-flex gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="mr-2 h-4 w-4" />
            r/{community.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllCommunities
