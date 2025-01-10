'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateSubcuitPayload } from '@/lib/validators/subcuit'
import { toast } from '@/hooks/use-toast'

const Page = () => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const { mutate: createSubject, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubcuitPayload = {
        name: input
      }
      const { data } = await axios.post('/api/subcuit', payload)
      return data as string
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Subject already exists',
            description: 'Please try a different name',
            variant: 'destructive'
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid name',
            description: 'Please choose a name with 3 and 21 characters',
            variant: 'destructive'
          })
        }

        if (err.response?.status === 401) {
          return toast({
            title: 'Unauthorized',
            description: 'Please login to create a subject',
            variant: 'destructive'
          })
        }
      }

      toast({
        title: 'There was an error',
        description: 'Could not create subject',
        variant: 'destructive'
      })
    },
    onSuccess: data => {
      router.push(`/r/${data}`)
    }
  })

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a subject</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Create a subject you like to start a conversation in
          </p>

          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createSubject()}
          >
            Create Subject
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
