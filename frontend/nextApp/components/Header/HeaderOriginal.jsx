import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import ListItem from "./ListItem";
import styles from './HeaderOriginal.module.scss'
import Image from "next/image";
export default function HeaderFullWidth({ }) {

    return (
        <header>
            <nav>

                <ul className={styles.navlist}>

                    {/* Desktop devices  */}
                    <Link href="https://iznajmi.me/" passHref>
                        <Image
                            src="/nextapp/logo.png"
                            alt="logo"
                            width={170}
                            height={55}
                            sizes="(max-width: 600px) 100px, (max-width: 1200px) 130px, 150px"
                            className={styles.logo}
                            unoptimized
                        />
                    </Link>
                    <div className={styles.navlinks}>
                        <ListItem to={'/'} text={'Početna'} />
                        <ListItem to={'/rent-a-car'} text={'Rent a Car'} />
                        <ListItem to={'/blog'} text={'Blog'} />
                    </div>

                    <div className={styles.navlinksButton}>

                        <button id='my-reservation-button' className="button">Proveri Rezervaciju </button>
                    </div>
                </ul>

                {/* Mobile devices  */}
                <BurgerMenu />

            </nav>

        </header>

    )
}
