'use client'

import { toast } from '@/hooks/use-toast'
import { CommentRequest } from '@/lib/validators/comment'

import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

interface CreateCommentProps {
  postId: string
  replyToId?: string
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId }

      const { data } = await axios.patch(`/api/subcuit/post/comment/`, payload)
      return data
    },

    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            title: 'You need to be logged in to comment.',
            description: 'Please log in to comment on posts.',
            variant: 'destructive'
          })
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: "Comment wasn't created successfully. Please try again.",
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      router.refresh()
      setInput('')
    }
  })

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateComment
