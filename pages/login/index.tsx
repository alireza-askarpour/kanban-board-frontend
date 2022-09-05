import LoginForm from "components/Forms/LoginForm"
import Layout from "components/Layouts/Layout"
import SEO from "components/Shared/SEO/SEO"

const Login = () => {
  return (
    <Layout>
      <SEO title="Sign in" />
      <div className="grid place-items-center min-h-screen bg-gray-50">
        <LoginForm />
      </div>
    </Layout>
  )
}

export default Login
