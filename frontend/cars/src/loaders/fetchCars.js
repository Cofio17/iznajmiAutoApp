import axios from 'axios';

export const fetchCars = async () => {
  const localhost = import.meta.env.VITE_LOCAL_HOST;
  try {
    console.log(`loader`);
    
    const response = await axios.get(`${localhost}cars`);
    return response.data.data;
  } catch (error) {
    throw new Response('Error fetching cars', { status: 500 });
  }
  finally{
    console.log(`loader kraj`);
    
  }
};
