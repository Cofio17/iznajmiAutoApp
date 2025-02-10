import { stack as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'
import './burgerMenu.scss'

export default function BurgerMenu({ handleRefresh, onClickMyReservation }) {

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
            <button onClick={onClickMyReservation} id='my-reservation-button' className="menu-item button">Moja rezervacija</button>
        </Menu>
    )
}