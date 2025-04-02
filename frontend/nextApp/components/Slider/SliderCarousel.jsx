"use client";

import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css"; // Add this
import "slick-carousel/slick/slick-theme.css"; // Add this
// import { apiRequest } from "../../utils/Api/apiService";
import { useRouter } from "next/navigation";
import Link from "next/link";


function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", cursor: "pointer" }}
            onClick={onClick}
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
    );
}


function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", cursor: "pointer" }}
            onClick={onClick}
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
    );
}




export default function SliderCarousel({ carTypes, cars }) {
    const [loading, setLoading] = useState(false); // Local state for loading
    const router = useRouter();


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 1900,
        cssEase: "linear",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    const handleClick = async (naziv) => {
        try {
            setLoading(true);
            const filteredByType = cars.filter((car) => car.type.includes(naziv));
            console.log(filteredByType);

            // Store all cars and filtered cars in localStorage
            localStorage.setItem("searchListData", JSON.stringify(cars));
            localStorage.setItem('filterListData', JSON.stringify(filteredByType))

            // Navigate with the filter applied in the URL
            if (!loading) {
                const query = new URLSearchParams({ tip: naziv, redirect: true });
                router.push(`/rent-a-car?${query.toString()}`);

            }
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-car-slider">
            <div className="section-container-h1-p">
                <div className="gold-line"></div>
                <h1>Naša mreža vozila u Subotici</h1>
            </div>
            <Slider {...settings}>
                {carTypes.map((car) => (
                    <div className="slider-container-item" key={car.naziv}>
                        <Link
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default Link behavior
                                handleClick(car.naziv); // Call handleClick instead
                            }}
                        >
                            <img src={car.image} alt="car" />
                            <h3>{car.naziv}</h3>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}