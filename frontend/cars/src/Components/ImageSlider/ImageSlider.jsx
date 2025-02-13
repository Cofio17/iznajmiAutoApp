import ImageGallery from "react-image-gallery";
import './imageGallery.scss'


export default function ImageSlider({ carData }) {
    const bigImg = '?';
    const smallImg = '?';

    let imagesOriginal;
    if (carData.images) {
        imagesOriginal = carData.images.map((image) => ({
            original: image,
            thumbnail: image,
        }));
    }


    const imagess = [
        {
            original: `https://i.imgur.com/VRpF2MI.jpeg${bigImg}`,
            thumbnail: `https://i.imgur.com/VRpF2MI.jpeg${smallImg}`,
        },
        {
            original: `https://i.imgur.com/lQoHZEp.jpeg${bigImg}`,
            thumbnail: `https://i.imgur.com/lQoHZEp.jpeg${smallImg}`,
        },

        {
            original: `https://i.imgur.com/hJ6gPXX.jpeg${bigImg}`,
            thumbnail: `https://i.imgur.com/hJ6gPXX.jpeg${smallImg}`,
        },

        {
            original: `https://i.imgur.com/7FaCC2f.jpeg${bigImg}`,
            thumbnail: `https://i.imgur.com/7FaCC2f.jpeg${smallImg}`,
        },

        {
            original: `https://i.imgur.com/xkGv86a.jpeg${bigImg}`,
            thumbnail: `https://i.imgur.com/xkGv86a.jpeg${smallImg}`,
        },
    ];


    return (
        <div className="container-image-slider-custom">
            <div className="car-name-company-name">
                <h2>{carData.brand} {carData.model} <span>{carData.year}</span></h2>
            </div>

            <ImageGallery items={carData.images.length > 0 ? imagesOriginal : imagess} autoPlay={false} showBullets={true} showIndex={false} showNav={true} showFullscreenButton={true} showPlayButton={false} />;
        </div>
    )

}
