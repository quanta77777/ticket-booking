
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const fetchMovie = async () => {
  const response = await axios.get(`${apiUrl}/movie`);
  return response.data;
};

const fetchMovieById = async (id : string) => {
  const response = await axios.get(`${apiUrl}/movie/${id}`);
  return response.data;
};

export const useGetMovies = () => {
  return useQuery({queryKey: ['movie'],queryFn: () => fetchMovie() });
};

export const GetMoviesById = (id: string) => {
  return useQuery({queryKey: ['movie', id],queryFn: () => fetchMovieById(id),enabled: !!id });
};
