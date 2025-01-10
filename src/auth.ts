import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from './lib/db'
import authConfig from './auth.config'
import { nanoid } from 'nanoid'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: '/auth/login', error: '/auth/error' },
  callbacks: {
    async signIn({ account, profile }) {
      if (
        account &&
        account.provider === 'google' &&
        profile?.email?.endsWith('@student.chula.ac.th')
      ) {
        return true
      }

      return false
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email }
      })

      if (!dbUser) {
        token.id = user!.id as string
        return token
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id
          },
          data: {
            username: nanoid(10)
          }
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username
      }
    },
    redirect() {
      return '/'
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
