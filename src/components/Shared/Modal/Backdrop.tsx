import { ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  onClick: () => void
}

export default function Backdrop({ onClick, children }: Props) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 overflow-auto py-4 grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ margin: 0 }}
    >
      {children}
    </motion.div>
  )
}
