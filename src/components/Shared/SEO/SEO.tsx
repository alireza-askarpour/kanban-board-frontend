import Head from "next/head"
import settings from "./settings"
import { IProps } from "types/components/SEO"

const SEO = ({ title, description }: IProps) => {
  return (
    <Head>
      <title>Kanban | {title}</title>
      <meta name="description" content={description} />
    </Head>
  )
}

SEO.defaultProps = {
  title: settings.meta.title,
  description: settings.meta.description
}

export default SEO
