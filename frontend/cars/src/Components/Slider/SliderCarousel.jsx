import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { useContext } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import { apiRequest } from "../../utils/Api/apiService";
import miniImg from '../../assets/images/carTypes/Limuzina-04.webp'
import kompaktanImg from '../../assets/images/carTypes/Limuzina-03.webp'
import suvImg from '../../assets/images/carTypes/Limuzina-06.webp'
import porodicanImg from '../../assets/images/carTypes/Limuzina-05.webp'
import limuzinaImg from '../../assets/images/carTypes/Limuzina-01.webp'
import premiumImg from '../../assets/images/carTypes/Limuzina-02.webp'

export default function SliderCarousel() {
    const { setSearchListData, setFilterListData, setFiltersContext, setLoading, filterListData, loading } =
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
            naziv: "Mini",
            image: miniImg,
        },
        {
            naziv: "Kompaktan",
            image: kompaktanImg,
        },

        {
            naziv: "SUV",
            image: suvImg,
        },
        {
            naziv: "Porodičan",
            image: porodicanImg,
        },
        {
            naziv: "Limuzina",
            image: limuzinaImg,
        },
        {
            naziv: "Premium",
            image: premiumImg,
        },

    ];


    const handleClick = async (naziv) => {
        try {
            setLoading(true);
            const response = await apiRequest("GET", "cars");
            const filteredByType = response.data.filter((car) => car.type.includes(naziv));
            console.log(filteredByType);


            // Update context with all cars and filtered cars
            setSearchListData(response.data);
            setFilterListData(filteredByType);

            // Update filtersContext to reflect the selected car type (this checks the checkbox)
            setFiltersContext([naziv]);
            if (filterListData && !loading) {
                navigate(`/rent-a-car?tip=${encodeURIComponent(naziv)}`);
            }
            // Navigate with the filter applied in the URL

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
                <h1>Iznajmi auto iz naše mreže vozila</h1>
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