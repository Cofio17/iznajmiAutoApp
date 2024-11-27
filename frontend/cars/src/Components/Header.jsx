import { NavLink } from "react-router-dom"
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
                        <li><NavLink to='/'  >Home</NavLink></li>
                        <li><NavLink to='/cars'  >Cars</NavLink></li>
                        <li><NavLink to='aboutus' >About us</NavLink></li>

                    </ul>
                }
            </nav>
        </header>
    )
}