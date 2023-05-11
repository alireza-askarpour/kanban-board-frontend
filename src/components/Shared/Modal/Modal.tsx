import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { classNames } from "../../../utils"
import Backdrop from "./Backdrop"

interface IProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
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

const Modal = ({ isOpen, onClose, children, className }: IProps) => {
  return (
    <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
      {isOpen && (
        <Backdrop onClick={onClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={classNames("px-5 pt-7 pb-5 bg-white rounded-lg shadow-lg m-auto", className)}
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
