
'use client'
import { useRouter } from 'next/navigation'
import Button from '../Button/Button'
import styles from './section.module.scss'

export default function SectionButtons({ buttonData, line = true, filteredCars }) {

    const router = useRouter();

    const handleRedirect = () => {
        if (filteredCars) {
            localStorage.setItem('searchListData', JSON.stringify(filteredCars));
        }
        router.push(buttonData.to);
    }

    return (

        <section className={styles.sectionContainerButton}>

            <div className="section-container-h1-p">
                {line && <div className="gold-line"></div>}
                <h2 className={styles.sectionTitle}>{buttonData.header}</h2>
                {/* <Button id={buttonData.id} to={buttonData.to} text={buttonData.buttonText} /> */}
                <button onClick={handleRedirect} id={buttonData.id}>{buttonData.buttonText}</button>
            </div>

        </section>
    )

}