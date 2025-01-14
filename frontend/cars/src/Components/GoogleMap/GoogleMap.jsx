import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export default function GoogleMap({ positionVariable, header }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const position = { lat: 45.24539277681039, lng: 19.84245677719107 };

    const handleMarkerClick = () => {
        // Otvaranje Google Mapa u novom prozoru
        const url = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;
        window.open(url, '_blank');
    };

    return (
        <APIProvider apiKey={apiKey} version="beta" libraries={['marker']}>

            <div className="map-container" style={{ height: 600, width: '80%' }}>
                <h3>{header}</h3>
                <Map style={{ height: '95%' }} mapId='da3459a73aa9fb5' zoom={12} center={position}>
                    <AdvancedMarker position={position} onClick={handleMarkerClick}>
                        <Pin background={'red'} borderColor={'red'} glyphColor={'#fff'} />
                    </AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    );
}
