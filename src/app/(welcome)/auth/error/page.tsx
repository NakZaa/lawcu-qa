import { ErrorCard } from '@/components/auth/ErrorCard'

const AuthErrorPage = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <ErrorCard />
      </div>
    </div>
  )
}

export default AuthErrorPage
