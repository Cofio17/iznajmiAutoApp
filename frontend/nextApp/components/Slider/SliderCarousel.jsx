"use client";

import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css"; // Add this
import "slick-carousel/slick/slick-theme.css"; // Add this
// import { apiRequest } from "../../utils/Api/apiService";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SliderCarousel() {
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

    const carTypes = [
        {
            naziv: "Mini",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-04.webp",
        },
        {
            naziv: "Kompaktan",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-03.webp",
        },
        {
            naziv: "SUV",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-06.webp",
        },
        {
            naziv: "Porodičan",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-05.webp",
        },
        {
            naziv: "Limuzina",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-01.webp",
        },
        {
            naziv: "Premium",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-02.webp",
        },
    ];

    const handleClick = async (naziv) => {
        try {
            setLoading(true);
            const response = await apiRequest("GET", "cars");
            const filteredByType = response.data.filter((car) => car.type.includes(naziv));
            console.log(filteredByType);

            // Store all cars and filtered cars in localStorage
            localStorage.setItem("searchListData", JSON.stringify(response.data));
            localStorage.setItem("filterListData", JSON.stringify(filteredByType));
            localStorage.setItem("filtersContext", JSON.stringify([naziv]));

            // Navigate with the filter applied in the URL
            if (!loading) {
                router.push(`/rent-a-car?tip=${encodeURIComponent(naziv)}`);
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
                            href={`/rent-a-car?tip=${encodeURIComponent(car.naziv)}`}
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