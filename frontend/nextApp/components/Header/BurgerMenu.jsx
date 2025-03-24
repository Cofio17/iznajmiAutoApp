'use client'
import { stack as Menu } from 'react-burger-menu'
import Link from 'next/link'
import { useState } from 'react'

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <Menu className="contaner-burger-menu" left isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)}>
            <Link href="https://iznajmi.me/blog" className="menu-item" onClick={closeMenu}>
                Blog
            </Link>
            <Link href="https://iznajmi.me/" className="menu-item" onClick={closeMenu}>
                Rent a Car
            </Link>
        </Menu>
    )
}
