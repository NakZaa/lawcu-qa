import { Icons } from '@/svgs/Icons'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { currentUser } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'
import SearchBar from './SearchBar'

const Navbar = async () => {
  const loggedInUser = await currentUser()

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6 mb-0.5" />
          <p className="hidden text-zinc-700 text-2xl font-medium md:block">
            Law <span className="text-[#D95F8C]">Chula</span>
          </p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {loggedInUser ? (
          <UserAccountNav user={loggedInUser} />
        ) : (
          <Link href="/auth/login" className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
