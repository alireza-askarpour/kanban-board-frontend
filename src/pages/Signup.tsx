import SignUpForm from "components/Forms/SignUpForm"
import { Helmet } from "components/Shared"

const Signup = () => {
  return (
    <Helmet title="Signup page">
      <div className="grid place-items-center min-h-screen bg-gray-50">
        <SignUpForm />
      </div>
    </Helmet>
  )
}

export default Signup
