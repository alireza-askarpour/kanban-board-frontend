import SignUpForm from "../components/Forms/SignUpForm"
import AuthLayout from "../components/Layouts/AuthLayout"
import { Helmet } from "../components/Shared"

const Signup = () => {
  return (
    <AuthLayout>
      <Helmet title="Signup page">
        <div className="grid place-items-center min-h-screen bg-gray-50">
          <SignUpForm />
        </div>
      </Helmet>
    </AuthLayout>
  )
}

export default Signup
