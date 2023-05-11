import { Button } from "../components/Shared"

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-around">
      <div className="flex flex-col justify-center lg:items-start items-center mb-10 lg:pl-6 text-primary order-2 lg:order-1">
        <h2 className="text-5xl lg:text-6xl font-semibold mb-4">Oops!</h2>
        <h2 className="text-2xl lg:text-4xl font-semibold mb-3">Pages Not Found</h2>
        <p>This page doesn't exist or was removed!</p>
        <p className="mb-5">We suggest you back to home</p>
        <Button href="/" variant="primary">Back to Home</Button>
      </div>
      <div className="grid place-items-center lg:order-2">
        <img src="/not-found-page.gif" className="w-full" alt="Not Found Page" />
      </div>
    </div>
  )
}

export default NotFound
