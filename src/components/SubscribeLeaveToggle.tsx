'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from './ui/button'
import { SubscribeToSubcuitPayload } from '@/lib/validators/subcuit'
import { FC, startTransition } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeLeaveToggleProps {
  subcuitId: string
  subcuitName: string
  isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subcuitId,
  subcuitName,
  isSubscribed
}) => {
  const router = useRouter()

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubcuitPayload = {
        subcuitId
      }

      const { data } = await axios.post('/api/subcuit/subscribe', payload)
      return data as string
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast({
            title: 'Oops!',
            description: 'You must be logged in to subscribe',
            variant: 'destructive'
          })
        }
      }

      return toast({
        title: 'Oops!',
        description: 'Something went wrong',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      toast({
        title: 'Subscribed!',
        description: `You have successfully subscribed to r/${subcuitName}`
      })
    }
  })

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubcuitPayload = {
        subcuitId
      }

      const { data } = await axios.post('/api/subcuit/unsubscribe', payload)
      return data as string
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast({
            title: 'Oops!',
            description: 'You must be logged in to subscribe',
            variant: 'destructive'
          })
        }
      }

      return toast({
        title: 'Oops!',
        description: 'Something went wrong',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      toast({
        title: 'Unsubscribed!',
        description: `You have successfully unsubscribed to r/${subcuitName}`
      })
    }
  })

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => unsubscribe()}
      isLoading={isUnsubLoading}
    >
      Leave subject
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => subscribe()}
      isLoading={isSubLoading}
    >
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle
