import { NavLink } from "react-router-dom"
import '../style.scss'
import logo from '../assets/images/logo.png'
import DropDownMenu from "./DropDownMenu/DropDownMenu"
import { useState } from "react"
export default function Header() {
    const [activeDropDown, setActiveDropDown] = useState(false);
    let timer;

    return (
        <header>
            <nav>
                {
                    <ul className="navlist">

                        <li><NavLink to='/'><img src={logo} alt="logo" /></NavLink></li>
                        <div className="navlinks">
                            <li><NavLink to='/'  >Home</NavLink></li>
                            <li onMouseLeave={() => {
                                timer = setTimeout(() => setActiveDropDown(false), 300);
                            }} onMouseEnter={() => {
                                clearTimeout(timer);
                                setActiveDropDown(true);
                            }}>
                                <NavLink aria-haspopup={true} to='/cars' >Rent a Car </NavLink>
                                <DropDownMenu isActive={activeDropDown} /></li>
                            <li><NavLink to='about_us' >About us</NavLink></li>
                        </div>

                        <div><button id="login">Login/Register</button></div>

                    </ul>
                }
            </nav>
        </header>
    )
}
