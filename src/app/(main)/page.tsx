import AllCommunities from '@/components/communities/AllCommunities'
import FollowedCommunities from '@/components/communities/FollowedCommunities'
import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'
import { buttonVariants } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const Home = async () => {
  return (
    <div>
      <AllCommunities />
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* feed */}
        <CustomFeed />

        {/* sub info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="size-4" />
              Home
            </p>
          </div>

          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">Ask your questions away!</p>
            </div>

            <FollowedCommunities />

            <Link
              href="/r/create"
              className={buttonVariants({ className: 'w-full mt-4 mb-6' })}
            >
              Create Subject
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
