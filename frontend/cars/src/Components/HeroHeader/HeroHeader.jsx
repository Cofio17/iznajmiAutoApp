import Search from "../SearchPageComponents/Search"
export default function HeroHeader({ header }) {

    return (
        <div className="hero-header-container">
            <h1 style={{ fontSize: '3rem' }}>{header}</h1>
            <img className={header === 'Pronadji Idealan Auto' ? 'hero-header-image image-main-page' : 'hero-header-image '} src="/image1.webp" alt="hero-header-image" />
            {header === 'Pronadji Idealan Auto' &&
                <div className="overlay">
                    <Search />
                </div>}
        </div>

    )
}