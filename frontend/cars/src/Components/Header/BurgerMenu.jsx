import { stack as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'
import './burgerMenu.scss'
import { useContext } from "react"
import { AuthContext } from '../../Contexts/AuthContextHelper'

export default function BurgerMenu({ onClick, handleRefresh, navigateToDash }) {
    const { token, isTokenValid } = useContext(AuthContext);
    const isAuthenticated = isTokenValid(token);
    return (
        <Menu className="contaner-burger-menu" left>
            <NavLink to="/" className="menu-item">
                Početna
            </NavLink>
            <NavLink onClick={() => { handleRefresh('/rent-a-car') }} to="/rent-a-car" className="menu-item">
                Rent a Car
            </NavLink>
            <NavLink to="/about_us" className="menu-item">
                O nama
            </NavLink>
            <button onClick={isAuthenticated ? navigateToDash : onClick} id="login" className="menu-item">{isAuthenticated ? "Profil" : "Login"}</button>
        </Menu>
    )
}