import Search from '../Search/Search';
import styles from './HeroHeader.module.scss';

export default function HeroHeader({ header, overlay = true, subtext, filteredCars }) {

    return (
        <div className={styles.heroHeaderContainer}>
            <h1>{header}</h1>
            <h2>{subtext}</h2>
            <img
                className={`${styles.heroHeaderImage} ${styles.imageMainPage}`}
                src="/Banner.webp"
                alt="hero-header-image"
            />
            {overlay && (
                <div className={styles.overlay}>
                    <Search filteredCars={filteredCars} />
                </div>
            )}
        </div>
    );
}
