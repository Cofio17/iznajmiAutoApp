import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function GoogleMap({ positionVariable, header, carData }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const defaultPosition = { lat: 45.24539277681039, lng: 19.84245677719107 };
    const [position, setPosition] = useState();



    useEffect(() => {
        if (carData?.companyId?.address && carData?.companyId?.location) {
            const address = `${carData.companyId.address}, ${carData.companyId.location}`;
            getCoordinates(address)
        }

    }, [carData])

    const getCoordinates = async (address) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: address,
                    key: apiKey,
                },
            });

            if (response.data.status === "OK" && response.data.results.length > 0) {
                setPosition(response.data.results[0].geometry.location);
            } else {
                console.error("Geocoding API returned no results:", response.data.status);
            }
        } catch (error) {
            console.error("Failed to fetch coordinates:", error);
        }
    };


    const handleMarkerClick = () => {
        // Otvaranje Google Mapa u novom prozoru
        const url = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;
        window.open(url, '_blank');
    };

    const mapOptions = {
        disableDefaultUI: true, // Uklanja sve kontrolne elemente
        zoomControl: false, // Uklanja plus/minus dugmiće za zumiranje
        streetViewControl: false, // Uklanja "pegman-a" za 3D pregled
        mapTypeControl: false, // Uklanja izbor tipa mape (satelit, teren itd.)

    };



    return (
        <APIProvider apiKey={apiKey} version="beta" libraries={['marker']}>

            <div className="map-container" style={{ height: 600, width: '80%' }}>
                <h3>{header}</h3>
                {carData?.companyId ? (
                    <p>{carData.companyId.address}, {carData.companyId.location}</p>
                ) : (
                    <p>Adresa nije dostupna</p>
                )}
                {position && <Map options={mapOptions} style={{ height: '90%' }} mapId='6517e52e7a8475cc' defaultZoom={17} defaultCenter={position}>
                    <AdvancedMarker position={position} onClick={handleMarkerClick}>
                        <Pin background={'red'} borderColor={'red'} glyphColor={'#fff'} />
                    </AdvancedMarker>
                </Map>}

            </div>
        </APIProvider>
    );
}
