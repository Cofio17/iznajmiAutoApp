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
            <Link href="/" className="menu-item" onClick={closeMenu}>
                Početna
            </Link>
            <Link href="/rent-a-car" className="menu-item" onClick={closeMenu}>
                Rent a Car
            </Link>
            <Link href="/blog" className="menu-item" onClick={closeMenu}>
                Blog
            </Link>

        </Menu>
    )
}
