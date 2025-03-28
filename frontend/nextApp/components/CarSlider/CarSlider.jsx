'use client'
import React, { useState, useRef, useEffect } from 'react';
import styles from './CarSlider.module.scss';
import CarCardNew from '../CarCardNew/CarCardNew';


const DUMMY_CARS = [
    { licensePlate: '6', id: 1, title: "Tesla Model S", image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp", price: "50€" },
    { licensePlate: '1', id: 2, title: "Porsche Taycan", image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp", price: "50€" },
    { licensePlate: '4', id: 3, title: "BMW i4", image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp", price: "70€" },
    { licensePlate: '3', id: 4, title: "Audi e-tron GT", image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp", price: "20€" },
    { licensePlate: '2', id: 5, title: "Mercedes EQS", image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp", price: "30€" },
];

const CarSlider = ({ sectionData, cars }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const sliderRef = useRef(null);


    const minSwipeDistance = 50;
    const maxIndex = cars.length - cardsPerView;


    // Detect screen width
    useEffect(() => {
        const handleResize = () => {
            setCardsPerView(window.innerWidth > 768 ? 3 : 1);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Set slider visibility after mount
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.visibility = 'visible';
        }
    }, []);

    const nextSlide = () => {
        setCurrentIndex(current => (current >= maxIndex ? 0 : current + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(current => (current === 0 ? maxIndex : current - 1));
    };

    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();

        setTouchStart(null);
        setTouchEnd(null);
    };

    const numberOfDots = Math.max(1, cars.length - cardsPerView + 1); // Ensure at least 1 dot
    const translatePercentage = typeof window !== 'undefined' && window.innerWidth <= 768 ? 105 : 100;
    return (

        <>
            <div className={styles.carSliderContainer}>
                <div
                    ref={sliderRef}
                    className={styles.carSlider}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}

                >
                    <div
                        className={styles.carSliderTrack}
                        style={{ transform: `translateX(-${currentIndex * (translatePercentage / cardsPerView)}%)` }}

                    >
                        {cars.map((car) => (
                            <CarCardNew key={car.licensePlate} carData={car} />
                        ))}
                    </div>
                </div>

                <div className={styles.prevButton} style={{ display: "block", cursor: "pointer" }} onClick={prevSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M24 6l-12 12 12 12" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
                <div className={styles.nextButton} style={{ display: "block", cursor: "pointer" }} onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M12 6l12 12-12 12" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>

                <div className={styles.progressContainer}>
                    {Array.from({ length: numberOfDots }).map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.progressDot} ${index === currentIndex ? styles.active : ''}`}
                        />
                    ))}
                </div>
            </div>

        </>


    );
};

export default CarSlider;

