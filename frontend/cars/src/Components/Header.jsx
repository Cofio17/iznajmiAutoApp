import { NavLink } from "react-router-dom"
import '../style.scss'
import logo from '../assets/images/logo.png'
export default function Header() {
    const navList = [

    ]

    return (
        <header>
            <nav>
                {
                    <ul className="navlist">

                        <li><NavLink to='/'><img src={logo} alt="logo" /></NavLink></li>
                        <div className="navlinks">
                            <li><NavLink to='/'  >Home</NavLink></li>
                            <li><NavLink to='/cars'  >Cars</NavLink></li>
                            <li><NavLink to='about_us' >About us</NavLink></li>
                        </div>

                        <div><button id="login">Login/Register</button></div>

                    </ul>
                }
            </nav>
        </header>
    )
}