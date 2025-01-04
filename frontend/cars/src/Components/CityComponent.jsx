import '../style.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function CityComponent({ itemData }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isInView) {
            setHasAnimated(true);
        }
    }, [isInView]);

    return (
        <Link to={`/cars?City=${itemData.title}`}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={hasAnimated ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
                className="section-container-image"
            >
                <div className="overlay"></div>
                <p className="text-overlay">{itemData.title}</p>
                <img src={itemData.description} alt="image" />
            </motion.div>
        </Link>
    );
}
