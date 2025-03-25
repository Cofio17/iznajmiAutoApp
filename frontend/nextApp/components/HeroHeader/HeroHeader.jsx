import Search from '../Search/Search';
import styles from './HeroHeader.module.scss';

export default function HeroHeader({ header }) {

    return (
        <div className={styles.heroHeaderContainer}>
            <h1 style={{ fontSize: '3rem' }}>{header}</h1>
            <img
                className={`${styles.heroHeaderImage} ${header === 'Pronadji Idealan Auto' ? styles.imageMainPage : ''}`}

                src="/Banner.webp"
                alt="hero-header-image"
            />
            {header === 'Pronadji Idealan Auto' && (
                <div className={styles.overlay}>
                    {/* Sadržaj overlay-a ako je potrebno */}
                    <Search />
                </div>
            )}
        </div>
    );
}
