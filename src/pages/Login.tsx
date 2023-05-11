import LoginForm from "../components/Forms/LoginForm"
import AuthLayout from "../components/Layouts/AuthLayout"
import { Helmet } from "../components/Shared"

const Login = () => {
  return (
    <AuthLayout>
      <Helmet title="Login page">
        <div className="grid place-items-center min-h-screen bg-gray-50">
          <LoginForm />
          test
        </div>
      </Helmet>
    </AuthLayout>
  )
}

export default Login
