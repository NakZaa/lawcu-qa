'use client'

import { cn } from '@/lib/utils'
import { FC, useState } from 'react'
import { Button } from '../ui/button'
import { Icons } from '@/svgs/Icons'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
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
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="lg"
        variant="outline"
        className="w-full gap-2"
      >
        {isLoading ? null : <Icons.google className="w-8 h-8" />} Google
      </Button>
    </div>
  )
}

export default UserAuthForm
