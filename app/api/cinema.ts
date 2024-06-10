import { useQueries } from '@tanstack/react-query';
import axios from 'axios';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchCinemaChainDetails = async (cinemaId : any) => {
  try {
    const response = await axios.get(`${apiUrl}/cinema/${cinemaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cinema chain details');
  }
};

const useCinemaChainDetails = (cinemaIds : any) => {
  // Đảm bảo cinemaIds luôn là một mảng
  const validCinemaIds = Array.isArray(cinemaIds) ? cinemaIds : [];

  // Tạo các truy vấn dựa trên cinemaIds
  const queries = validCinemaIds.map((cinemaId) => ({
    queryKey: ['cinema', cinemaId],
    queryFn: () => fetchCinemaChainDetails(cinemaId),
    enabled: !!cinemaId,
  }));

  // Sử dụng useQueries với đối tượng chứa mảng queries
  const cinemaQueries = useQueries({ queries });

  return cinemaQueries;
};
  export default useCinemaChainDetails;

