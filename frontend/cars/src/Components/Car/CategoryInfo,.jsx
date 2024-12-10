import { useState } from "react";
import CarInfo from "../CarInfo";

export default function CategoryInfo({ carData }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const categories = ["General Information", "About Dealership", "About this model"];

    const renderCarInfo = () => {
        return <CarInfo carData={carData} header={categories[activeIndex]} />;
    };

    return (
        <>
            <div className="container-category">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`category ${activeIndex === index ? "active" : ""}`}
                    >
                        <h3>{category}</h3>
                    </div>
                ))}
            </div>
            {renderCarInfo()}
        </>
    );
}
