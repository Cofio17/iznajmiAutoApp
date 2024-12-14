import Search from "../SearchPageComponents/Search"
export default function HeroHeader({ header }) {

    return (
        <div className="hero-header-container">
            <h1>{header}</h1>
            <img className="hero-header-image" src="/heroHeader.jpg" alt="hero-header-image" />
            <div className="overlay">
                <Search />
            </div>
        </div>

    )
}