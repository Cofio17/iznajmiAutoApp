import { motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import triangleIcon from '../../assets/icons/triangle.png'

export default function Sidebar({ children, filter }) {
    const [collapsed, setCollapsed] = useState(true);
    const controls = useAnimationControls();

    const isMobile = useMediaQuery('(max-width:600px)');

    const variants = {
        open: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.2 },
            display: 'block'
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.2 },
            overflow: 'hidden'
        }
    };

    const handleClick = () => {
        setCollapsed(!collapsed);
        if (isMobile) {
            controls.start(collapsed ? 'open' : 'closed');
        }
    };

    return (
        <section className="sidebar">
            {filter && (
                <div>
                    <span onClick={handleClick} id='filter-button'>
                        <span id='filter-button-text'>Napredno filtriranje</span>
                        <motion.span

                            animate={{ rotate: collapsed ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'inline-block' }}
                        >
                            {/* <FontAwesomeIcon icon={faChevronDown} /> */}
                            <img src={triangleIcon} alt="" />
                        </motion.span>
                    </span>
                    <motion.div
                        className='outer-div-filter-container'
                        animate={isMobile ? controls : undefined}
                        initial={isMobile ? 'closed' : 'open'} // Na većim ekranima odmah otvoreno
                        variants={variants}
                        style={{ display: isMobile || !collapsed ? 'block' : 'none' }} // Uklanja animaciju na desktop
                    >
                        {children}
                    </motion.div>
                </div>
            )}
        </section>
    );
}
