import { auth } from '@/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: '4MB'
    },
    video: {
      maxFileSize: '64MB',
      maxFileCount: 1
    }
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth()

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized')
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user?.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    })
} satisfies FileRouter

export type AppFileRouter = typeof fileRouter
