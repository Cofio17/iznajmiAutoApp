import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';


export default function DropDownMenu({ isActive }) {
    const variants = {
        open: {
            padding: 20,
            height: "auto",
            opacity: 1,
            transition: { duration: 0.2 }
        },
        closed: {
            padding: 0,
            height: 0,
            opacity: 0,
            transition: { duration: 0.2 }
        },
    };

    const demoList = [
        { id: 1, naziv: "Limuzina" },
        { id: 2, naziv: "HecBek" },
        { id: 3, naziv: "Prikolica" },
        { id: 4, naziv: "Karavan" },
    ];

    return (
        <AnimatePresence>
            {isActive && (
                <motion.ul
                    className="list-container"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={variants}
                >
                    {demoList.map((item) => (
                        <li key={item.id}>
                            <NavLink to={`/cars?search=${item.naziv}`}>
                                <span>{item.naziv}</span>
                            </NavLink>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );
}
