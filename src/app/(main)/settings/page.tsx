import { auth } from '@/auth'
import { UserNameForm } from '@/components/UsernameForm'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-12">
        <div className="grid items-start gap-8">
          <h1 className="font-bold text-3xl md:text-4xl">Settings</h1>

          <div className="grid gap-10">
            <UserNameForm
              user={{
                id: session.user.id,
                username: session.user.username || ''
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
