import Image from "next/image"
import ListItem from "./ListItem";
import styles from "./Header.module.scss";
import BurgerMenu from "./BurgerMenu";
export default function Header() {

    return (
        <header className={styles.header}>
            <img
                src='/logo.png'
                alt="logo"
                width={170}
                height={55}
                sizes="(max-width: 600px) 100px, (max-width: 1200px) 130px, 150px"
                className={styles.logo}
            />
            <nav>
                <ul className={styles.navlist}>
                    <ListItem to={'https://iznajmi.me/'} text={'Rent a Car'} />
                    <ListItem to={'https://iznajmi.me/blog/'} text={'Blog'} />
                </ul>
                <BurgerMenu />
            </nav>

        </header>

    )
}