import apiRequest from "../Api/apiService";

export const fetchCars = async () => {
    try {
        const response = await apiRequest("GET", 'cars');
        return response.data
    } catch (error) {
        throw new Response('Error fetching cars', { status: 500 });
    }
}

export const fetchCarsByCity = async (city) => {
    try {
        const response = await apiRequest("GET", "cars");
        return response.data.filter(car => car.location === city);
    } catch (error) {
        throw new Response(`Error fetching cars from location: ${city}`, { status: 500 });

    }
}
