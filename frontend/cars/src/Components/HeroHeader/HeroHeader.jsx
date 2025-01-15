import Search from "../SearchPageComponents/Search"
export default function HeroHeader({ header }) {

    return (
        <div className="hero-header-container">
            <h1 style={{ fontSize: '3rem' }}>{header}</h1>
            <img className="hero-header-image" src="/heroHeader.jpg" alt="hero-header-image" />
            {header === 'Find Your Ideal Car' &&
                <div className="overlay">
                    <Search />
                </div>}

        </div>

    )
}