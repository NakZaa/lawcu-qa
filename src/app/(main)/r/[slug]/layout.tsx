import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle'
import ToFeedButton from '@/components/ToFeedButton'
import { buttonVariants } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import db from '@/lib/db'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const Layout = async ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{
    slug: string
  }>
}) => {
  const { slug } = await params
  const loggedInUser = await currentUser()

  const subcuit = await db.subcuit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true
        }
      }
    }
  })

  const subscription = !loggedInUser
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subcuit: {
            name: slug
          },
          user: {
            id: loggedInUser.id
          }
        }
      })

  const isSubscribed = !!subscription

  if (!subcuit) return notFound()

  const memberCount = await db.subscription.count({
    where: {
      subcuit: {
        name: slug
      }
    }
  })

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-6">
      <div>
        {/* Button Back */}
        <ToFeedButton />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>

          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit mt-20 rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About r/{subcuit.name}</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={subcuit.createdAt.toDateString()}>
                    {format(subcuit.createdAt, 'd MMMM, yyyy')}
                  </time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{memberCount}</div>
                </dd>
              </div>
              {subcuit.creatorId === loggedInUser?.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You created this community.</p>
                </div>
              ) : null}

              {subcuit.creatorId !== loggedInUser?.id ? (
                <SubscribeLeaveToggle
                  subcuitId={subcuit.id}
                  subcuitName={subcuit.name}
                  isSubscribed={isSubscribed}
                />
              ) : null}
              <Link
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-full mb-6'
                })}
                href={`/r/${slug}/submit`}
              >
                Create Post
              </Link>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
