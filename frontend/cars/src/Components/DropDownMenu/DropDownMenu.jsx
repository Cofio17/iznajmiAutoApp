import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../Contexts/SearchContext';
import { fetchCars } from '../../loaders/fetchCars';

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

export default function DropDownMenu({ isActive }) {
    const { setSearchListData, searchListData } = useContext(SearchContext);

    //Needs API- SET
    const list = [
        { id: 1, naziv: "Automobili" },
        { id: 2, naziv: "Prikolice" },

    ];

    const handleClick = async () => {
        if (searchListData.length === 0) {
            const res = await fetchCars();
            setSearchListData(res);
        }
    }

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
                    {list.map((item) => (
                        <li key={item.id}>
                            <NavLink onClick={handleClick} to={`/rent-a-car?tip=${encodeURIComponent(item.naziv)}`}>
                                <span>{item.naziv}</span>
                            </NavLink>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );
}
