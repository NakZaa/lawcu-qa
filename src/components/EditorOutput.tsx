'use client'

import dynamic from 'next/dynamic'
import { FC } from 'react'
import CustomImageRenderer from './renderers/CustomImageRenderer'
import CustomCodeRenderer from './renderers/CustomCodeRenderer'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem'
  }
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
//  const parsedContent = typeof content.block as string

  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  )
}

export default EditorOutput
