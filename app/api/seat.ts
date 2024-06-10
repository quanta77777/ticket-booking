import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const fetchSeatWithTheaterId = async (id : any) => {
  try {
    const response = await axios.get(`${apiUrl}/seat/theater/${id}`);
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
};


const fetchReserveSeat = async (seatId : any, showtimeId : any) => {

  try {
    const seatIdInt = parseInt(seatId, 10);
    const showtimeIdInt = parseInt(showtimeId, 10);

    if (isNaN(seatIdInt) || isNaN(showtimeIdInt)) {
      throw new Error('Invalid seatId or showtimeId');
    }
    const response = await axios.post(`${apiUrl}/reserve-seat`, {
      seat_id: seatId,
      showtime_id: showtimeId,
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Đặt ghế ${seatId} thành công: `, response.data);
  } catch (error : any) {
    console.error(`Đặt ghế ${seatId} thất bại: `, error);
  }
  
 
};

const fetchSeatWithTheaterIdAndShowtimeId = async (theaterId : any, showtimeId : any) => {
  try {
    const response = await axios.get(`${apiUrl}/seats?theater_id=${theaterId}&showtime_id=${showtimeId}`);
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
};

const fetchNoOp = async () => {
    return null;
  };

export const useGetSeatWithTheaterId = (theaterId : any) => {
    return useQuery({
        queryKey: ['seats',theaterId],
        queryFn: theaterId === undefined ? fetchNoOp : () => fetchSeatWithTheaterId(theaterId),
        enabled: !!theaterId,
      });
    
  };

  export const useGetSeatWithTheaterIdAndShowtimeId = (theaterId : any, showtimeId : any) => {
    return useQuery({
        queryKey: ['seatIds',theaterId, showtimeId],
        queryFn: theaterId === undefined ? fetchNoOp : () => fetchSeatWithTheaterIdAndShowtimeId(theaterId, showtimeId),
        enabled: !!theaterId,
      });
    
  };

  export  const ReserveSeat = async (seatIds : any, showtimeId : any) => {
   
    const validSeatIds = Array.isArray(seatIds) ? seatIds : [];
    for (const seatId of validSeatIds) {
      await fetchReserveSeat(seatId.seat_id, showtimeId);
    }
 
  
  };



