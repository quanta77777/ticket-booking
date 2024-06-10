import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AnyARecord } from 'dns';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createTicket = async (movieId: string,   showtimeId : string, Tprice : string) => {
  try {
    const movieIdInt = parseInt(movieId, 10);
    const showtimeIdInt = parseInt(showtimeId, 10);
    const priceInt = parseInt(Tprice, 10);
    const response = await axios.post(`${apiUrl}/ticket`, {
        user_id : 2,
        movie_id: movieIdInt,
        showtime_id: showtimeIdInt,
        price: priceInt
    });
    console.log("id ticket ",response.data.ticket_id)
    return response.data.ticket_id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
 
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const fetchCreateProductWithTicketId = async (ticketId: string,   productID : string) => {
    try {
        const ticketIdInt = parseInt(ticketId, 10);
        const productIdInt = parseInt(productID, 10);
      const response = await axios.post(`${apiUrl}/ticket/product`, {
          ticket_id : ticketIdInt,
          product_id: productIdInt,
          
      });
      console.log("res from add product with ticket id ",response)
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
      
        console.error('Axios error:', error.response?.status, error.response?.data);
      } else {
   
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };

  export const fetchCreateSeatWithTicketId = async (ticketId: string,  seatID : string) => {
    try {
        const ticketIdInt = parseInt(ticketId, 10);
        const seatIdInt = parseInt(seatID, 10);
      const response = await axios.post(`${apiUrl}/ticket/seat`, {
          ticket_id : ticketIdInt,
          seat_id: seatIdInt,
          
      });
      console.log("res from add seat with ticket id ",response)
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
      
        console.error('Axios error:', error.response?.status, error.response?.data);
      } else {
   
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };

  export  const createSeatsWithTicketId = async (ticketId : string, seatIds : any) => {
   
    const validSeatIds = Array.isArray(seatIds) ? seatIds : [];
    for (const seatId of validSeatIds) {
      await fetchCreateSeatWithTicketId(ticketId,seatId.seat_id);
    }
 
  
  };

  export  const createProductWithTicketId = async (ticketId : string, productIds : any) => {
   
    const validProductIds = Array.isArray(productIds) ? productIds : [];
    for (const productId of validProductIds) {
      await fetchCreateProductWithTicketId(ticketId,productId.product_id);
    }
 
  
  };







