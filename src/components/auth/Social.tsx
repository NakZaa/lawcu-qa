'use client'

import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { Icons } from '@/svgs/Icons'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export const Social = () => {
  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: '/'
    })
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google', {
        callbackUrl: '/'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Problem!',
        description: 'An error occurred while signing in.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      {/* <Button
        size="lg"
        variant="outline"
        className="w-full gap-2"
        onClick={() => onClick('google')}
      >
        <Icons.google className="w-5 h-5" /> Login with Google
      </Button> */}
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="lg"
        variant="outline"
        className="w-full gap-2"
      >
        {isLoading ? null : <Icons.google className="w-8 h-8" />} Login with
        Chula Account
      </Button>
    </div>
  )
}
