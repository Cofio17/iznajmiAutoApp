import { useState } from 'react';
import styles from './car.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function CompanySection() {
    const [expanded, setExpanded] = useState(false);

    const expandList = (e) => {
        e.preventDefault();
        setExpanded((prev) => !prev);
    };

    const listVariants = {
        visible: {
            opacity: 1,
            height: 'auto',
            transition: { duration: 0.25, ease: 'easeInOut', staggerChildren: 0.1 },
        },
        hidden: {
            opacity: 0,
            height: 0,
            maxWidth: 'auto',
            transition: { duration: 0.25, ease: 'easeInOut' },
        },
    };

    const itemVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
        hidden: { opacity: 0, y: 25, transition: { duration: 0.2, ease: 'easeInOut' } },
    };

    const iconVariants = {
        expanded: { rotate: 180 },
        collapsed: { rotate: 0 },
    };

    return (
        <div className={styles.companySectionWrapper}>
            <div onClick={expandList} className={styles.companySection} id="companySection">
                <p className='no-select'>
                    Opšti uslovi agencije
                    <motion.span
                        variants={iconVariants}
                        animate={expanded ? 'expanded' : 'collapsed'}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        style={{ display: 'inline-block', marginLeft: '8px' }}
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </motion.span>
                </p>
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={listVariants}
                            className={styles.expandedContent} // Add a class for absolute positioning
                        >
                            <motion.ul>
                                <motion.li variants={itemVariants}>
                                    Minimalna starost vozača: 21 godina.
                                </motion.li>
                                <motion.li variants={itemVariants}>
                                    Važeća vozačka dozvola je obavezna.
                                </motion.li>
                                <motion.li variants={itemVariants}>
                                    Osnovno osiguranje je uključeno; dodatno osiguranje dostupno.
                                </motion.li>
                                <motion.li variants={itemVariants}>
                                    Vozila se vraćaju s punim rezervoarom.
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}