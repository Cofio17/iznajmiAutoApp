import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SectionComponent({ sectionData, DynamicComponent }) {
    // State to determine if the device is mobile
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Assuming 768px as mobile breakpoint
        };

        // Set initial value
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Cleanup listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const lineVariants = {
        hidden: { width: 0 },
        visible: {
            width: '40px', // Updated to 40px length
            transition: { duration: 0.8, ease: 'easeInOut' },
        },
    };

    return (
        <motion.section
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }} // 0.1 for mobile, 0.3 for desktop
            variants={containerVariants}
        >
            <motion.div className="section-container-h1-p" variants={itemVariants}>
                <p style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <motion.h3
                        className="sub-header"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        JEDNA PLATFORMA BEZBROJ AUTOMOBILA
                    </motion.h3>
                </p>
                <motion.div
                    className="gold-line"
                    variants={lineVariants}
                />
                <motion.h2 variants={itemVariants}>{sectionData.header}</motion.h2>
                <motion.p variants={itemVariants}>{sectionData.details}</motion.p>
            </motion.div>

            <motion.div
                className="section-container-items"
                variants={containerVariants}
            >
                {sectionData.steps.map((step) => (
                    <motion.div
                        key={step.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                    >
                        <DynamicComponent itemData={step} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}