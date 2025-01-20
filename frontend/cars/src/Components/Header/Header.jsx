import { NavLink, useLocation, useNavigate } from "react-router-dom"
import logo from '../../assets/images/logo.png'
import DropDownMenu from "../DropDownMenu/DropDownMenu"
import { useState } from "react"
import { motion } from "framer-motion"
import BurgerMenu from "./BurgerMenu"
import { useContext } from "react"
import { AuthContext } from "../../Contexts/AuthContextHelper"


export default function Header({ onClick }) {
    const [activeDropDown, setActiveDropDown] = useState(false);
    const { token, isTokenValid } = useContext(AuthContext);

    const savedToken = localStorage.getItem('token')
    const isAuthenticated = isTokenValid(savedToken);
    const navigate = useNavigate();

    let timer;

    const location = useLocation();

    const handleRefresh = (path) => {
        if (location.pathname === path) {
            localStorage.removeItem("searchListData");
            //window.location.reload();
        }
    };

    const navigateTo = () => {
        navigate('/dashboard');
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
                            <NavLink onClick={() => { handleRefresh('/cars') }} aria-haspopup={true} to='/cars' >Rent a Car </NavLink>
                            <DropDownMenu isActive={activeDropDown} /></li>
                        <li><NavLink to='/about_us' >O nama</NavLink></li>
                    </div>


                    <div className="navlinks-button">
                        <motion.button
                            onClick={isAuthenticated ? navigateTo : onClick}
                            whileTap={{ scale: 1.1 }}
                            whileHover={{
                                scale: 0.95,
                                transition: { duration: 0.05 },
                            }}
                            id="login"
                        >
                            {isAuthenticated ? ' Profil' : 'Login'}
                        </motion.button>
                    </div>
                </ul>


                {/* Mobile devices  */}
                <BurgerMenu handleRefresh={handleRefresh} onClick={onClick} />

            </nav>

        </header>

    )
}
