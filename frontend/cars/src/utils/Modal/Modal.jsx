import { motion } from 'framer-motion'
import BackDrop from '../BackDrop/Backdrop'
import './modal.scss'
export default function Modal({ handleClose, children, type }) {

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stiffness: 500
            }
        },
        exit: {
            y: "100vh"
        }

    }
    return (
        <BackDrop>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
                className={`modal ${type}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </motion.div>

        </BackDrop>
    )
}