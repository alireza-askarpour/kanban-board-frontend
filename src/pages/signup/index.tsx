import SignUpForm from "components/Forms/SignUpForm"
import Layout from "components/Layouts/Layout"
import SEO from "components/Shared/SEO/SEO"

const Signup = () => {
  return (
    <Layout>
      <SEO title="Sign up" />
      <div className="grid place-items-center min-h-screen bg-gray-50">
        <SignUpForm />
      </div>
    </Layout>
  )
}

export default Signup
