import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.scss'
import { Link } from 'react-router-dom';
import limuzinaimg from '../../assets/sliderCars/Limuzina.png';
import suvImg from '../../assets/sliderCars/SUV.png';
import porodicanImg from '../../assets/sliderCars/Porodican.png';
import sportskiImg from '../../assets/sliderCars/Sportski.png';
import miniImg from '../../assets/sliderCars/Mini.png';
import kompaktanImg from '../../assets/sliderCars/Kompaktan.png';




export default function SliderCarousel() {

    //napraviti loader

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    const carTypes = [
        {
            naziv: 'SUV',
            image: suvImg
        },
        {
            naziv: 'Limuzina',
            image: limuzinaimg
        },
        {
            naziv: 'Kompaktan',
            image: kompaktanImg
        },
        {
            naziv: 'Sportski',
            image: sportskiImg
        },
        {
            naziv: 'Porodican',
            image: porodicanImg
        }, {
            naziv: 'Mini',
            image: miniImg
        }
    ]

    return (
        <div className="container-car-slider">
            <div className="section-container-h1-p">
                <div className="gold-line"></div>
                <h1>Upoznajte našu flotu</h1>

            </div>
            <Slider {...settings}>
                {carTypes.map((car) => {
                    return <div className='slider-container-item' key={car.naziv}>
                        <Link to={`/cars?tip=${encodeURIComponent(car.naziv)}`}>
                            <img src={car.image} alt="car" />
                            <h3>{car.naziv}</h3>
                        </Link>
                    </div>
                })}

            </Slider>
        </div>
    )

}