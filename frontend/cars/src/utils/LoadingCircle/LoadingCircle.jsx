import { motion } from "framer-motion";


// LoadingCircle komponenta
const LoadingCircle = () => {
    return (
        <motion.div className="fit-content"
            style={{
                width: "50px",
                height: "50px",
                border: "5px solid lightgray",
                borderTop: "5px solid #48AD7E",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            animate={{ rotate: 360 }}
            transition={{
                duration: 0.75,
                ease: "linear",
                repeat: Infinity,
            }}
        />
    );
};

export default LoadingCircle;
