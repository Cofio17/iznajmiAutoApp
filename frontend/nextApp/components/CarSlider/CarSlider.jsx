'use client'
import React, { useState, useRef, useEffect } from 'react';
import styles from './CarSlider.module.scss';
import CarCardNew from '../CarCardNew/CarCardNew';

const dummyCars = [
    {
        licensePlate: "ABC123",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        pricePerDay: 45,
        brand: "Toyota",
        model: "Corolla",
        transmission: "Manuel",
        fuelType: "Petrol",
        seats: 5,
        trunkCapacity: 2,
        pricePerDay: 50
    },
    {
        licensePlate: "XYZ789",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        pricePerDay: 60,
        brand: "Tesla",
        model: "Model 3",
        transmission: "Automatic",
        fuelType: "Electric",
        seats: 5,
        trunkCapacity: 1,
        pricePerDay: 50
    },
    {
        licensePlate: "DEF456",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        pricePerDay: 35,
        brand: "Volkswagen",
        model: "Golf",
        transmission: "Manuel",
        fuelType: "Petrol",
        seats: 5,
        trunkCapacity: 3,
        pricePerDay: 50
    }
];

const DUMMY_CARS = [
    {
        id: 1,
        title: "Tesla Model S",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        price: "50€"
    },
    {
        id: 2,
        title: "Porsche Taycan",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        price: "50€"
    },
    {
        id: 3,
        title: "BMW i4",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        price: "70€"
    },
    {
        id: 4,
        title: "Audi e-tron GT",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        price: "20€"
    },
    {
        id: 5,
        title: "Mercedes EQS",
        image: "https://storage.googleapis.com/iznajmimeprobabucket/cars/SU157-LZ_1.webp",
        price: "30€"
    }
];

const CarSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const sliderRef = useRef(null);

    const minSwipeDistance = 50;
    const cardsPerView = 1;
    const maxIndex = DUMMY_CARS.length - cardsPerView;

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.visibility = 'visible';
        }
    }, []);

    const nextSlide = () => {
        setCurrentIndex(current =>
            current >= maxIndex ? 0 : current + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex(current =>
            current === 0 ? maxIndex : current - 1
        );
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

    return (
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
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${100}%`
                    }}
                >
                    {DUMMY_CARS.map((car, index) => (
                        <div
                            key={car.id}
                            className={styles.carCardWrapper}
                            style={{
                                flex: '0 0 100%',
                                width: '100%' // Explicitly set width
                            }}
                        >
                            <div className={styles.carCard}>
                                <div className={styles.carCardImageContainer}>
                                    <img
                                        src={car.image}
                                        alt={car.title}
                                        className={styles.carCardImage}
                                    />
                                </div>
                                <div className={styles.carCardContent}>
                                    <h3 className={styles.carCardTitle}>{car.title}</h3>
                                    <p className={styles.carCardPrice}>{car.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* {dummyCars.map((car, index) => {
                        return <CarCardNew key={index} carData={car} />
                    })} */}
                </div>
            </div>

            <div
                className={styles.prevButton}
                style={{ display: "block", cursor: "pointer" }}
                onClick={prevSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36" // Širina SVG-a
                    height="36" // Visina SVG-a
                    viewBox="0 0 36 36"
                    fill="none" // Bez popune, samo kontura
                >
                    <path
                        d="M24 6l-12 12 12 12" // Chevron strelica okrenuta levo
                        stroke="#2D6A4F" // Boja strelice
                        strokeWidth="3" // Debljina linije
                        strokeLinecap="round" // Zaobljeni završeci
                    />
                </svg>
            </div>
            <div
                className={styles.nextButton}
                style={{ display: "block", cursor: "pointer" }}
                onClick={nextSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36" // Širina SVG-a
                    height="36" // Visina SVG-a
                    viewBox="0 0 36 36"
                    fill="none" // Bez popune, samo kontura
                >
                    <path
                        d="M12 6l12 12-12 12" // Chevron strelica
                        stroke="#2D6A4F" // Boja strelice
                        strokeWidth="3" // Debljina linije
                        strokeLinecap="round" // Zaobljeni završeci
                    />
                </svg>
            </div>

            <div className={styles.progressContainer}>
                {Array.from({ length: DUMMY_CARS.length }).map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.progressDot} ${index === currentIndex ? styles.active : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarSlider;