import { Icons } from '@/svgs/Icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'
import { cn } from '@/lib/utils'

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto size-8" />
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn('text-3xl font-semibold')}>
            Law <span className="text-[#D95F8C]">Chula</span>
          </h1>
          <p className="text-muted-foreground text-sm pb-12">Welcome back!</p>
        </div>

        {/* form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700 pt-4">
          By continuing, you agree to our{' '}
          <a className="underline cursor-pointer">User Agreement</a> and{' '}
          <a className="underline cursor-pointer">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}

export default SignIn
