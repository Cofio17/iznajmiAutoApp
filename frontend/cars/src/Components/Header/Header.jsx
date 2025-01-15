import { NavLink, useLocation } from "react-router-dom"
import logo from '../../assets/images/logo.png'
import DropDownMenu from "../DropDownMenu/DropDownMenu"
import { useState } from "react"
import { motion } from "framer-motion"
import { stack as Menu } from 'react-burger-menu'
import './burgerMenu.scss'

export default function Header() {
    const [activeDropDown, setActiveDropDown] = useState(false);
    let timer;

    const location = useLocation();

    const handleRefresh = (path) => {
        if (location.pathname === path) {
            localStorage.removeItem("searchListData");
            //window.location.reload();
        }
    };
    return (
        <header>

            <nav>

                <ul className="navlist">

                    {/* Desktop devices  */}
                    <li><NavLink to='/'><img src={logo} alt="logo" /></NavLink></li>
                    <div className="navlinks">
                        <li><NavLink to='/'  >Home</NavLink></li>
                        <li onMouseLeave={() => {
                            timer = setTimeout(() => setActiveDropDown(false), 300);
                        }} onMouseEnter={() => {
                            clearTimeout(timer);
                            setActiveDropDown(true);
                        }}>
                            <NavLink onClick={() => { handleRefresh('/cars') }} aria-haspopup={true} to='/cars' >Rent a Car </NavLink>
                            <DropDownMenu isActive={activeDropDown} /></li>
                        <li><NavLink to='/about_us' >About us</NavLink></li>
                    </div>

                    <div className="navlinks-button">
                        <motion.button
                            whileTap={{ scale: 1.1 }}
                            whileHover={{
                                scale: 0.95,
                                transition: { duration: 0.05 },
                            }}
                            id="login"
                        >
                            Login/Register
                        </motion.button>
                    </div>
                </ul>


                {/* Mobile devices  */}
                <Menu className="contaner-burger-menu" left>
                    <NavLink to="/" className="menu-item">
                        Home
                    </NavLink>
                    <NavLink to="/cars" className="menu-item">
                        Rent a Car
                    </NavLink>
                    <NavLink to="/about_us" className="menu-item">
                        About us
                    </NavLink>
                    <button id="login" className="menu-item">Login/Register</button>
                </Menu>
            </nav>

        </header>
    )
}
