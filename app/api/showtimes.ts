
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const fetchShowtimesByDayAndMoVieId = async ( day: string, id : number) => {
  try {
    const response = await axios.get(`${apiUrl}/showtime?day=${day}&movie_id=${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Xử lý lỗi từ Axios
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      // Xử lý lỗi khác (nếu có)
      console.error('Unexpected error:', error);
    }
    // Có thể ném lỗi hoặc trả về một giá trị mặc định
    throw error;
  }
}
const fetchShowtimeBranch = async (branchId : any, day: string) => {
  try {
    const response = await axios.get(`${apiUrl}/showtime/branch/${branchId}?day=${day}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch branch details');
  }
};
const fetchShowtimeCinema = async (cinemaId : any, day: string) => {
  try {
    const response = await axios.get(`${apiUrl}/showtime/cinema/${cinemaId}?day=${day}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch branch details');
  }
};


export const GetShowtimesByDayAndMoVieId = ( day : string, id : number) => {
  return useQuery({queryKey: ['showtimes', id, day],queryFn: () => fetchShowtimesByDayAndMoVieId(day, id),enabled: !!day });
};
export const useBranchShowtime = (branchId : any, day : string) => {
  return useQuery({queryKey: ['branch-showtime', branchId, day],queryFn: () => fetchShowtimeBranch(branchId, day),enabled: !!branchId });

}

const fetchNoOp = async () => {
  return null;
};

export const useCinemaShowtime = (cinemaId: any, day: string) => {
  return useQuery({
    queryKey: ['cinema-showtime', cinemaId, day],
    queryFn: cinemaId === "Tất cả" ? fetchNoOp : () => fetchShowtimeCinema(cinemaId, day),
    enabled: !!cinemaId,
  });
};
