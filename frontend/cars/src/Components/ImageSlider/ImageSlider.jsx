import ImageGallery from "react-image-gallery";
import './imageGallery.scss'


export default function ImageSlider({ carData }) {
    const bigImg = '?';
    const smallImg = '?';

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

                <p className='company-name'>
                    {carData?.companyId?.name || 'Naziv Agencije'}
                </p>
            </div>

            <ImageGallery items={imagess} autoPlay={false} showBullets={true} showIndex={false} showNav={true} showFullscreenButton={false} showPlayButton={false} />;
        </div>
    )

}
