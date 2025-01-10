'use client'

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { BackButton } from './BackButton'
import { Header } from './Header'
import { Social } from './Social'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="space-y-4">
        {children}

        {showSocial && <Social />}
      </CardContent>
      <CardFooter className="flex flex-col mx-auto">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
