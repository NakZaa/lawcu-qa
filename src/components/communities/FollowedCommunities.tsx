import { auth } from '@/auth'
import db from '@/lib/db'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Users } from 'lucide-react'

const FollowedCommunities = async () => {
  const session = await auth()
  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id
    },
    include: {
      subcuit: true
    }
  })

  const communities = followedCommunities.map(sub => sub.subcuit.name)

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-bold py-3">Followed Subjects</h1>
      <div className="flex flex-col gap-1.5 w-full">
        {communities.map((community, index) => (
          <Link
            href={`/r/${community}`}
            key={index}
            className="items-start w-full justify-start text-start p-2 max-w-sm rounded-lg transition-all inline-flex gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="mr-2 h-4 w-4" />
            r/{community}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FollowedCommunities
