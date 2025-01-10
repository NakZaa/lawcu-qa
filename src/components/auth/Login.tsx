import { Scale } from 'lucide-react'
import { CardWrapper } from './CardWrapper'

export const Login = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Back"
      backButtonHref="/welcome"
      showSocial
    >
      <div className="flex justify-center items-center">
        <Scale width={124} height={124} />
      </div>
      <p className="text-center text-sm text-gray-500">
        By continuing, you are setting up a Breadit account and agree to our{' '}
        <a className="underline cursor-pointer">User Agreement</a> and{' '}
        <a className="underline cursor-pointer">Privacy Policy</a>.
      </p>
    </CardWrapper>
  )
}
