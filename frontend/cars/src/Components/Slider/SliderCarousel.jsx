import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { useContext } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import { apiRequest } from "../../utils/Api/apiService";

export default function SliderCarousel() {
    const { setSearchListData, setFilterListData, setFiltersContext, setLoading } =
        useContext(SearchContext);
    const navigate = useNavigate(); // For programmatic navigation

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
            naziv: "SUV",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-05.webp",
        },
        {
            naziv: "Limuzina",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-01.webp",
        },
        {
            naziv: "Kompaktan",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-03.webp",
        },
        {
            naziv: "Premium",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-02.webp",
        },
        {
            naziv: "Porodican",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-06.webp",
        },
        {
            naziv: "Mini",
            image: "https://storage.googleapis.com/iznajmimeprobabucket/carSlider/Auti/Set1/Limuzina-04.webp",
        },
    ];


    const handleClick = async (naziv) => {
        try {
            setLoading(true);
            const response = await apiRequest("GET", "cars");
            const filteredByType = response.data.filter((car) => car.type === naziv);

            // Update context with all cars and filtered cars
            setSearchListData(response.data);
            setFilterListData(filteredByType);

            // Update filtersContext to reflect the selected car type (this checks the checkbox)
            setFiltersContext([naziv]);

            // Navigate with the filter applied in the URL
            navigate(`/rent-a-car?tip=${encodeURIComponent(naziv)}`);
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
                <h1>Upoznajte našu flotu</h1>
            </div>
            <Slider {...settings}>
                {carTypes.map((car) => (
                    <div className="slider-container-item" key={car.naziv}>
                        <Link
                            to={`/rent-a-car?tip=${encodeURIComponent(car.naziv)}`}
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