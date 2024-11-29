import ImageGallery from "react-image-gallery";
import '../style.scss'
import '../imageGallery.scss'


export default function ImageSlider({ }) {

    const imagess = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];
    const images = [
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2407/24073573/a35c3e0accb9-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2407/24073573/da271d4ae391-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2407/24073573/80c5e127fa47-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2407/24073573/5a4de2e62215-800x600.jpg'
    ]

    return (
        <div className="container-image-slider-custom">
            <ImageGallery items={imagess} autoPlay={false} showBullets={true} showIndex={true} showNav={true} showFullscreenButton={false} showPlayButton={false} />;
        </div>
    )

}
