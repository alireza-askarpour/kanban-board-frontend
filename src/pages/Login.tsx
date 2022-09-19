import LoginForm from "components/Forms/LoginForm"
import { Helmet } from "components/Shared"

const Login = () => {
  return (
    <Helmet title="Login page">
      <div className="grid place-items-center min-h-screen bg-gray-50">
        <LoginForm />
      </div>
    </Helmet>
  )
}

export default Login
