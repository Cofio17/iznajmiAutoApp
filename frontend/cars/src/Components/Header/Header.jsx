import { NavLink, useLocation, useNavigate } from "react-router-dom"
import logo from '../../assets/images/logo.webp'
import DropDownMenu from "../DropDownMenu/DropDownMenu"
import { useState } from "react"
import { motion } from "framer-motion"
import BurgerMenu from "./BurgerMenu"

export default function Header({ onClick }) {
    const [activeDropDown, setActiveDropDown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    let timer;

    const handleRefresh = (path) => {
        if (location.pathname === path) {
            localStorage.removeItem("searchListData");
        }
    };

    const navigateTo = () => {
        navigate('/moja-rezervacija');
    }


    return (
        <header>
            <nav>

                <ul className="navlist">

                    {/* Desktop devices  */}
                    <li><NavLink to='/'><img src={logo} alt="logo" /></NavLink></li>
                    <div className="navlinks">
                        <li><NavLink to='/'  >Početna</NavLink></li>
                        <li onMouseLeave={() => {
                            timer = setTimeout(() => setActiveDropDown(false), 300);
                        }} onMouseEnter={() => {
                            clearTimeout(timer);
                            setActiveDropDown(true);
                        }}>
                            <NavLink onClick={() => { handleRefresh('/rent-a-car') }} to='/rent-a-car' >Rent a Car </NavLink>
                            {/* <DropDownMenu isActive={activeDropDown} /> */}
                        </li>
                        <li><NavLink reloadDocument to='/blog/' >Blog</NavLink></li>
                    </div>


                    <div className="navlinks-button">

                        <motion.button
                            id='my-reservation-button'
                            className="button"
                            onClick={navigateTo}
                            whileTap={{ scale: 1.1 }}
                            whileHover={{
                                scale: 0.95,
                                transition: { duration: 0.05 },
                            }}
                        >
                            Proveri Rezervaciju
                        </motion.button>
                    </div>
                </ul>


                {/* Mobile devices  */}
                <BurgerMenu handleRefresh={handleRefresh} onClickMyReservation={navigateTo} onClick={onClick} />

            </nav>

        </header>

    )
}
