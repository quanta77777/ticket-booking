import {useQuery } from '@tanstack/react-query';
import axios from 'axios';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const fetchTheaterByID = async (branchId : any) => {
  try {
    const response = await axios.get(`${apiUrl}/theater/${branchId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch theater  id');
  }
};


 export const useTheaterByID = (theaterID: any) => {
    return useQuery({queryKey: ['theater', theaterID],queryFn: () => fetchTheaterByID(theaterID), enabled: !!theaterID });
   
  };
  

