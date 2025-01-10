import type { Post, Subcuit, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  subcuit: Subcuit
  votes: Vote[]
  author: User
  comments: Comment[]
}
