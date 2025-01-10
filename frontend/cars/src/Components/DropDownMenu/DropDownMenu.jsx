import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { SearchContext } from '../../Contexts/SearchContext';






export default function DropDownMenu({ isActive }) {
    const { setLoading, setFilterListData, setSearchListData } = useContext(SearchContext);
    const localhost = import.meta.env.VITE_LOCAL_HOST;

    //Animations
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

    //Needs API- SET
    const list = [
        { id: 1, naziv: "Limuzina" },
        { id: 2, naziv: "HecBek" },
        { id: 3, naziv: "Prikolica" },
        { id: 4, naziv: "Karavan" },
    ];

    const getCars = async (type) => {
        try {
            setLoading(true);
            const response = await axios.get(`${localhost}cars`);
            const filteredByType = response.data.data.filter((car) => {
                return car.type === type
            });
            setSearchListData(filteredByType);
        } catch (error) {
            console.log(`error fetching data ${error}`);
        }
        finally {
            setLoading(false);
        }
    };

    const handleClick = async (type) => {
        await getCars(type);
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
                            <NavLink onClick={() => { handleClick(item.naziv) }} to={`/cars?tip=${encodeURIComponent(item.naziv)}`}>
                                <span>{item.naziv}</span>
                            </NavLink>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );
}
