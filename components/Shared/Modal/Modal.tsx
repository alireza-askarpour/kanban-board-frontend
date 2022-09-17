import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Backdrop from "./Backdrop"

interface IProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const dropIn = {
  exit: { scale: 0.75, opacity: 0 },
  hidden: { scale: 0.75, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" },
  },
}

const Modal = ({ isOpen, onClose, children }: IProps) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
      {isOpen && (
        <Backdrop onClick={onClose}>
          <motion.div
            className="p-8 bg-white rounded-lg shadow-lg space-y-4 m-auto max-w-[480px]"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  )
}

export default Modal
