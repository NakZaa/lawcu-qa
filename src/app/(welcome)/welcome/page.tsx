import { LoginButton } from '@/components/auth/LoginButton'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl">Login to</h2>
        <h1 className="text-4xl font-bold pb-2">
          Law <span className="text-[#D95F8C]">Chula</span>
        </h1>
        <div>
          <LoginButton asChild>
            <Button size="lg">Login with Chula Account</Button>
          </LoginButton>
        </div>
      </div>
    </div>
  )
}
