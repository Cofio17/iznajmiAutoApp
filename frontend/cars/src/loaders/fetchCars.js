import { apiRequest } from '../utils/Api/apiService';

export const fetchCars = async () => {
  try {
    const response = await apiRequest("GET", 'cars');
    console.log(response.data);

    return response.data.reverse();
  } catch (error) {
    throw new Response('Error fetching cars', { status: 500 });
  }
}
