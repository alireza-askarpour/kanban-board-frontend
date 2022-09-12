import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"

import { validateNotWhitespaceOnly } from "utils"
import * as accountService from "services/account.service"
import { USERNAME_PATTERN, EMAIL_PATTERN } from "constants/regex"

import Icon from "components/Shared/Icon/Icon"
import Input from "components/Shared/Input/Input"
import Button from "components/Shared/Button/Button"

import Logo from "public/logo.png"

let timer

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isValidating },
  } = useForm()

  const onSubmit = async (values) => {
    if (isValidating) return
    setIsLoading(true)
    toast.loading("Registering")

    const res = await accountService.signUpUser(values)

    if (res.success) {
      setIsLoading(false)
      localStorage.setItem("token", res.token)
      toast.dismiss()
      toast.success("Your account has been successfully created")
      timer = setInterval(() => router.push("/"), 2000)
    } else {
      toast.dismiss()
      setIsLoading(false)

      const usernameAlreadyExists = res.error.response.data.messages?.username
      const emailAlreadyExists = res.error.response.data.messages?.email

      if (usernameAlreadyExists) toast.error(usernameAlreadyExists)
      else if (emailAlreadyExists) toast.error(emailAlreadyExists)
      else toast.error("There is a problem on the server side")
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div className="w-full grid place-items-center py-8">
        <div className="w-80">
          <header className="grid place-items-center">
            <div className="bg-[#151515] p-5 rounded-full w-20 h-20 mb-6">
              <img src={Logo.src} alt="logo" className="w-full h-full select-none" />
            </div>
            <h1 className="text-2xl mb-6 font-medium text-gray-600">Sign up to Kanban</h1>
          </header>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="mb-3"
              placeholder="Full Name"
              register={register("fullname", { required: true, validate: validateNotWhitespaceOnly })}
              icon={
                <Icon
                  name="user"
                  size={20}
                  color="gray"
                  className="absolute transform -translate-y-1/2 top-1/2 left-3"
                />
              }
            />
            <Input
              className="mb-3"
              placeholder="Username"
              register={register("username", { required: true, minLength: 3, pattern: USERNAME_PATTERN })}
              icon={
                <Icon
                  name="user"
                  size={20}
                  color="gray"
                  className="absolute transform -translate-y-1/2 top-1/2 left-3"
                />
              }
            />
            <Input
              className="mb-3"
              placeholder="Email"
              register={register("email", { required: true, pattern: EMAIL_PATTERN })}
              icon={
                <Icon
                  name="sms"
                  size={20}
                  color="gray"
                  className="absolute transform -translate-y-1/2 top-1/2 left-3"
                />
              }
            />
            <Input
              type="password"
              placeholder="Password"
              className="mb-5"
              register={register("password", { required: true, minLength: 8 })}
              icon={
                <Icon
                  name="lock"
                  size={20}
                  color="gray"
                  className="absolute transform -translate-y-1/2 top-1/2 left-3"
                />
              }
            />
            <Button variant="primary" className="mb-4" type="submit" loading={isLoading}>
              Sign up
            </Button>
            <p className="text-[15px] text-center text-gray-600 mb-3">Do you have a Kanban account?</p>
            <Button variant="outline-primary" href="/login">
              Sign in to account
            </Button>
          </form>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  )
}

export default SignUpForm
