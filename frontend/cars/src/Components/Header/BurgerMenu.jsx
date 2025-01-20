import { stack as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'
import './burgerMenu.scss'
export default function BurgerMenu({ onClick, handleRefresh }) {
    return (
        <Menu className="contaner-burger-menu" left>
            <NavLink to="/" className="menu-item">
                Početna
            </NavLink>
            <NavLink onClick={() => { handleRefresh('/cars') }} to="/cars" className="menu-item">
                Rent a Car
            </NavLink>
            <NavLink to="/about_us" className="menu-item">
                O nama
            </NavLink>
            <button onClick={onClick} id="login" className="menu-item">Login/Register</button>
        </Menu>
    )
}