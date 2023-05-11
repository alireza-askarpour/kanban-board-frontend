import { useEffect } from "react"
import { IProps } from "../../../types/components/Helmet"

const Helmet = ({ title, children }: IProps) => {
  document.title = "Kanban | " + title

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <div>{children}</div>
}

export default Helmet
