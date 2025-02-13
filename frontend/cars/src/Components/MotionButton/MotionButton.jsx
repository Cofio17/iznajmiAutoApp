import { motion } from "framer-motion";

export default function MotionButton({
    id,
    className,
    text,
    onClick,
    type = "button",
    disabled = false,
}) {
    return (
        <motion.button
            id={id}
            className={className}
            type={type}
            disabled={disabled}
            onClick={onClick}
            whileTap={{ scale: 1.1 }}
            whileHover={{
                scale: 0.95,
                transition: { duration: 0.05 },
            }}
        >
            {text}
        </motion.button>
    );
}
