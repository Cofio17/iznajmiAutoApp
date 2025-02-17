import { useState } from "react";
import CarInfo from "./CarInfo";
import GoogleMap from "../GoogleMap/GoogleMap";
import PickingUp from "./PickingUp";

export default function CategoryInfo({ carData }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const categories = ["O Automobilu", "Mesto Preuzimanja", "Korisne Informacije"];

    const renderSegment = (index) => {
        switch (index) {
            case 0:
                return <CarInfo carData={carData} header={categories[activeIndex]} />
            case 1:
                return <GoogleMap header={categories[activeIndex]} />
            case 2:
                return <PickingUp header={categories[activeIndex]} />
            default:
                break;
        }
    }

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
            {renderSegment(activeIndex)}
        </>
    );
}
