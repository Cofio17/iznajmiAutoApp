import { apiRequest } from '../utils/Api/apiService';

export const fetchCars = async () => {
  try {
    const response = await apiRequest("GET", 'cars');
    return response.data
  } catch (error) {
    throw new Response('Error fetching cars', { status: 500 });
  }
}
